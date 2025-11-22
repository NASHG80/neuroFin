import { motion } from "framer-motion"
import { Target, Plus } from "lucide-react"

const GoalsSection = () => {
  const goals = [
    {
      name: "Dream Wedding",
      target: 2000000,
      current: 850000,
      color: "#E4C580",
      emoji: "💍"
    },
    {
      name: "New Car",
      target: 1200000,
      current: 720000,
      color: "#7433FF",
      emoji: "🚗"
    },
    {
      name: "Europe Trip",
      target: 500000,
      current: 380000,
      color: "#3BF7FF",
      emoji: "✈️"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10"
      style={{
        boxShadow: "0 8px 32px rgba(116, 51, 255, 0.08)"
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl">Goals</h3>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => {
          const percentage = (goal.current / goal.target) * 100

          return (
            <motion.div
              key={goal.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative cursor-pointer group"
            >
              {/* Jar Container */}
              <div className="relative h-40 rounded-2xl bg-gradient-to-b from-white/5 to-white/10 border border-white/10 overflow-hidden">
                {/* Liquid Fill */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${percentage}%` }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    delay: 0.8 + index * 0.1
                  }}
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    background: `linear-gradient(180deg, ${goal.color}80, ${goal.color}40)`,
                    boxShadow: `0 -10px 40px ${goal.color}60`
                  }}
                >
                  {/* Wave Effect */}
                  <motion.div
                    animate={{
                      x: [0, 20, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-0 left-0 right-0 h-8"
                    style={{
                      background: `radial-gradient(ellipse at center, ${goal.color}40 0%, transparent 70%)`
                    }}
                  />

                  {/* Bubbles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-white/30"
                      style={{
                        left: `${20 + i * 30}%`,
                        bottom: 0
                      }}
                      animate={{
                        y: [-160, -10],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  ))}
                </motion.div>

                {/* Ripple Effect on Hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.1, opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.8 }}
                  style={{
                    background: `radial-gradient(circle at center, ${goal.color}30, transparent 70%)`
                  }}
                />

                {/* Goal Info Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl mb-2"
                  >
                    {goal.emoji}
                  </motion.div>
                  <p className="text-sm mb-1">{goal.name}</p>
                  <p className="text-xs text-white/50 mb-2">
                    {Math.round(percentage)}% Complete
                  </p>

                  <div className="text-center">
                    <motion.p
                      className="text-lg tracking-tight"
                      style={{ color: goal.color }}
                    >
                      ₹{(goal.current / 1000).toFixed(0)}k
                    </motion.p>
                    <p className="text-xs text-white/40">
                      of ₹{(goal.target / 1000).toFixed(0)}k
                    </p>
                  </div>
                </div>

                {/* Sparkle Effect */}
                {percentage > 75 && (
                  <motion.div
                    className="absolute top-4 right-4"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Target className="w-5 h-5" style={{ color: goal.color }} />
                  </motion.div>
                )}
              </div>

              {/* Progress Bar Below */}
              <div className="mt-2 flex items-center justify-between text-xs text-white/40">
                <span>
                  ₹{((goal.target - goal.current) / 1000).toFixed(0)}k to go
                </span>
                <span>
                  Target:{" "}
                  {new Date(
                    Date.now() + 365 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric"
                  })}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Action */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 p-4 rounded-xl bg-gradient-to-r from-[#7433FF]/20 to-[#3BF7FF]/20 border border-[#7433FF]/30 hover:border-[#7433FF]/50 transition-all text-sm"
      >
        Add to Goals This Month
      </motion.button>
    </motion.div>
  )
}
export default GoalsSection;