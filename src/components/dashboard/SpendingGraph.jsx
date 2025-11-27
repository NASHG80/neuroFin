import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { AlertCircle, Coffee, ShoppingBag, Home, Car } from "lucide-react"

const iconMap = {
  "Food & Drink": Coffee,
  Shopping: ShoppingBag,
  Housing: Home,
  Transport: Car,
  Groceries: ShoppingBag,
  Entertainment: AlertCircle
}

const SpendingGraph = () => {
  const [loading, setLoading] = useState(true)
  const [analysis, setAnalysis] = useState(null)
  const [graphData, setGraphData] = useState([])
  const [categories, setCategories] = useState([])
  const [aiInsight, setAiInsight] = useState("")

  // -------------------------------
  // FETCH DATA FROM AGENTIC AI
  // -------------------------------
  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await fetch("http://localhost:7001/agent/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: "111",
            message: "Give me my weekly spending analysis"
          })
        })

        const data = await res.json()

        const analyst = data.results?.analyst

        if (!analyst) {
          setLoading(false)
          return
        }

        // -------------------------------
        // Build graph data from weekly totals
        // -------------------------------
        const weekly = analyst.weekly // { "2025-01": value, ... }

        const formattedWeeks = Object.entries(weekly).map(
          ([week, value]) => ({
            month: week,   // e.g. "2025-01"
            spending: Math.abs(value),
            income: 0
          })
        )

        setGraphData(formattedWeeks)

        // -------------------------------
        // Convert categories
        // -------------------------------
        const formattedCats = Object.entries(analyst.categories).map(
          ([cat, amount]) => ({
            name: cat,
            amount: Math.abs(amount),
            percentage: Math.round((Math.abs(amount) / Math.abs(analyst.total_spent)) * 100),
            color: "#7433FF",
            icon: iconMap[cat] || ShoppingBag
          })
        )

        setCategories(formattedCats)

        // -------------------------------
        // AI insight
        // -------------------------------
        setAiInsight(data.answer)

        setAnalysis(analyst)
      } catch (err) {
        console.error(err)
      }

      setLoading(false)
    }

    fetchAnalysis()
  }, [])

  // -----------------------------
  // Tooltip Component
  // -----------------------------
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/20"
        >
          <p className="text-sm text-white/50 mb-2">{payload[0].payload.month}</p>
          <p className="text-[#3BF7FF] mb-1">
            Spending: ₹{payload[0].value.toLocaleString("en-IN")}
          </p>
        </motion.div>
      )
    }
    return null
  }

  if (loading)
    return (
      <div className="text-center text-white/40 p-10">Loading AI Insights...</div>
    )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10"
    >
      {/* Title */}
      <h3 className="text-xl mb-4">Intelligent Spending (AI Powered)</h3>

      {/* AI Insight */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#3BF7FF]/10 to-transparent border border-[#3BF7FF]/20 flex gap-3"
      >
        <AlertCircle className="w-5 h-5 text-[#3BF7FF]" />
        <p className="text-sm text-white/80">
          <span className="text-[#3BF7FF]">AI Insight:</span> {aiInsight}
        </p>
      </motion.div>

      {/* Graph */}
      <div className="h-[300px] mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={graphData}>
            <defs>
              <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3BF7FF" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3BF7FF" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />

            <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" />
            <YAxis
              stroke="rgba(255,255,255,0.3)"
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="spending"
              stroke="#3BF7FF"
              strokeWidth={3}
              fill="url(#spendingGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Categories */}
      <h4 className="text-sm text-white/50 mb-4">Top Categories</h4>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((c, i) => {
          const Icon = c.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
              className="p-4 rounded-2xl bg-white/5 border border-white/5"
            >
              <div className="flex gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10">
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <div>
                  <p className="text-sm">{c.name}</p>
                  <p className="text-lg">₹{c.amount.toLocaleString("en-IN")}</p>
                </div>
              </div>

              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.percentage}%` }}
                  className="h-full bg-[#7433FF]"
                />
              </div>

              <p className="text-xs text-white/40 mt-2">{c.percentage}% of total</p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default SpendingGraph
