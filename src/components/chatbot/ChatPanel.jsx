import { Sparkles, Send, Mic, XCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { MessageLoading } from "./MessageLoading"

const QUICK_QUESTIONS = [
  { label: "Avg Bill Payment", question: "What is the average transaction amount for bill payments?" },
  { label: "Android vs iOS", question: "How do failure rates compare between Android and iOS users?" },
  { label: "Peak Food Hours", question: "What are the peak transaction hours for food delivery?" },
  { label: "P2P by Age", question: "Which age group uses P2P transfers most frequently?" },
  { label: "Network vs Success", question: "Is there a relationship between network type and transaction success?" },
  { label: "Flagged High-Value", question: "What percentage of high-value transactions are flagged for review?" },
];

// Typewriter hook
function useTypewriter(text, speed = 12) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      setDone(true);
      return;
    }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

// Chat bubble with typewriter for latest bot message
function ChatBubble({ message, isLatestBot }) {
  const shouldAnimate = message.type === "assistant" && isLatestBot && !message.isError;
  const { displayed, done } = useTypewriter(
    shouldAnimate ? message.content : null, 12
  );
  const content = shouldAnimate ? displayed : message.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
        <div
          className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-line flex items-start gap-2 ${
            message.type === "user"
              ? "bg-[#3BF7FF] text-black font-medium rounded-br-sm"
              : "bg-[#1A1A1E] border border-white/5 text-gray-200 rounded-bl-sm"
          }`}
        >
          {message.isError && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />}
          <span>
            {content}
            {shouldAnimate && !done && (
              <span className="inline-block w-0.5 h-4 bg-[#3BF7FF] ml-0.5 animate-pulse align-middle" />
            )}
          </span>
        </div>
        <p className={`text-[10px] text-gray-600 mt-2 ${message.type === "user" ? "text-right" : "text-left"}`}>
          {message.time}
        </p>
      </div>
    </motion.div>
  );
}

export function ChatPanel() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const scrollRef = useRef(null)
  const recognitionRef = useRef(null)
  const isListeningRef = useRef(false)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isListeningRef.current = false
      if (recognitionRef.current) {
        try { recognitionRef.current.abort() } catch (e) { /* */ }
      }
    }
  }, [])

  function handleMicToggle() {
    if (isListeningRef.current) {
      isListeningRef.current = false
      setListening(false)
      if (recognitionRef.current) {
        try { recognitionRef.current.abort() } catch (e) { /* */ }
        recognitionRef.current = null
      }
    } else {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SR) return

      if (recognitionRef.current) {
        try { recognitionRef.current.abort() } catch (e) { /* */ }
        recognitionRef.current = null
      }

      const rec = new SR()
      rec.continuous = true
      rec.interimResults = true
      rec.lang = 'en-IN'

      rec.onresult = (event) => {
        let text = ''
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript
        }
        setInput(text)
      }

      rec.onerror = () => {
        isListeningRef.current = false
        recognitionRef.current = null
        setListening(false)
      }

      rec.onend = () => {
        if (isListeningRef.current) {
          try { rec.start() } catch (e) {
            isListeningRef.current = false
            recognitionRef.current = null
            setListening(false)
          }
        } else {
          recognitionRef.current = null
          setListening(false)
        }
      }

      recognitionRef.current = rec
      isListeningRef.current = true
      setListening(true)
      try { rec.start() } catch (e) {
        isListeningRef.current = false
        recognitionRef.current = null
        setListening(false)
      }
    }
  }

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      type: "user",
      content: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.content }),
      })

      const data = await res.json()
      const botReply = data?.answer || "⚠️ Something went wrong."

      setMessages((prev) => [...prev, {
        type: "assistant",
        content: botReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }])
    } catch (err) {
      setMessages((prev) => [...prev, {
        type: "assistant",
        content: "Could not reach NeuroFin AI backend.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
      }])
    }

    setLoading(false)
  }

  const latestBotIndex = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].type === "assistant") return i;
    }
    return -1;
  })();

  return (
    <div className="flex flex-col h-full relative">

      {/* MESSAGES */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 pb-52 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-8">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center pt-8 pb-4"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-[0_0_40px_rgba(99,102,241,0.3)]">
              <img src="../src/assets/logo.png" />
            </div>
            <h2 className="text-xl font-medium text-white mb-1">NeuroFin Assistant</h2>
            <p className="text-xs text-gray-400">Ask me anything about your finances</p>
          </motion.div>

          {messages.map((message, i) => (
            <ChatBubble key={i} message={message} isLatestBot={i === latestBotIndex} />
          ))}

          {loading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="bg-[#1A1A1E] border border-white/5 rounded-2xl rounded-bl-sm px-5 py-3.5">
                <MessageLoading />
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* INPUT BAR */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#00010D] via-[#00010D]/95 to-transparent pt-6 pb-6 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Suggestions */}
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            {QUICK_QUESTIONS.map((item, id) => (
              <button
                key={id}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 text-xs text-gray-400 hover:text-white hover:border-[#3BF7FF]/30 transition-colors"
                onClick={() => setInput(item.question)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="relative group">
            <div className="relative bg-[#0A0A10] border border-white/10 rounded-2xl flex items-center p-2 pl-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about your finances..."
                className="flex-1 bg-transparent outline-none text-sm text-white h-10"
              />

              <div className="flex items-center gap-1 pr-1">
                {(window.SpeechRecognition || window.webkitSpeechRecognition) && (
                  <button
                    type="button"
                    title={listening ? "Stop listening" : "Start voice input"}
                    className={`p-2 transition-colors rounded-lg ${
                      listening
                        ? "text-red-500 animate-pulse bg-red-500/10"
                        : "text-gray-500 hover:text-white"
                    }`}
                    onClick={handleMicToggle}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                )}

                <button
                  type="submit"
                  className="p-2 bg-[#3BF7FF] text-black rounded-xl hover:bg-[#3BF7FF]/90 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          <p className="text-center text-[10px] text-gray-700 mt-3">
            NeuroFin can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  )
}
