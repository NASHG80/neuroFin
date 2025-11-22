import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownLeft, Zap } from "lucide-react"
import { useState } from "react"

const TransactionFlow = () => {
  const [filter, setFilter] = useState("all")

  const transactions = [
    {
      id: 1,
      type: "income",
      from: "TCS Salary",
      to: "HDFC Account",
      amount: 100000,
      time: "2h ago",
      category: "Salary",
      status: "completed"
    },
    {
      id: 2,
      type: "expense",
      from: "HDFC Account",
      to: "Amazon",
      amount: 3200,
      time: "4h ago",
      category: "Shopping",
      status: "completed"
    },
    {
      id: 3,
      type: "expense",
      from: "HDFC Account",
      to: "Swiggy",
      amount: 850,
      time: "6h ago",
      category: "Food",
      status: "completed"
    },
    {
      id: 4,
      type: "income",
      from: "Freelance",
      to: "Paytm",
      amount: 15000,
      time: "1d ago",
      category: "Freelance",
      status: "completed"
    },
    {
      id: 5,
      type: "expense",
      from: "HDFC Account",
      to: "Uber",
      amount: 420,
      time: "1d ago",
      category: "Transport",
      status: "completed"
    },
    {
      id: 6,
      type: "expense",
      from: "Credit Card",
      to: "Netflix",
      amount: 649,
      time: "2d ago",
      category: "Entertainment",
      status: "pending"
    },
    {
      id: 7,
      type: "income",
      from: "Dividend",
      to: "Zerodha",
      amount: 8500,
      time: "2d ago",
      category: "Investment",
      status: "completed"
    },
    {
      id: 8,
      type: "expense",
      from: "HDFC Account",
      to: "Electricity Bill",
      amount: 2100,
      time: "3d ago",
      category: "Bills",
      status: "completed"
    }
  ]

  const filteredTransactions = transactions.filter(
    t => filter === "all" || t.type === filter
  )

  const getCategoryColor = category => {
    const colors = {
      Salary: "#3BF7FF",
      Shopping: "#7433FF",
      Food: "#E4C580",
      Freelance: "#3BF7FF",
      Transport: "#FF6B6B",
      Entertainment: "#A78BFA",
      Investment: "#E4C580",
      Bills: "#7433FF"
    }
    return colors[category] || "#FFFFFF"
  }

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10"
      style={{
        boxShadow: "0 8px 32px rgba(116, 51, 255, 0.1)"
      }}
    >
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-2xl mb-2">Transaction Flow</h3>
          <p className="text-white/50">
            Real-time money movement visualization
          </p>
        </div>
        <div className="flex gap-2">
          {["all", "income", "expense"].map(f => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm transition-all capitalize ${
                filter === f
                  ? "bg-[#7433FF]/20 text-[#7433FF] border border-[#7433FF]/30"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-[#3BF7FF]/10 to-transparent border border-[#3BF7FF]/20 relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#3BF7FF]/10 blur-2xl"
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <ArrowDownLeft className="w-5 h-5 text-[#3BF7FF]" />
              <p className="text-sm text-white/60">Total Income</p>
            </div>
            <p className="text-3xl mb-2">₹{(totalIncome / 1000).toFixed(0)}k</p>
            <p className="text-xs text-[#3BF7FF]">
              {transactions.filter(t => t.type === "income").length}{" "}
              transactions
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-transparent border border-[#FF6B6B]/20 relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#FF6B6B]/10 blur-2xl"
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <ArrowUpRight className="w-5 h-5 text-[#FF6B6B]" />
              <p className="text-sm text-white/60">Total Expense</p>
            </div>
            <p className="text-3xl mb-2">
              ₹{(totalExpense / 1000).toFixed(0)}k
            </p>
            <p className="text-xs text-[#FF6B6B]">
              {transactions.filter(t => t.type === "expense").length}{" "}
              transactions
            </p>
          </div>
        </motion.div>
      </div>

      {/* Transaction List with Flow Animation */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
        {filteredTransactions.map((transaction, index) => {
          const color = getCategoryColor(transaction.category)
          const isIncome = transaction.type === "income"

          return (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: isIncome ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="relative p-5 rounded-2xl bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/10 transition-all cursor-pointer group overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, ${color}10, transparent)`
                }}
              />

              {/* Flow Animation */}
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full"
                style={{ backgroundColor: color }}
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ delay: 0.9 + index * 0.05, duration: 0.3 }}
              />

              <div className="relative flex items-center gap-4">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                    boxShadow: `0 0 20px ${color}20`
                  }}
                >
                  {isIncome ? (
                    <ArrowDownLeft className="w-6 h-6" style={{ color }} />
                  ) : (
                    <ArrowUpRight className="w-6 h-6" style={{ color }} />
                  )}
                </motion.div>

                {/* Transaction Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-sm truncate">
                      {isIncome ? transaction.from : transaction.to}
                    </p>
                    <div
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{
                        backgroundColor: `${color}20`,
                        color: color
                      }}
                    >
                      {transaction.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span>{transaction.from}</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                    <span>{transaction.to}</span>
                  </div>
                </div>

                {/* Amount and Time */}
                <div className="text-right">
                  <p
                    className={`text-lg mb-1 ${
                      isIncome ? "text-[#3BF7FF]" : "text-white"
                    }`}
                  >
                    {isIncome ? "+" : "-"}₹
                    {transaction.amount.toLocaleString("en-IN")}
                  </p>
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-xs text-white/40">
                      {transaction.time}
                    </span>
                    {transaction.status === "pending" && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <Zap className="w-3 h-3 text-[#E4C580]" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Particle Effect for Large Transactions */}
              {transaction.amount > 10000 && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{
                        left: "50%",
                        top: "50%",
                        opacity: 1
                      }}
                      animate={{
                        x: [0, (Math.random() - 0.5) * 100],
                        y: [0, (Math.random() - 0.5) * 100],
                        opacity: [1, 0],
                        scale: [1, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: 1 + index * 0.05 + i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Net Flow Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-[#3BF7FF]/10 to-[#E4C580]/10 border border-[#3BF7FF]/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/50 mb-1">Net Cash Flow</p>
            <p className="text-3xl text-[#3BF7FF]">
              +₹{((totalIncome - totalExpense) / 1000).toFixed(0)}k
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/50 mb-1">Flow Rate</p>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((totalIncome - totalExpense) / totalIncome) *
                      100}%`
                  }}
                  transition={{ duration: 1, delay: 1.6 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#3BF7FF] to-[#E4C580]"
                />
              </div>
              <span className="text-sm text-[#3BF7FF]">
                {(((totalIncome - totalExpense) / totalIncome) * 100).toFixed(
                  0
                )}
                %
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
export default TransactionFlow;