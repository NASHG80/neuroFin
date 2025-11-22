import { motion } from "framer-motion"
import {
  Calendar,
  Sparkles,
  TrendingUp,
  Gift,
  Users,
  Home as HomeIcon
} from "lucide-react"
import { useState } from "react"

const FestivePlanner = () => {
  const [selectedFestival, setSelectedFestival] = useState(0)

  const festivals = [
    {
      name: "Diwali 2025",
      date: "Oct 20, 2025",
      daysLeft: 334,
      estimatedSpend: 85000,
      lastYearSpend: 72000,
      categories: [
        { name: "Gifts", amount: 35000, icon: Gift },
        { name: "Celebrations", amount: 25000, icon: Users },
        { name: "Decorations", amount: 15000, icon: HomeIcon },
        { name: "Shopping", amount: 10000, icon: Sparkles }
      ],
      color: "#E4C580",
      emoji: "🪔"
    },
    {
      name: "Holi 2025",
      date: "Mar 14, 2025",
      daysLeft: 113,
      estimatedSpend: 25000,
      lastYearSpend: 22000,
      categories: [
        { name: "Colors & Supplies", amount: 8000, icon: Sparkles },
        { name: "Food & Drinks", amount: 10000, icon: Gift },
        { name: "Gatherings", amount: 7000, icon: Users }
      ],
      color: "#7433FF",
      emoji: "🎨"
    },
    {
      name: "New Year 2026",
      date: "Jan 1, 2026",
      daysLeft: 407,
      estimatedSpend: 50000,
      lastYearSpend: 45000,
      categories: [
        { name: "Travel", amount: 30000, icon: TrendingUp },
        { name: "Parties", amount: 15000, icon: Users },
        { name: "Gifts", amount: 5000, icon: Gift }
      ],
      color: "#3BF7FF",
      emoji: "🎉"
    }
  ]

  const festival = festivals[selectedFestival]
  const savingsProgress = 45 // 45% of target saved

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden"
      style={{
        boxShadow: "0 8px 32px rgba(228, 197, 128, 0.08)"
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl mb-2">Festive Planner</h3>
          <p className="text-white/50">
            Smart budgeting for celebrations ahead
          </p>
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Calendar className="w-6 h-6 text-[#E4C580]" />
        </motion.div>
      </div>

      {/* Festival Selector */}
      <div className="flex gap-3 mb-6">
        {festivals.map((fest, index) => (
          <motion.button
            key={fest.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedFestival(index)}
            className={`flex-1 p-4 rounded-2xl transition-all ${
              selectedFestival === index
                ? "bg-white/10 border-white/20"
                : "bg-white/5 border-white/5 hover:bg-white/8"
            } border`}
            style={{
              boxShadow:
                selectedFestival === index ? `0 0 30px ${fest.color}30` : "none"
            }}
          >
            <div className="text-2xl mb-1">{fest.emoji}</div>
            <p className="text-sm">{fest.name.split(" ")[0]}</p>
          </motion.button>
        ))}
      </div>

      {/* Festival Details */}
      <motion.div
        key={selectedFestival}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
        style={{
          background: `linear-gradient(135deg, ${festival.color}15, transparent)`
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-2xl mb-1">{festival.name}</p>
            <p className="text-white/50">{festival.date}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/50 mb-1">Days Left</p>
            <motion.p
              key={festival.daysLeft}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl"
              style={{ color: festival.color }}
            >
              {festival.daysLeft}
            </motion.p>
          </div>
        </div>

        {/* Estimated Spend */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-xl bg-black/20">
            <p className="text-sm text-white/50 mb-1">Estimated Spend</p>
            <p className="text-2xl">
              ₹{festival.estimatedSpend.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-black/20">
            <p className="text-sm text-white/50 mb-1">Last Year</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl">
                ₹{festival.lastYearSpend.toLocaleString("en-IN")}
              </p>
              <TrendingUp className="w-4 h-4 text-[#3BF7FF]" />
            </div>
          </div>
        </div>

        {/* Savings Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-white/70">Savings Progress</p>
            <p className="text-sm" style={{ color: festival.color }}>
              {savingsProgress}%
            </p>
          </div>
          <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${savingsProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full relative"
              style={{
                background: `linear-gradient(90deg, ${festival.color}, ${festival.color}CC)`,
                boxShadow: `0 0 20px ${festival.color}`
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{ transform: "skewX(-20deg)" }}
              />
            </motion.div>
          </div>
          <p className="text-xs text-white/40 mt-2">
            ₹
            {Math.round(
              (festival.estimatedSpend * savingsProgress) / 100
            ).toLocaleString("en-IN")}{" "}
            saved of ₹{festival.estimatedSpend.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-3">
          <p className="text-sm text-white/50">Planned Categories</p>
          {festival.categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl bg-black/20 hover:bg-black/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${festival.color}20` }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: festival.color }}
                    />
                  </div>
                  <p className="text-sm">{category.name}</p>
                </div>
                <p className="text-sm">
                  ₹{category.amount.toLocaleString("en-IN")}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 rounded-xl bg-gradient-to-r from-[#7433FF]/20 to-[#3BF7FF]/20 border border-[#7433FF]/30 hover:border-[#7433FF]/50 transition-all"
        >
          <p className="text-sm">Adjust Budget</p>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 rounded-xl bg-gradient-to-r from-[#E4C580]/20 to-[#E4C580]/10 border border-[#E4C580]/30 hover:border-[#E4C580]/50 transition-all"
        >
          <p className="text-sm">Save More</p>
        </motion.button>
      </div>

      {/* Fireworks Animation */}
      <motion.div
        className="absolute top-8 right-8 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: festival.color }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: [0, Math.cos((i * 60 * Math.PI) / 180) * 30],
              y: [0, Math.sin((i * 60 * Math.PI) / 180) * 30],
              opacity: [1, 0]
            }}
            transition={{
              duration: 1,
              delay: i * 0.1,
              repeat: Infinity,
              repeatDelay: 5
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
export default FestivePlanner;