import { motion } from "framer-motion"
import { Volume2, Zap } from "lucide-react"
import { useState, useEffect } from "react"

const VoiceOfMoney = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  const soundWaves = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    height: 20 + Math.random() * 60
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden relative"
      style={{
        boxShadow: "0 8px 32px rgba(116, 51, 255, 0.1)"
      }}
    >
      {/* Animated Background */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(116, 51, 255, 0.1), transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(59, 247, 255, 0.1), transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(116, 51, 255, 0.1), transparent 50%)"
          ]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0"
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className="text-xl mb-2">Voice of Money</h3>
            <p className="text-white/50 text-sm">
              AI-powered financial narration
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-xl bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] hover:shadow-lg hover:shadow-[#7433FF]/30 transition-all"
          >
            <Volume2 className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Sound Wave Visualization */}
        <div className="h-40 flex items-center justify-center gap-1 mb-8">
          {soundWaves.map((wave, index) => (
            <motion.div
              key={wave.id}
              className="w-1 rounded-full bg-gradient-to-t from-[#7433FF] via-[#3BF7FF] to-[#E4C580]"
              animate={{
                height: isPlaying
                  ? [
                      wave.height,
                      wave.height * 0.5,
                      wave.height * 1.5,
                      wave.height
                    ]
                  : 20,
                opacity: isPlaying ? [0.3, 1, 0.5, 0.8] : 0.2
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.02,
                ease: "easeInOut"
              }}
              style={{
                boxShadow: isPlaying ? "0 0 10px #3BF7FF" : "none"
              }}
            />
          ))}
        </div>

        {/* Current Playing */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-gradient-to-r from-[#7433FF]/10 to-[#3BF7FF]/10 border border-[#7433FF]/20 mb-6"
          >
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center flex-shrink-0"
              >
                <Zap className="w-5 h-5" />
              </motion.div>
              <div className="flex-1">
                <p className="text-sm mb-2 text-[#3BF7FF]">Now Playing:</p>
                <p className="text-sm text-white/80 leading-relaxed">
                  "This month you've saved ₹47,000, which is 42% higher than
                  last month. Your investment portfolio grew by 7.5%, and you're
                  on track to achieve your wedding goal by next year. Great
                  progress!"
                </p>

                {/* Progress Bar */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#7433FF] to-[#3BF7FF]"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 15, repeat: Infinity }}
                    />
                  </div>
                  <span className="text-xs text-white/40">0:15</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Insights */}
        <div>
          <h4 className="text-sm text-white/50 mb-4">Recent Audio Insights</h4>
          <div className="space-y-3">
            {[
              {
                title: "October Financial Summary",
                duration: "2:30",
                date: "Today"
              },
              {
                title: "Investment Performance Review",
                duration: "1:45",
                date: "Yesterday"
              },
              {
                title: "Spending Pattern Analysis",
                duration: "3:15",
                date: "2 days ago"
              }
            ].map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7433FF]/20 to-[#3BF7FF]/20 flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-[#3BF7FF]" />
                    </div>
                    <div>
                      <p className="text-sm">{insight.title}</p>
                      <p className="text-xs text-white/40">{insight.date}</p>
                    </div>
                  </div>
                  <span className="text-xs text-white/40">
                    {insight.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 grid grid-cols-2 gap-3"
        >
          <div className="p-4 rounded-xl bg-[#7433FF]/5 border border-[#7433FF]/20">
            <p className="text-xs text-white/50 mb-1">Total Insights</p>
            <p className="text-2xl">47</p>
          </div>
          <div className="p-4 rounded-xl bg-[#3BF7FF]/5 border border-[#3BF7FF]/20">
            <p className="text-xs text-white/50 mb-1">Hours Listened</p>
            <p className="text-2xl">12.5</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
export default VoiceOfMoney;