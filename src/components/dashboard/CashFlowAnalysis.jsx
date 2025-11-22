import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { useState } from "react"

const CashFlowAnalysis = () => {
  const [timeframe, setTimeframe] = useState("6months")

  const data = {
    "6months": [
      { month: "May", income: 85000, expenses: 52000, savings: 33000 },
      { month: "Jun", income: 90000, expenses: 48000, savings: 42000 },
      { month: "Jul", income: 85000, expenses: 61000, savings: 24000 },
      { month: "Aug", income: 95000, expenses: 55000, savings: 40000 },
      { month: "Sep", income: 85000, expenses: 68000, savings: 17000 },
      { month: "Oct", income: 100000, expenses: 53000, savings: 47000 }
    ],
    "1year": [
      { month: "Nov '23", income: 80000, expenses: 55000, savings: 25000 },
      { month: "Dec '23", income: 95000, expenses: 72000, savings: 23000 },
      { month: "Jan", income: 80000, expenses: 48000, savings: 32000 },
      { month: "Feb", income: 85000, expenses: 51000, savings: 34000 },
      { month: "Mar", income: 90000, expenses: 54000, savings: 36000 },
      { month: "Apr", income: 85000, expenses: 45000, savings: 40000 },
      { month: "May", income: 85000, expenses: 52000, savings: 33000 },
      { month: "Jun", income: 90000, expenses: 48000, savings: 42000 },
      { month: "Jul", income: 85000, expenses: 61000, savings: 24000 },
      { month: "Aug", income: 95000, expenses: 55000, savings: 40000 },
      { month: "Sep", income: 85000, expenses: 68000, savings: 17000 },
      { month: "Oct", income: 100000, expenses: 53000, savings: 47000 }
    ],
    "2years": [
      { month: "Q4 '22", income: 240000, expenses: 180000, savings: 60000 },
      { month: "Q1 '23", income: 255000, expenses: 165000, savings: 90000 },
      { month: "Q2 '23", income: 260000, expenses: 172000, savings: 88000 },
      { month: "Q3 '23", income: 265000, expenses: 195000, savings: 70000 },
      { month: "Q4 '23", income: 275000, expenses: 210000, savings: 65000 },
      { month: "Q1 '24", income: 255000, expenses: 153000, savings: 102000 },
      { month: "Q2 '24", income: 260000, expenses: 161000, savings: 99000 },
      { month: "Q3 '24", income: 265000, expenses: 184000, savings: 81000 }
    ]
  }

  const currentData = data[timeframe]
  const totalIncome = currentData.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = currentData.reduce(
    (sum, item) => sum + item.expenses,
    0
  )
  const totalSavings = currentData.reduce((sum, item) => sum + item.savings, 0)
  const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(1)

  const avgIncome = Math.round(totalIncome / currentData.length)
  const avgExpenses = Math.round(totalExpenses / currentData.length)
  const avgSavings = Math.round(totalSavings / currentData.length)

  const prevPeriodSavings = 28000 // Mock data for comparison
  const savingsChange = (
    ((avgSavings - prevPeriodSavings) / prevPeriodSavings) *
    100
  ).toFixed(1)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl bg-black/95 backdrop-blur-xl border border-white/20"
        >
          <p className="text-sm text-white/70 mb-3">
            {payload[0].payload.month}
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3BF7FF]" />
                <span className="text-xs text-white/60">Income</span>
              </div>
              <span className="text-sm text-white">
                ₹{payload[0].value.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF6B6B]" />
                <span className="text-xs text-white/60">Expenses</span>
              </div>
              <span className="text-sm text-white">
                ₹{payload[1].value.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E4C580]" />
                <span className="text-xs text-white/60">Savings</span>
              </div>
              <span className="text-sm text-white">
                ₹{payload[2].value.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </motion.div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10"
      style={{
        boxShadow: "0 8px 32px rgba(59, 247, 255, 0.1)"
      }}
    >
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-2xl mb-2">Cash Flow Analysis</h3>
          <p className="text-white/50">Income, expenses & savings breakdown</p>
        </div>
        <div className="flex gap-2">
          {["6months", "1year", "2years"].map(period => (
            <motion.button
              key={period}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                timeframe === period
                  ? "bg-[#7433FF]/20 text-[#7433FF] border border-[#7433FF]/30"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              {period === "6months" ? "6M" : period === "1year" ? "1Y" : "2Y"}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#3BF7FF]/10 to-transparent border border-[#3BF7FF]/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#3BF7FF]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#3BF7FF]" />
            </div>
            <p className="text-sm text-white/60">Avg Income</p>
          </div>
          <p className="text-2xl mb-1">₹{(avgIncome / 1000).toFixed(0)}k</p>
          <div className="flex items-center gap-1 text-xs text-[#3BF7FF]">
            <ArrowUpRight className="w-3 h-3" />
            <span>+8.5% vs last period</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-transparent border border-[#FF6B6B]/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B6B]/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-[#FF6B6B]" />
            </div>
            <p className="text-sm text-white/60">Avg Expenses</p>
          </div>
          <p className="text-2xl mb-1">₹{(avgExpenses / 1000).toFixed(0)}k</p>
          <div className="flex items-center gap-1 text-xs text-[#3BF7FF]">
            <ArrowDownRight className="w-3 h-3" />
            <span>-3.2% vs last period</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#E4C580]/10 to-transparent border border-[#E4C580]/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#E4C580]/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#E4C580]" />
            </div>
            <p className="text-sm text-white/60">Avg Savings</p>
          </div>
          <p className="text-2xl mb-1">₹{(avgSavings / 1000).toFixed(0)}k</p>
          <div className="flex items-center gap-1 text-xs text-[#3BF7FF]">
            <ArrowUpRight className="w-3 h-3" />
            <span>+{savingsChange}% vs last period</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#7433FF]/10 to-transparent border border-[#7433FF]/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#7433FF]/20 flex items-center justify-center">
              <div className="text-lg">{savingsRate}%</div>
            </div>
            <p className="text-sm text-white/60">Savings Rate</p>
          </div>
          <p className="text-2xl mb-1">{savingsRate}%</p>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${savingsRate}%` }}
              transition={{ duration: 1, delay: 0.7 }}
              className="h-full rounded-full bg-gradient-to-r from-[#7433FF] to-[#3BF7FF]"
            />
          </div>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="h-[400px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={currentData} barGap={8}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3BF7FF" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3BF7FF" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B6B" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#FF6B6B" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E4C580" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#E4C580" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
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
              tickFormatter={value => `₹${(value / 1000).toFixed(0)}k`}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
              formatter={value => (
                <span
                  style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}
                >
                  {value}
                </span>
              )}
            />
            <Bar
              dataKey="income"
              fill="url(#incomeGradient)"
              radius={[8, 8, 0, 0]}
              name="Income"
            />
            <Bar
              dataKey="expenses"
              fill="url(#expensesGradient)"
              radius={[8, 8, 0, 0]}
              name="Expenses"
            />
            <Bar
              dataKey="savings"
              fill="url(#savingsGradient)"
              radius={[8, 8, 0, 0]}
              name="Savings"
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="p-4 rounded-2xl bg-[#3BF7FF]/5 border border-[#3BF7FF]/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3BF7FF]/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-[#3BF7FF]" />
            </div>
            <div>
              <p className="text-sm mb-1">Peak Saving Month</p>
              <p className="text-xs text-white/60">
                October with ₹47,000 saved - Your best month this year!
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-[#E4C580]/5 border border-[#E4C580]/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E4C580]/20 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-4 h-4 text-[#E4C580]" />
            </div>
            <div>
              <p className="text-sm mb-1">Smart Insight</p>
              <p className="text-xs text-white/60">
                Your savings rate is 12% above the national average. Excellent
                work!
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
export default CashFlowAnalysis;