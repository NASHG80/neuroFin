import { motion } from "framer-motion"
import { Trophy, Flame, Lock, Star, Users } from "lucide-react"

const FinancialChallenges = () => {
  const challenges = [
    {
      name: "No-Spend Weekend",
      description: "Don't spend money for 2 days",
      progress: 85,
      maxProgress: 100,
      status: "active",
      reward: 500,
      badge: "gold",
      icon: Flame,
      streak: 12,
      color: "#E4C580"
    },
    {
      name: "21-Day Savings Run",
      description: "Save ₹500 daily for 21 days",
      progress: 14,
      maxProgress: 21,
      status: "active",
      reward: 1000,
      badge: "platinum",
      icon: Star,
      streak: 14,
      color: "#7433FF"
    },
    {
      name: "Grocery Detox",
      description: "Stay under ₹5,000 this month",
      progress: 3200,
      maxProgress: 5000,
      status: "active",
      reward: 750,
      badge: "silver",
      icon: Trophy,
      color: "#3BF7FF"
    },
    {
      name: "Investment Streak",
      description: "Invest for 30 days straight",
      progress: 0,
      maxProgress: 30,
      status: "locked",
      reward: 2000,
      badge: "platinum",
      icon: Lock,
      color: "#FF6B6B"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10"
      style={{
        boxShadow: "0 8px 32px rgba(228, 197, 128, 0.08)"
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl mb-1">Challenges</h3>
          <p className="text-xs text-white/50">Gamify your savings</p>
        </div>
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Trophy className="w-6 h-6 text-[#E4C580]" />
        </motion.div>
      </div>

      <div className="space-y-3">
        {challenges.map((challenge, index) => {
          const Icon = challenge.icon
          const percentage = (challenge.progress / challenge.maxProgress) * 100
          const isLocked = challenge.status === "locked"

          return (
            <motion.div
              key={challenge.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={!isLocked ? { scale: 1.02, x: 4 } : {}}
              className={`relative p-4 rounded-2xl border overflow-hidden ${
                isLocked
                  ? "bg-white/5 border-white/5"
                  : "bg-gradient-to-br from-white/10 to-white/5 border-white/10"
              } ${isLocked ? "opacity-50" : "cursor-pointer"}`}
            >
              {/* Glow Effect */}
              {!isLocked && (
                <motion.div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${challenge.color}15, transparent 70%)`
                  }}
                />
              )}

              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-3">
                  <motion.div
                    whileHover={!isLocked ? { rotate: 360 } : {}}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isLocked
                        ? "rgba(255, 255, 255, 0.05)"
                        : `linear-gradient(135deg, ${challenge.color}30, ${challenge.color}10)`,
                      boxShadow: !isLocked
                        ? `0 0 20px ${challenge.color}20`
                        : "none"
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: isLocked ? "#666" : challenge.color }}
                    />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm truncate">{challenge.name}</p>
                      {!isLocked && challenge.streak && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E4C580]/20 flex-shrink-0"
                        >
                          <Flame className="w-3 h-3 text-[#E4C580]" />
                          <span className="text-xs text-[#E4C580]">
                            {challenge.streak}
                          </span>
                        </motion.div>
                      )}
                    </div>
                    <p className="text-xs text-white/40 mb-3">
                      {challenge.description}
                    </p>

                    {/* Progress Bar */}
                    {!isLocked && (
                      <>
                        <div className="relative h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{
                              duration: 1,
                              delay: 0.9 + index * 0.1
                            }}
                            className="h-full rounded-full relative"
                            style={{
                              background: `linear-gradient(90deg, ${challenge.color}, ${challenge.color}80)`,
                              boxShadow: `0 0 10px ${challenge.color}`
                            }}
                          >
                            {/* Confetti effect when near completion */}
                            {percentage > 90 && (
                              <>
                                {[...Array(5)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="absolute top-0 w-1 h-1 rounded-full bg-white"
                                    style={{
                                      left: `${Math.random() * 100}%`
                                    }}
                                    animate={{
                                      y: [-10, -30],
                                      opacity: [1, 0],
                                      scale: [1, 0]
                                    }}
                                    transition={{
                                      duration: 1,
                                      delay: i * 0.2,
                                      repeat: Infinity,
                                      repeatDelay: 2
                                    }}
                                  />
                                ))}
                              </>
                            )}
                          </motion.div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/40">
                            {challenge.progress} / {challenge.maxProgress}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-[#E4C580]" />
                            <span className="text-[#E4C580]">
                              ₹{challenge.reward}
                            </span>
                          </div>
                        </div>
                      </>
                    )}

                    {isLocked && (
                      <div className="flex items-center gap-2 text-xs text-white/30">
                        <Lock className="w-3 h-3" />
                        <span>Complete previous challenges to unlock</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Leaderboard Teaser */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#7433FF]/10 to-[#3BF7FF]/10 border border-[#7433FF]/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E4C580] to-[#E4C580]/60 flex items-center justify-center">
              <Users className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="text-sm">Friends Leaderboard</p>
              <p className="text-xs text-white/50">You're #3 this week</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs"
          >
            View
          </motion.button>
        </div>
      </motion.div>

      {/* Total Rewards Earned */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between"
      >
        <p className="text-sm text-white/50">Total Rewards Earned</p>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-4 h-4 text-[#E4C580]" />
          </motion.div>
          <p className="text-xl text-[#E4C580]">₹4,250</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
export default FinancialChallenges;