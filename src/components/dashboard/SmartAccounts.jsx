import { motion } from "framer-motion"
import {
  Building2,
  CreditCard,
  Wallet,
  TrendingUp,
  Eye,
  EyeOff
} from "lucide-react"
import { useState } from "react"

const SmartAccounts = ({ netWorth }) => {
  const [balancesVisible, setBalancesVisible] = useState(true)

  // We use the prop netWorth for total, but keep mock accounts for individual rows for now
  // Ideally these would also be passed via props
  const accounts = [
    {
      name: "HDFC Savings",
      type: "Bank Account",
      balance: netWorth ? netWorth * 0.6 : 2847650, // Mock distribution
      change: 12500,
      icon: Building2,
      color: "#3BF7FF",
      gradient: "from-[#3BF7FF]/20 to-[#3BF7FF]/5"
    },
    {
      name: "ICICI Credit Card",
      type: "Credit",
      balance: -45200,
      change: -8300,
      icon: CreditCard,
      color: "#7433FF",
      gradient: "from-[#7433FF]/20 to-[#7433FF]/5"
    },
    {
      name: "Paytm Wallet",
      type: "Digital Wallet",
      balance: 12450,
      change: 2100,
      icon: Wallet,
      color: "#E4C580",
      gradient: "from-[#E4C580]/20 to-[#E4C580]/5"
    },
    {
      name: "Zerodha",
      type: "Investment",
      balance: netWorth ? netWorth * 0.4 : 1850000, // Mock distribution
      change: 45000,
      icon: TrendingUp,
      color: "#3BF7FF",
      gradient: "from-[#3BF7FF]/20 to-[#3BF7FF]/5"
    }
  ]

  const formatCurrency = amount => {
    if (!balancesVisible) return "••••••"
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(Math.abs(amount))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10"
      style={{
        boxShadow: "0 8px 32px rgba(59, 247, 255, 0.08)"
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl">Smart Accounts</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setBalancesVisible(!balancesVisible)}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          {balancesVisible ? (
            <Eye className="w-4 h-4 text-white/70" />
          ) : (
            <EyeOff className="w-4 h-4 text-white/70" />
          )}
        </motion.button>
      </div>

      <div className="space-y-3">
        {accounts.map((account, index) => {
          const Icon = account.icon
          const isPositiveChange = account.change > 0

          return (
            <motion.div
              key={account.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className={`relative p-4 rounded-2xl bg-gradient-to-br ${account.gradient} border border-white/5 cursor-pointer group overflow-hidden`}
            >
              {/* Shimmer Effect on Balance Increase */}
              {isPositiveChange && (
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "200%", opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    delay: index * 0.2,
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E4C580]/30 to-transparent"
                  style={{ transform: "skewX(-20deg)" }}
                />
              )}

              <div className="relative z-10 flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center"
                  style={{
                    boxShadow: `0 0 20px ${account.color}30`
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: account.color }} />
                </motion.div>

                <div className="flex-1">
                  <p className="text-sm text-white/50">{account.type}</p>
                  <p className="mt-0.5">{account.name}</p>
                </div>

                <div className="text-right">
                  <motion.p
                    key={balancesVisible ? "visible" : "hidden"}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="tracking-tight"
                  >
                    {account.balance < 0 && "-"}
                    {formatCurrency(account.balance)}
                  </motion.p>
                  <p
                    className={`text-sm mt-0.5 ${
                      isPositiveChange ? "text-[#3BF7FF]" : "text-[#FF6B6B]"
                    }`}
                  >
                    {isPositiveChange ? "+" : ""}
                    {balancesVisible ? formatCurrency(account.change) : "•••"}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Total Net Worth */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 pt-6 border-t border-white/10"
      >
        <div className="flex items-center justify-between">
          <p className="text-white/50">Total Net Worth</p>
          <div className="text-right">
            <motion.p
              className="text-2xl tracking-tight bg-gradient-to-r from-[#3BF7FF] to-[#E4C580] bg-clip-text text-transparent"
              key={balancesVisible ? "visible" : "hidden"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {formatCurrency(netWorth || 4664900)}
            </motion.p>
            <p className="text-sm text-[#3BF7FF] mt-1">+₹51,300 this month</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
export default SmartAccounts;