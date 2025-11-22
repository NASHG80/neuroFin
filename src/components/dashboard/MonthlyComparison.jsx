import { motion } from "framer-motion"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from "recharts"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"
import { useState } from "react"

const MonthlyComparison = () => {
  const [selectedComparison, setSelectedComparison] = useState("lastMonth")

  const radarData = [
    { category: "Savings", thisMonth: 47, lastPeriod: 33, fullMark: 50 },
    { category: "Income", thisMonth: 100, lastPeriod: 85, fullMark: 100 },
    { category: "Investments", thisMonth: 85, lastPeriod: 72, fullMark: 100 },
    { category: "Spending", thisMonth: 53, lastPeriod: 68, fullMark: 100 },
    { category: "Goals", thisMonth: 94, lastPeriod: 87, fullMark: 100 }
  ]

  const comparisonMetrics = [
    {
      label: "Spending",
      thisMonth: 53000,
      lastPeriod: 68000,
      change: -22.1,
      isPositive: true
    },
    {
      label: "Income",
      thisMonth: 100000,
      lastPeriod: 85000,
      change: 17.6,
      isPositive: true
    },
    {
      label: "Savings",
      thisMonth: 47000,
      lastPeriod: 33000,
      change: 42.4,
      isPositive: true
    },
    {
      label: "Investments",
      thisMonth: 85000,
      lastPeriod: 72000,
      change: 18.1,
      isPositive: true
    }
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 rounded-xl bg-black/95 backdrop-blur-xl border border-white/20"
        >
          <p className="text-xs text-white/70 mb-2">
            {payload[0].payload.category}
          </p>
          <p className="text-xs text-[#3BF7FF] mb-1">
            This Month: {payload[0].value}k
          </p>
          <p className="text-xs text-[#7433FF]">
            Last Period: {payload[1].value}k
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
      transition={{ delay: 0.5 }}
      className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10"
      style={{
        boxShadow: "0 8px 32px rgba(116, 51, 255, 0.08)"
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl mb-1">Monthly Comparison</h3>
          <p className="text-xs text-white/50">
            Performance vs previous period
          </p>
        </div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Calendar className="w-5 h-5 text-[#7433FF]" />
        </motion.div>
      </div>

      {/* Comparison Toggle */}
      <div className="flex gap-2 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedComparison("lastMonth")}
          className={`flex-1 px-3 py-2 rounded-xl text-xs transition-all ${
            selectedComparison === "lastMonth"
              ? "bg-[#7433FF]/20 text-[#7433FF] border border-[#7433FF]/30"
              : "bg-white/5 text-white/50 hover:bg-white/10"
          }`}
        >
          vs Last Month
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedComparison("lastYear")}
          className={`flex-1 px-3 py-2 rounded-xl text-xs transition-all ${
            selectedComparison === "lastYear"
              ? "bg-[#7433FF]/20 text-[#7433FF] border border-[#7433FF]/30"
              : "bg-white/5 text-white/50 hover:bg-white/10"
          }`}
        >
          vs Last Year
        </motion.button>
      </div>

      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="h-[250px] mb-6"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="This Month"
              dataKey="thisMonth"
              stroke="#3BF7FF"
              fill="#3BF7FF"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Last Period"
              dataKey="lastPeriod"
              stroke="#7433FF"
              fill="#7433FF"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Comparison Metrics */}
      <div className="space-y-3">
        {comparisonMetrics.map((metric, index) => {
          const isIncrease = metric.change > 0
          const isSpending = metric.label === "Spending"
          const isGood = isSpending ? !isIncrease : isIncrease

          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/8 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70">{metric.label}</span>
                <div
                  className={`flex items-center gap-1 text-xs ${
                    isGood ? "text-[#3BF7FF]" : "text-[#FF6B6B]"
                  }`}
                >
                  {isIncrease ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{Math.abs(metric.change).toFixed(1)}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <p className="text-white/40 mb-1">This Month</p>
                  <p className="text-sm">
                    ₹{(metric.thisMonth / 1000).toFixed(0)}k
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/40 mb-1">Last Period</p>
                  <p className="text-sm">
                    ₹{(metric.lastPeriod / 1000).toFixed(0)}k
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(metric.thisMonth /
                      Math.max(metric.thisMonth, metric.lastPeriod)) *
                      100}%`
                  }}
                  transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                  className="h-full rounded-full"
                  style={{
                    background: isGood
                      ? "linear-gradient(90deg, #3BF7FF, #7433FF)"
                      : "linear-gradient(90deg, #FF6B6B, #FF8E8E)",
                    boxShadow: isGood ? "0 0 10px #3BF7FF" : "0 0 10px #FF6B6B"
                  }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#3BF7FF]/10 to-[#E4C580]/10 border border-[#3BF7FF]/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#3BF7FF]/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-[#3BF7FF]" />
          </div>
          <div>
            <p className="text-sm mb-1">Outstanding Progress!</p>
            <p className="text-xs text-white/60">
              You've improved in 4 out of 5 categories this month. Your
              financial health is trending upward.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
export default MonthlyComparison;