import { motion, AnimatePresence } from "framer-motion"
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
  Shield,
  ArrowLeft,
  ChevronRight
} from "lucide-react"
import { useState, useEffect } from "react"

const SmartInsights = () => {
  const [selectedInsight, setSelectedInsight] = useState(0)
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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

  const handleInsightClick = (index) => {
    setSelectedInsight(index)
    if (isMobile) setIsMobileDetailOpen(true)
  }

  // Function to handle closing the detail view
  const handleDismiss = () => {
    if (isMobile) {
      setIsMobileDetailOpen(false);
    }
    // In desktop view, dismiss might mean something else like marking as read,
    // but for now, we'll just close the mobile overlay.
  }

  const insight = insights[selectedInsight]
  const Icon = insight.icon

  const impactColors = {
    High: "#FF6B6B",
    Medium: "#E4C580",
    Low: "#3BF7FF"
  }

  // LIST VIEW COMPONENT
  const InsightsList = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-12 lg:col-span-4 space-y-4"
    >
      <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10">
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
            const isSelected = selectedInsight === index && !isMobile

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                onClick={() => handleInsightClick(index)}
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
                <div className="flex items-center gap-3">
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
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${impactColors[item.impact]}20`,
                          color: impactColors[item.impact]
                        }}
                      >
                        {item.impact}
                      </span>
                      <span className="text-[10px] text-white/40">
                        {item.confidence}% match
                      </span>
                    </div>
                  </div>
                  {isMobile && <ChevronRight className="w-5 h-5 text-white/30" />}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )

  // DETAIL VIEW COMPONENT
  const InsightDetail = () => (
    <motion.div
      key={selectedInsight}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`col-span-12 lg:col-span-8 ${isMobile ? 'fixed inset-0 z-50 bg-[#00010D] overflow-y-auto' : ''}`}
    >
      <div className={`p-6 lg:p-10 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 relative overflow-hidden min-h-full lg:min-h-0`}>
        
        {/* Mobile Header with Back Button */}
        {isMobile && (
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
            <button onClick={handleDismiss} className="p-2 bg-white/10 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="text-lg font-medium">Insight Details</span>
          </div>
        )}

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
          className="absolute inset-0 pointer-events-none"
        />

        <div className="relative">
          {/* Content Header */}
          <div className="flex flex-col md:flex-row items-start gap-4 mb-8">
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${insight.color}40, ${insight.color}20)`,
                boxShadow: `0 0 40px ${insight.color}40`
              }}
            >
              <Icon className="w-8 h-8" style={{ color: insight.color }} />
            </motion.div>
            <div>
              <h2 className="text-2xl md:text-3xl mb-2 leading-tight">{insight.title}</h2>
              <p className="text-white/60 text-base md:text-lg">{insight.description}</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/50 mb-2">Impact Level</p>
              <p className="text-xl md:text-2xl mb-2" style={{ color: impactColors[insight.impact] }}>
                {insight.impact}
              </p>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ 
                    width: insight.impact === "High" ? "100%" : insight.impact === "Medium" ? "66%" : "33%",
                    backgroundColor: impactColors[insight.impact] 
                  }} 
                />
              </div>
            </div>

            <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/50 mb-2">Potential Benefit</p>
              <p className="text-xl md:text-2xl text-[#3BF7FF]">{insight.potential}</p>
            </div>

            <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/50 mb-2">AI Confidence</p>
              <div className="flex items-center gap-3">
                <p className="text-xl md:text-2xl text-[#E4C580]">{insight.confidence}%</p>
                <div className="flex-1">
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-[#E4C580] to-[#3BF7FF]" 
                      style={{ width: `${insight.confidence}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#7433FF]/10 to-[#3BF7FF]/10 border border-[#7433FF]/30 mb-6">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-[#E4C580] flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-[#3BF7FF] mb-2">AI Recommendation</p>
                <p className="text-white/80 leading-relaxed text-sm md:text-base">
                  {insight.recommendation}
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {insight.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#7433FF] to-[#3BF7FF] font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#7433FF]/30 transition-all">
              <Zap className="w-5 h-5" />
              <span>{insight.action}</span>
            </button>
            <div className="flex gap-3">
              <button className="flex-1 sm:flex-none px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                Learn More
              </button>
              <button 
                onClick={handleDismiss}
                className="flex-1 sm:flex-none px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/50 hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-white/50">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Generated today</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                <span>Based on 847 data points</span>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                <CheckCircle className="w-5 h-5 text-[#3BF7FF]" />
              </button>
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                <XCircle className="w-5 h-5 text-[#FF6B6B]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* List is always visible on desktop, visible on mobile if detail is closed */}
      {(!isMobile || !isMobileDetailOpen) && <InsightsList />}
      
      {/* Detail is visible on desktop (col-span-8), or as overlay on mobile */}
      {(isMobile ? isMobileDetailOpen : true) && (
        <AnimatePresence>
          {isMobileDetailOpen || !isMobile ? <InsightDetail /> : null}
        </AnimatePresence>
      )}
    </div>
  )
}

export default SmartInsights;