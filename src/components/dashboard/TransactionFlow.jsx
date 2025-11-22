import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ArrowDownLeft, Zap, Plus, X } from "lucide-react"
import { useState } from "react"

const TransactionFlow = ({ transactions = [], onAddTransaction }) => {
  const [filter, setFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({ type: 'expense', amount: '', category: 'Food', description: '' });

  // Use internal mock data if no props passed (for standalone testing)
  const displayTransactions = transactions.length > 0 ? transactions : [
    { id: 1, type: "income", from: "TCS Salary", to: "HDFC Account", amount: 100000, time: "2h ago", category: "Salary", status: "completed" },
    { id: 2, type: "expense", from: "HDFC Account", to: "Amazon", amount: 3200, time: "4h ago", category: "Shopping", status: "completed" }
  ];

  const filteredTransactions = displayTransactions.filter(
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

  const totalIncome = displayTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0)
  const totalExpense = displayTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onAddTransaction) return;
    
    onAddTransaction({
        id: Date.now(),
        type: newTx.type,
        from: newTx.type === 'income' ? 'Manual Entry' : 'HDFC Account',
        to: newTx.type === 'income' ? 'HDFC Account' : newTx.description,
        amount: Number(newTx.amount),
        time: 'Just now',
        category: newTx.category,
        status: 'completed'
    });
    setIsModalOpen(false);
    setNewTx({ type: 'expense', amount: '', category: 'Food', description: '' });
  };

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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-[#3BF7FF]/20 text-[#3BF7FF] border border-[#3BF7FF]/30 flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AnimatePresence>
        {isModalOpen && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                    className="bg-[#0A0A10] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl">Add Transaction</h3>
                        <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/5 rounded-full"><X className="w-5 h-5"/></button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                            {['expense', 'income'].map(t => (
                                <button
                                    key={t} type="button"
                                    onClick={() => setNewTx({...newTx, type: t})}
                                    className={`flex-1 py-2 rounded-lg capitalize text-sm transition-all ${newTx.type === t ? (t === 'income' ? 'bg-[#3BF7FF]/20 text-[#3BF7FF]' : 'bg-[#FF6B6B]/20 text-[#FF6B6B]') : 'text-white/50'}`}
                                >{t}</button>
                            ))}
                        </div>
                        <input 
                            type="text" placeholder="Description (e.g. Uber, Salary)" required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7433FF]/50"
                            value={newTx.description} onChange={e => setNewTx({...newTx, description: e.target.value})}
                        />
                        <input 
                            type="number" placeholder="Amount" required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7433FF]/50"
                            value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})}
                        />
                        <select 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7433FF]/50 appearance-none"
                            value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})}
                        >
                            {['Food', 'Transport', 'Shopping', 'Salary', 'Freelance', 'Bills', 'Entertainment'].map(c => (
                                <option key={c} value={c} className="bg-black">{c}</option>
                            ))}
                        </select>
                        <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7433FF] to-[#3BF7FF] font-medium mt-2">
                            Add Transaction
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-[#3BF7FF]/10 to-transparent border border-[#3BF7FF]/20 relative overflow-hidden"
        >
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <ArrowDownLeft className="w-5 h-5 text-[#3BF7FF]" />
              <p className="text-sm text-white/60">Total Income</p>
            </div>
            <p className="text-3xl mb-2">₹{(totalIncome / 1000).toFixed(0)}k</p>
            <p className="text-xs text-[#3BF7FF]">
              {displayTransactions.filter(t => t.type === "income").length}{" "}
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
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <ArrowUpRight className="w-5 h-5 text-[#FF6B6B]" />
              <p className="text-sm text-white/60">Total Expense</p>
            </div>
            <p className="text-3xl mb-2">
              ₹{(totalExpense / 1000).toFixed(0)}k
            </p>
            <p className="text-xs text-[#FF6B6B]">
              {displayTransactions.filter(t => t.type === "expense").length}{" "}
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
                    {Number(transaction.amount).toLocaleString("en-IN")}
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
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
export default TransactionFlow;