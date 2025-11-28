import { Sparkles, Send, Paperclip, Mic, Smile } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// 🔥 TAX KEYWORDS to detect Nanda routing
const TAX_KEYWORDS = [
  "tax", "income tax", "80c", "80d", "80ccd",
  "old regime", "new regime", "tax saving",
  "deduction", "nanda", "taxis"
];

export function ChatPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // 🔍 Decide if message should go to Nanda
  const isTaxQuery = (msg) => {
    const m = msg.toLowerCase();
    return TAX_KEYWORDS.some((kw) => m.includes(kw));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      type: "user",
      content: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      let response;
      let data;

      // 🧠 Automatic Routing → Nanda OR Finance Backend
      if (isTaxQuery(userMessage.content)) {
        console.log("➡ Routing to NANDA agent");

        response = await fetch("http://localhost:7000/a2a", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversation_id: "demo-user",
            message: userMessage.content,
          }),
        });

        data = await response.json();
      } else {
        console.log("➡ Routing to FINANCE agent");

        response = await fetch("http://localhost:7001/agent/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: "111",
            message: userMessage.content,
          }),
        });

        data = await response.json();
      }

      const botReply =
        data?.answer ||
        data?.response ||
        data?.response_preview ||
        "⚠️ Something went wrong.";

      const botMessage = {
        type: "assistant",
        content: botReply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          content: "❌ Could not reach backend.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* MESSAGES AREA */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 pb-32 custom-scrollbar"
      >
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center pt-8 pb-4"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-2xl mb-4 shadow-[0_0_40px_rgba(99,102,241,0.3)]">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-medium text-white mb-1">
              NeuroFin Assistant
            </h2>
            <p className="text-xs text-gray-400">Ask anything about finances or taxes</p>
          </motion.div>

          {/* Dynamic Messages */}
          {messages.map((message, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] ${
                  message.type === "user" ? "order-2" : "order-1"
                }`}
              >
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-1 pl-2"
            >
              <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-white/20 rounded-full animate-bounce"
                style={{ animationDelay: ".2s" }}
              />
              <div
                className="w-2 h-2 bg-white/20 rounded-full animate-bounce"
                style={{ animationDelay: ".4s" }}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* INPUT AREA */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#00010D] via-[#00010D] to-transparent pt-10 pb-6 px-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3BF7FF]/20 to-[#7433FF]/20 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

            <div className="relative bg-[#0A0A10] border border-white/10 rounded-2xl flex items-center p-2 pl-4">
              <button type="button" className="text-gray-500 hover:text-white mr-3">
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about savings, investments, taxes…"
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-600 h-10"
              />

              <div className="flex items-center gap-2 pr-1">
                <button type="button" className="p-2 text-gray-500 hover:text-white">
                  <Smile className="w-5 h-5" />
                </button>
                <button type="button" className="p-2 text-gray-500 hover:text-white">
                  <Mic className="w-5 h-5" />
                </button>
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
  );
}
export default ChatPanel;


