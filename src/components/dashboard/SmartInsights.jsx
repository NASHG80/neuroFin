import { motion } from "framer-motion"
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Target,
  Zap,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  Shield
} from "lucide-react"
import { useState } from "react"

const SmartInsights = () => {
  const [selectedInsight, setSelectedInsight] = useState(0)

  const insights = [
    {
      id: 1,
      type: "opportunity",
      icon: Lightbulb,
      color: "#E4C580",
      title: "High-Yield Savings Opportunity",
      description:
        "You have ₹85,000 sitting idle in your savings account earning just 3.5% interest.",
      impact: "High",
      potential: "+₹12,500/year",
      recommendation:
        "Move ₹50,000 to a high-yield fixed deposit earning 7.5% or invest in debt mutual funds for potentially higher returns.",
      confidence: 94,
      action: "Optimize Now",
      tags: ["Savings", "Investment", "Returns"]
    },
    {
      id: 2,
      type: "warning",
      icon: AlertTriangle,
      color: "#FF6B6B",
      title: "Subscription Overlap Detected",
      description:
        "You're paying for 3 music streaming services: Spotify, Apple Music, and YouTube Premium.",
      impact: "Medium",
      potential: "₹5,400/year savings",
      recommendation:
        "Cancel 2 services and keep only YouTube Premium for music + video content.",
      confidence: 98,
      action: "Review Subscriptions",
      tags: ["Expenses", "Optimization", "Recurring"]
    },
    {
      id: 3,
      type: "goal",
      icon: Target,
      color: "#3BF7FF",
      title: "Wedding Goal Acceleration",
      description:
        "At your current savings rate, you'll reach your ₹20L wedding goal in 18 months.",
      impact: "High",
      potential: "Achieve 6 months earlier",
      recommendation:
        "Increase monthly SIP by ₹8,000 and reduce dining expenses by ₹5,000 to reach your goal by March 2025.",
      confidence: 87,
      action: "Auto-Optimize",
      tags: ["Goals", "Savings", "Timeline"]
    },
    {
      id: 4,
      type: "tax",
      icon: Shield,
      color: "#7433FF",
      title: "Tax Saving Opportunity",
      description:
        "You can save ₹46,800 in taxes by maximizing your 80C deduction limit.",
      impact: "High",
      potential: "₹46,800 tax savings",
      recommendation:
        "Invest ₹1,50,000 in ELSS funds before March 31st. You've only utilized ₹80,000 of your ₹1.5L limit.",
      confidence: 96,
      action: "Plan Tax Savings",
      tags: ["Tax", "Investment", "Deadline"]
    },
    {
      id: 5,
      type: "spending",
      icon: DollarSign,
      color: "#E4C580",
      title: "Weekend Spending Spike",
      description:
        "Your weekend spending is 68% higher than weekdays, averaging ₹8,200 per weekend.",
      impact: "Medium",
      potential: "₹15,600/month savings",
      recommendation:
        "Set weekend budget alerts and plan activities in advance. Consider free alternatives for entertainment.",
      confidence: 91,
      action: "Set Budget Alert",
      tags: ["Spending", "Habits", "Behavioral"]
    },
    {
      id: 6,
      type: "investment",
      icon: TrendingUp,
      color: "#3BF7FF",
      title: "Portfolio Rebalancing Required",
      description:
        "Your equity allocation has grown to 52% due to market gains. Recommended: 45%.",
      impact: "Medium",
      potential: "Reduce risk by 15%",
      recommendation:
        "Book partial profits from equity and reallocate to debt funds to maintain optimal risk-return balance.",
      confidence: 89,
      action: "Rebalance Portfolio",
      tags: ["Investment", "Risk", "Portfolio"]
    }
  ]

  const insight = insights[selectedInsight]
  const Icon = insight.icon

  const impactColors = {
    High: "#FF6B6B",
    Medium: "#E4C580",
    Low: "#3BF7FF"
  }

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Insights List */}
      <div className="col-span-12 lg:col-span-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl">AI Insights</h3>
              <p className="text-xs text-white/50">
                Personalized recommendations
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {insights.map((item, index) => {
              const ItemIcon = item.icon
              const isSelected = selectedInsight === index

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  onClick={() => setSelectedInsight(index)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-white/10 border-2"
                      : "bg-white/5 border border-white/5 hover:bg-white/8"
                  }`}
                  style={{
                    borderColor: isSelected ? item.color : undefined,
                    boxShadow: isSelected
                      ? `0 0 30px ${item.color}30`
                      : undefined
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`
                      }}
                    >
                      <ItemIcon
                        className="w-5 h-5"
                        style={{ color: item.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm mb-1 truncate">{item.title}</p>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${impactColors[item.impact]}20`,
                            color: impactColors[item.impact]
                          }}
                        >
                          {item.impact} Impact
                        </span>
                        <span className="text-xs text-white/40">
                          {item.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Detailed Insight View */}
      <div className="col-span-12 lg:col-span-8">
        <motion.div
          key={selectedInsight}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-10 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 relative overflow-hidden"
          style={{
            boxShadow: `0 8px 32px ${insight.color}20`
          }}
        >
          {/* Animated Background Gradient */}
          <motion.div
            animate={{
              background: [
                `radial-gradient(circle at 20% 20%, ${insight.color}15, transparent 50%)`,
                `radial-gradient(circle at 80% 80%, ${insight.color}15, transparent 50%)`,
                `radial-gradient(circle at 20% 20%, ${insight.color}15, transparent 50%)`
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0"
          />

          <div className="relative">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${insight.color}40, ${insight.color}20)`,
                    boxShadow: `0 0 40px ${insight.color}40`
                  }}
                >
                  <Icon className="w-8 h-8" style={{ color: insight.color }} />
                </motion.div>
                <div>
                  <h2 className="text-3xl mb-2">{insight.title}</h2>
                  <p className="text-white/60 text-lg">{insight.description}</p>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <p className="text-sm text-white/50 mb-2">Impact Level</p>
                <p
                  className="text-2xl mb-2"
                  style={{ color: impactColors[insight.impact] }}
                >
                  {insight.impact}
                </p>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width:
                        insight.impact === "High"
                          ? "100%"
                          : insight.impact === "Medium"
                          ? "66%"
                          : "33%"
                    }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: impactColors[insight.impact] }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <p className="text-sm text-white/50 mb-2">Potential Benefit</p>
                <p className="text-2xl text-[#3BF7FF]">{insight.potential}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <p className="text-sm text-white/50 mb-2">AI Confidence</p>
                <div className="flex items-center gap-3">
                  <p className="text-2xl text-[#E4C580]">
                    {insight.confidence}%
                  </p>
                  <div className="flex-1">
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${insight.confidence}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#E4C580] to-[#3BF7FF]"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recommendation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-[#7433FF]/10 to-[#3BF7FF]/10 border border-[#7433FF]/30 mb-6"
            >
              <div className="flex items-start gap-4">
                <Lightbulb className="w-6 h-6 text-[#E4C580] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-[#3BF7FF] mb-2">
                    AI Recommendation
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    {insight.recommendation}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tags */}
            <div className="flex items-center gap-2 mb-6">
              {insight.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#7433FF] to-[#3BF7FF] hover:shadow-lg hover:shadow-[#7433FF]/30 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                <span>{insight.action}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                Learn More
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                Dismiss
              </motion.button>
            </div>

            {/* Stats at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between"
            >
              <div className="flex items-center gap-6 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Generated today</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  <span>Based on 847 data points</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                >
                  <CheckCircle className="w-5 h-5 text-[#3BF7FF]" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                >
                  <XCircle className="w-5 h-5 text-[#FF6B6B]" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
export default SmartInsights;