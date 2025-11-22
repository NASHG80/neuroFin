import { motion } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts"
import {
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  Eye,
  EyeOff
} from "lucide-react"
import { useState } from "react"

const InvestmentPortfolio = () => {
  const [showReturns, setShowReturns] = useState(true)
  const [activeIndex, setActiveIndex] = useState(null)

  const portfolioData = [
    {
      name: "Equity Funds",
      value: 850000,
      color: "#3BF7FF",
      allocation: 46,
      returns: 18.5
    },
    {
      name: "Debt Funds",
      value: 450000,
      color: "#7433FF",
      allocation: 24,
      returns: 7.2
    },
    {
      name: "Gold",
      value: 200000,
      color: "#E4C580",
      allocation: 11,
      returns: 12.8
    },
    {
      name: "Real Estate",
      value: 250000,
      color: "#FF6B6B",
      allocation: 14,
      returns: 9.5
    },
    {
      name: "Fixed Deposits",
      value: 100000,
      color: "#A78BFA",
      allocation: 5,
      returns: 6.5
    }
  ]

  const performanceData = [
    { month: "May", value: 1720000 },
    { month: "Jun", value: 1755000 },
    { month: "Jul", value: 1738000 },
    { month: "Aug", value: 1792000 },
    { month: "Sep", value: 1815000 },
    { month: "Oct", value: 1850000 }
  ]

  const totalInvestment = portfolioData.reduce(
    (sum, item) => sum + item.value,
    0
  )
  const totalReturns = 125000 // Mock data
  const returnsPercentage = (
    (totalReturns / (totalInvestment - totalReturns)) *
    100
  ).toFixed(2)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl bg-black/95 backdrop-blur-xl border border-white/20"
        >
          <p className="text-sm mb-2">{data.name}</p>
          <p className="text-xs text-white/60 mb-1">
            Investment: ₹{(data.value / 1000).toFixed(0)}k
          </p>
          <p className="text-xs text-white/60 mb-1">
            Allocation: {data.allocation}%
          </p>
          <p className="text-xs text-[#3BF7FF]">Returns: +{data.returns}%</p>
        </motion.div>
      )
    }
    return null
  }

  const LineTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 rounded-xl bg-black/95 backdrop-blur-xl border border-white/20"
        >
          <p className="text-xs text-white/60 mb-1">
            {payload[0].payload.month}
          </p>
          <p className="text-sm text-[#3BF7FF]">
            ₹{(payload[0].value / 100000).toFixed(2)}L
          </p>
        </motion.div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10"
      style={{
        boxShadow: "0 8px 32px rgba(116, 51, 255, 0.1)"
      }}
    >
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-2xl mb-2">Investment Portfolio</h3>
          <p className="text-white/50">
            Asset allocation & performance tracking
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowReturns(!showReturns)}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          {showReturns ? (
            <Eye className="w-5 h-5" />
          ) : (
            <EyeOff className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#7433FF]/10 to-transparent border border-[#7433FF]/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-5 h-5 text-[#7433FF]" />
            <p className="text-sm text-white/60">Total Value</p>
          </div>
          <p className="text-2xl">₹{(totalInvestment / 100000).toFixed(2)}L</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#3BF7FF]/10 to-transparent border border-[#3BF7FF]/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-[#3BF7FF]" />
            <p className="text-sm text-white/60">Total Returns</p>
          </div>
          <motion.p
            key={showReturns ? "visible" : "hidden"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl text-[#3BF7FF]"
          >
            {showReturns ? `+₹${(totalReturns / 1000).toFixed(0)}k` : "••••••"}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#E4C580]/10 to-transparent border border-[#E4C580]/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-[#E4C580]" />
            <p className="text-sm text-white/60">Growth Rate</p>
          </div>
          <motion.p
            key={showReturns ? "visible" : "hidden"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl text-[#E4C580]"
          >
            {showReturns ? `+${returnsPercentage}%` : "••••"}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-transparent border border-[#FF6B6B]/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-[#FF6B6B]" />
            <p className="text-sm text-white/60">Target: 2025</p>
          </div>
          <p className="text-2xl">₹25L</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart - Asset Allocation */}
        <div>
          <h4 className="text-lg mb-4 text-white/80">Asset Allocation</h4>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="h-[300px] relative"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {portfolioData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={
                        activeIndex === null || activeIndex === index ? 1 : 0.3
                      }
                      style={{
                        filter:
                          activeIndex === index
                            ? `drop-shadow(0 0 8px ${entry.color})`
                            : "none",
                        transition: "all 0.3s"
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Value */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-sm text-white/50 mb-1">Total Portfolio</p>
              <p className="text-2xl">
                ₹{(totalInvestment / 100000).toFixed(1)}L
              </p>
            </div>
          </motion.div>

          {/* Legend */}
          <div className="mt-6 space-y-3">
            {portfolioData.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 10px ${item.color}`
                    }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm">₹{(item.value / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-white/40">{item.allocation}%</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Line Chart - Performance */}
        <div>
          <h4 className="text-lg mb-4 text-white/80">6-Month Performance</h4>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <defs>
                  <linearGradient
                    id="performanceGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#3BF7FF" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3BF7FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="month"
                  stroke="rgba(255,255,255,0.4)"
                  style={{ fontSize: "12px" }}
                  tickLine={false}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.4)"
                  style={{ fontSize: "12px" }}
                  tickFormatter={value => `₹${(value / 100000).toFixed(1)}L`}
                  tickLine={false}
                />
                <Tooltip content={<LineTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3BF7FF"
                  strokeWidth={3}
                  dot={{ fill: "#3BF7FF", strokeWidth: 2, r: 5 }}
                  activeDot={{
                    r: 7,
                    strokeWidth: 0,
                    fill: "#3BF7FF",
                    filter: "drop-shadow(0 0 8px #3BF7FF)"
                  }}
                  fill="url(#performanceGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Performance Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-6 grid grid-cols-2 gap-3"
          >
            <div className="p-4 rounded-xl bg-[#3BF7FF]/5 border border-[#3BF7FF]/20">
              <p className="text-xs text-white/50 mb-1">6-Month Growth</p>
              <p className="text-xl text-[#3BF7FF]">+7.56%</p>
            </div>
            <div className="p-4 rounded-xl bg-[#E4C580]/5 border border-[#E4C580]/20">
              <p className="text-xs text-white/50 mb-1">Best Performer</p>
              <p className="text-xl text-[#E4C580]">Equity +18.5%</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* AI Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-[#7433FF]/10 to-[#3BF7FF]/10 border border-[#7433FF]/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center flex-shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm mb-2">AI Portfolio Rebalancing Suggestion</p>
            <p className="text-xs text-white/60">
              Your equity allocation is optimal. Consider increasing debt
              allocation by 5% to reduce portfolio volatility. Expected impact:
              -2% risk, +1.2% stability.
            </p>
            <div className="flex gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-lg bg-[#7433FF]/20 hover:bg-[#7433FF]/30 text-sm transition-colors"
              >
                Apply Suggestion
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
export default InvestmentPortfolio;