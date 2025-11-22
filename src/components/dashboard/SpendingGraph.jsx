import { motion } from "framer-motion"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts"
import { AlertCircle, Coffee, ShoppingBag, Home, Car } from "lucide-react"
import { useState } from "react"

const SpendingGraph = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null)
  const [timeframe, setTimeframe] = useState("6months")
  const [showIncome, setShowIncome] = useState(true)
  const [showSpending, setShowSpending] = useState(true)

  const data6months = [
    { month: "May", spending: 52000, income: 85000 },
    { month: "Jun", spending: 48000, income: 90000 },
    { month: "Jul", spending: 61000, income: 85000 },
    { month: "Aug", spending: 55000, income: 95000 },
    { month: "Sep", spending: 68000, income: 85000 },
    { month: "Oct", spending: 53000, income: 100000 }
  ]

  const data1year = [
    { month: "Nov '23", spending: 55000, income: 80000 },
    { month: "Dec '23", spending: 72000, income: 95000 },
    { month: "Jan", spending: 48000, income: 80000 },
    { month: "Feb", spending: 51000, income: 85000 },
    { month: "Mar", spending: 54000, income: 90000 },
    { month: "Apr", spending: 45000, income: 85000 },
    { month: "May", spending: 52000, income: 85000 },
    { month: "Jun", spending: 48000, income: 90000 },
    { month: "Jul", spending: 61000, income: 85000 },
    { month: "Aug", spending: 55000, income: 95000 },
    { month: "Sep", spending: 68000, income: 85000 },
    { month: "Oct", spending: 53000, income: 100000 }
  ]

  const data = timeframe === "6months" ? data6months : data1year

  const categories = [
    {
      name: "Dining",
      amount: 12500,
      percentage: 24,
      color: "#3BF7FF",
      icon: Coffee
    },
    {
      name: "Shopping",
      amount: 18200,
      percentage: 34,
      color: "#7433FF",
      icon: ShoppingBag
    },
    {
      name: "Housing",
      amount: 15000,
      percentage: 28,
      color: "#E4C580",
      icon: Home
    },
    {
      name: "Transport",
      amount: 7300,
      percentage: 14,
      color: "#FF6B6B",
      icon: Car
    }
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/20"
          style={{
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
          }}
        >
          <p className="text-sm text-white/50 mb-2">
            {payload[0].payload.month}
          </p>
          <p className="text-[#3BF7FF] mb-1">
            Spending: ₹{payload[0].value.toLocaleString("en-IN")}
          </p>
          <p className="text-[#E4C580]">
            Income: ₹{payload[1].value.toLocaleString("en-IN")}
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
      transition={{ delay: 0.4 }}
      className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden group"
      style={{
        boxShadow: "0 8px 32px rgba(116, 51, 255, 0.08)"
      }}
    >
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-xl mb-2">Intelligent Spending</h3>
          <p className="text-white/50">
            AI-powered insights on your money flow
          </p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-[#7433FF]/20 text-[#7433FF] border border-[#7433FF]/30 text-sm"
          >
            This Month
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-white/5 text-white/50 text-sm hover:bg-white/10"
          >
            Last 6 Months
          </motion.button>
        </div>
      </div>

      {/* AI Insight Banner */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#3BF7FF]/10 to-transparent border border-[#3BF7FF]/20 flex items-center gap-3"
      >
        <AlertCircle className="w-5 h-5 text-[#3BF7FF] flex-shrink-0" />
        <p className="text-sm text-white/80">
          <span className="text-[#3BF7FF]">AI detected:</span> You spent 22%
          more on shopping this month. Consider setting a budget limit.
        </p>
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="h-[300px] mb-8"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            onMouseMove={e => setHoveredPoint(e.activePayload)}
          >
            <defs>
              <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3BF7FF" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3BF7FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E4C580" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#E4C580" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="month"
              stroke="rgba(255,255,255,0.3)"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.3)"
              style={{ fontSize: "12px" }}
              tickFormatter={value => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.1)" }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#E4C580"
              strokeWidth={3}
              fill="url(#incomeGradient)"
              dot={{ fill: "#E4C580", strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                fill: "#E4C580",
                strokeWidth: 0,
                filter: "drop-shadow(0 0 8px #E4C580)"
              }}
            />
            <Area
              type="monotone"
              dataKey="spending"
              stroke="#3BF7FF"
              strokeWidth={3}
              fill="url(#spendingGradient)"
              dot={{ fill: "#3BF7FF", strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                fill: "#3BF7FF",
                strokeWidth: 0,
                filter: "drop-shadow(0 0 8px #3BF7FF)"
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Category Breakdown */}
      <div>
        <h4 className="text-sm text-white/50 mb-4">Top Spending Categories</h4>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                style={{
                  boxShadow: `0 4px 20px ${category.color}10`
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: category.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/70">{category.name}</p>
                    <p className="text-lg">
                      ₹{category.amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percentage}%` }}
                    transition={{ delay: 1 + index * 0.1, duration: 1 }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: category.color,
                      boxShadow: `0 0 10px ${category.color}`
                    }}
                  />
                </div>
                <p className="text-xs text-white/40 mt-2">
                  {category.percentage}% of total
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
export default SpendingGraph;