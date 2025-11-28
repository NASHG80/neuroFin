import { Sparkles, Send, Paperclip, Mic, Smile } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

export function ChatPanel() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])


  // 🔥 ROUTER FUNCTION → Decides which bot to send message to
  function routeMessage(msg) {
    const q = msg.toLowerCase()

    if (
      q.includes("tax") ||
      q.includes("income tax") ||
      q.includes("80c") ||
      q.includes("80d") ||
      q.includes("80ccd") ||
      q.includes("deduction") ||
      q.includes("regime") ||
      q.includes("old regime") ||
      q.includes("new regime") ||
      q.includes("hra") ||
      q.includes("tds")
    ) {
      return "nanda"        // Tax bot
    }

    return "neurofin"       // All other queries
  }


  // 🔥 Send message
  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      type: "user",
      content: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    let botReply = "⚠️ Something went wrong."

    try {
      const route = routeMessage(userMessage.content)

      let res, data

      if (route === "nanda") {
        // 🟢 SEND TO NANDA TAX OPTIMIZER AGENT
        res = await fetch("http://localhost:7000/a2a", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: userMessage.content,
            conversation_id: "111",
          }),
        })

        data = await res.json()
        botReply = data?.output_text || "⚠️ Nanda agent error"
      } else {
        // 🔵 SEND TO NEUROFIN MULTI-AGENT BACKEND
        res = await fetch("http://localhost:7001/agent/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: "111",
            message: userMessage.content,
          }),
        })

        data = await res.json()
        botReply = data?.answer || "⚠️ NeuroFin agent error"
      }
    } catch (err) {
      botReply = "❌ Could not reach backend server."
    }

    // Add bot message
    setMessages((prev) => [
      ...prev,
      {
        type: "assistant",
        content: botReply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ])

    setLoading(false)
  }


  return (
    <div className="flex flex-col h-full relative">

      {/* MESSAGES AREA */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 pb-32 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-8">

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center pt-8 pb-4"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-2xl mb-4 shadow-[0_0_40px_rgba(99,102,241,0.3)]">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-medium text-white mb-1">NeuroFin Assistant</h2>
            <p className="text-xs text-gray-400">Ask me anything about your finances</p>
          </motion.div>

          {/* CHAT BUBBLES */}
          {messages.map((message, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                <div
                  className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-line ${
                    message.type === "user"
                      ? "bg-[#3BF7FF] text-black font-medium rounded-br-sm"
                      : "bg-[#1A1A1E] border border-white/5 text-gray-200 rounded-bl-sm"
                  }`}
                >
                  {message.content}
                </div>
                <p
                  className={`text-[10px] text-gray-600 mt-2 ${
                    message.type === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <motion.div className="flex gap-1 pl-2">
              <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: ".2s" }} />
              <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: ".4s" }} />
            </motion.div>
          )}

        </div>
      </div>

      {/* INPUT BAR */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#00010D] pt-10 pb-6 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Suggestions */}
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            {[
              "Show investment opportunities",
              "Analyze savings rate",
              "How much tax will I pay?",
              "Compare old vs new regime",
            ].map((action, id) => (
              <button
                key={id}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 text-xs text-gray-400 hover:text-white"
                onClick={() => setInput(action)}
              >
                {action}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="relative group">
            <div className="relative bg-[#0A0A10] border border-white/10 rounded-2xl flex items-center p-2 pl-4">

              <button type="button" className="text-gray-500 mr-3">
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about your finances..."
                className="flex-1 bg-transparent outline-none text-sm text-white h-10"
              />

              <div className="flex items-center gap-2 pr-1">
                <button type="submit" className="p-2 bg-[#3BF7FF] text-black rounded-xl">
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
