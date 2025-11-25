import { Sparkles, Send, Paperclip, Mic, Smile } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export function ChatPanel() {
  const [input, setInput] = useState('');

  const messages = [
    {
      type: "assistant",
      content: "Good morning! Your balance increased by ₹12,450 this month. What would you like to explore?",
      time: "9:42 AM"
    },
    {
      type: "user",
      content: "Show me my spending breakdown for this week",
      time: "9:43 AM"
    },
    {
      type: "assistant",
      content: "Here's your spending breakdown for the past 7 days:\n\n• Shopping: ₹5,240 (32%)\n• Food & Dining: ₹3,890 (24%)\n• Transportation: ₹2,100 (13%)\n• Utilities: ₹1,850 (11%)\n• Entertainment: ₹3,200 (20%)\n\nTotal: ₹16,280\n\nYour shopping expenses are 23% higher than your average. Would you like to set a budget alert?",
      time: "9:43 AM"
    },
    {
      type: "user",
      content: "Yes, set an alert for ₹10,000 weekly shopping budget",
      time: "9:45 AM"
    },
    {
      type: "assistant",
      content: "Perfect! I've created a weekly shopping budget of ₹10,000. You'll receive alerts when you reach 75% and 100% of this limit. I'll also send you a weekly summary every Monday.",
      time: "9:45 AM"
    }
  ]

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    console.log("Sending:", input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full relative">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 pb-32 custom-scrollbar">
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
            <h2 className="text-xl font-medium text-white mb-1">NeuroFin Assistant</h2>
            <p className="text-xs text-gray-400">Ask me anything about your finances</p>
          </motion.div>

          {/* Messages List */}
          {messages.map((message, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
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
                <p className={`text-[10px] text-gray-600 mt-2 ${message.type === "user" ? "text-right" : "text-left"}`}>
                  {message.time}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex gap-1 pl-2">
             <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
             <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
             <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </motion.div>
        </div>
      </div>

      {/* Input & Suggestions Area (Fixed at bottom) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#00010D] via-[#00010D] to-transparent pt-10 pb-6 px-4">
        <div className="max-w-3xl mx-auto">
            
            {/* Suggested Actions */}
            <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                {["Show investment opportunities", "Analyze savings rate", "Set up automation"].map((action, i) => (
                    <button key={i} className="whitespace-nowrap px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 text-xs text-gray-400 hover:text-white hover:border-white/30 transition-all">
                        {action}
                    </button>
                ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3BF7FF]/20 to-[#7433FF]/20 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-[#0A0A10] border border-white/10 rounded-2xl flex items-center p-2 pl-4">
                    
                    {/* Attachment Icon */}
                    <button type="button" className="text-gray-500 hover:text-white transition-colors mr-3">
                        <Paperclip className="w-5 h-5" />
                    </button>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything about your finances..."
                        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-gray-600 h-10"
                    />

                    {/* Right Icons */}
                    <div className="flex items-center gap-2 pr-1">
                        <button type="button" className="p-2 text-gray-500 hover:text-white transition-colors">
                            <Smile className="w-5 h-5" />
                        </button>
                        <button type="button" className="p-2 text-gray-500 hover:text-white transition-colors">
                            <Mic className="w-5 h-5" />
                        </button>
                        <button type="submit" className="p-2 bg-[#3BF7FF] text-black rounded-xl hover:bg-[#3BF7FF]/90 transition-colors">
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