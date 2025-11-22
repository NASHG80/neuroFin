import { motion } from "framer-motion"
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Info
} from "lucide-react"
import { useState, useEffect } from "react"

const FinancialHealthScore = () => {
  const [score, setScore] = useState(0)
  const [selectedMetric, setSelectedMetric] = useState(null)
  const targetScore = 847

  useEffect(() => {
    const timer = setTimeout(() => {
      if (score < targetScore) {
        setScore(prev => Math.min(prev + 7, targetScore))
      }
    }, 20)
    return () => clearTimeout(timer)
  }, [score])

  const scorePercentage = (score / 1000) * 100
  const circumference = 2 * Math.PI * 140
  const strokeDashoffset =
    circumference - (scorePercentage / 100) * circumference

  const metrics = [
    {
      label: "Spending",
      value: 92,
      trend: "up",
      color: "#3BF7FF",
      description: "You're spending efficiently across all categories",
      improvement: "Save ₹5k more by reducing dining expenses"
    },
    {
      label: "Income",
      value: 88,
      trend: "up",
      color: "#E4C580",
      description: "Income is steady with good growth potential",
      improvement: "Consider freelance opportunities for +15% income"
    },
    {
      label: "Budget",
      value: 76,
      trend: "down",
      color: "#7433FF",
      description: "Budget adherence needs attention",
      improvement: "Set alerts when reaching 80% of category budgets"
    },
    {
      label: "Investments",
      value: 85,
      trend: "up",
      color: "#3BF7FF",
      description: "Strong investment portfolio performance",
      improvement: "Increase SIP by ₹5k for better returns"
    },
    {
      label: "Goals",
      value: 94,
      trend: "up",
      color: "#E4C580",
      description: "Excellent progress on financial goals",
      improvement: "You're ahead of schedule on 3/4 goals"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden group"
      style={{
        boxShadow:
          "0 8px 32px rgba(116, 51, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
      }}
    >
      {/* Glow Effect on Hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(116, 51, 255, 0.15), transparent 70%)"
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl">Financial Health Score</h3>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-[#E4C580]" />
              </motion.div>
            </div>
            <p className="text-white/50">Your financial wellness at a glance</p>
          </div>
          <div className="flex gap-2">
            <motion.div
              className="px-4 py-2 rounded-full bg-[#3BF7FF]/10 border border-[#3BF7FF]/30"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 247, 255, 0)",
                  "0 0 20px rgba(59, 247, 255, 0.3)",
                  "0 0 20px rgba(59, 247, 255, 0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-sm text-[#3BF7FF]">Excellent</p>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10"
            >
              <Info className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="flex items-center gap-12">
          {/* Health Score Ring */}
          <div className="relative">
            <svg width="320" height="320" className="transform -rotate-90">
              {/* Background Ring */}
              <circle
                cx="160"
                cy="160"
                r="140"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="20"
              />
              {/* Animated Ring */}
              <motion.circle
                cx="160"
                cy="160"
                r="140"
                fill="none"
                stroke="url(#healthGradient)"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{
                  filter: "drop-shadow(0 0 10px rgba(116, 51, 255, 0.6))"
                }}
              />
              {/* Pulse Ring */}
              <motion.circle
                cx="160"
                cy="160"
                r="140"
                fill="none"
                stroke="#7433FF"
                strokeWidth="2"
                opacity="0.5"
                animate={{
                  r: [140, 150, 140],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <defs>
                <linearGradient
                  id="healthGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#7433FF" />
                  <stop offset="50%" stopColor="#3BF7FF" />
                  <stop offset="100%" stopColor="#E4C580" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-7xl tracking-tight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent"
              >
                {score}
              </motion.div>
              <p className="text-white/50 mt-1">out of 1000</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7433FF]/20 to-[#3BF7FF]/20 border border-[#7433FF]/30 text-sm flex items-center gap-2"
              >
                View Details
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Metrics Breakdown */}
          <div className="flex-1 space-y-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                onClick={() =>
                  setSelectedMetric(
                    selectedMetric === metric.label ? null : metric.label
                  )
                }
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: metric.color,
                        boxShadow: `0 0 10px ${metric.color}`
                      }}
                    />
                    <span className="text-white/70">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${metric.color}, ${metric.color}80)`,
                          boxShadow: `0 0 10px ${metric.color}`
                        }}
                      />
                    </div>
                    <span className="w-12 text-right">{metric.value}%</span>
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-[#3BF7FF]" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-[#FF6B6B]" />
                    )}
                  </div>
                </div>
                {selectedMetric === metric.label && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-5 mt-2 p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <p className="text-xs text-white/60 mb-2">
                      {metric.description}
                    </p>
                    <p className="text-xs text-[#3BF7FF]">
                      💡 {metric.improvement}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Assistant Bubble */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#7433FF]/10 to-[#3BF7FF]/10 border border-[#7433FF]/30 relative overflow-hidden"
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{
              background: [
                "linear-gradient(90deg, rgba(116, 51, 255, 0.1) 0%, rgba(59, 247, 255, 0.1) 100%)",
                "linear-gradient(90deg, rgba(59, 247, 255, 0.1) 0%, rgba(116, 51, 255, 0.1) 100%)",
                "linear-gradient(90deg, rgba(116, 51, 255, 0.1) 0%, rgba(59, 247, 255, 0.1) 100%)"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <div className="relative z-10 flex items-start gap-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center flex-shrink-0"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            <div className="flex-1">
              <p className="text-sm mb-1 text-[#3BF7FF]">Nuerofin AI</p>
              <p className="text-white/80">
                Your spending is trending 12% lower this month. You're on track
                to save ₹45,000 extra by Diwali. Keep it up!
              </p>
              <div className="flex gap-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-lg bg-[#7433FF]/20 hover:bg-[#7433FF]/30 text-sm"
                >
                  Show me how
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm"
                >
                  Set auto-save
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
export default FinancialHealthScore;