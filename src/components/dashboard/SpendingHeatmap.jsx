import { motion } from "framer-motion"
import { Calendar, TrendingUp, Flame } from "lucide-react"
import { useState } from "react"

const SpendingHeatmap = () => {
  const [selectedDay, setSelectedDay] = useState(null)

  // Generate 12 weeks of data
  const weeks = 12
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const heatmapData = Array.from({ length: weeks }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => {
      const spending = Math.floor(Math.random() * 15000) + 1000
      const date = new Date()
      date.setDate(
        date.getDate() - ((weeks - weekIndex - 1) * 7 + (6 - dayIndex))
      )
      return {
        week: weekIndex,
        day: dayIndex,
        spending,
        date: date.toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric"
        }),
        fullDate: date
      }
    })
  )

  const maxSpending = Math.max(...heatmapData.flat().map(d => d.spending))
  const avgSpending =
    heatmapData.flat().reduce((sum, d) => sum + d.spending, 0) / (weeks * 7)

  const getIntensityColor = spending => {
    const intensity = spending / maxSpending
    if (intensity > 0.8)
      return { bg: "#3BF7FF", opacity: 0.9, glow: "0 0 20px #3BF7FF" }
    if (intensity > 0.6)
      return { bg: "#7433FF", opacity: 0.7, glow: "0 0 15px #7433FF" }
    if (intensity > 0.4)
      return { bg: "#E4C580", opacity: 0.5, glow: "0 0 10px #E4C580" }
    if (intensity > 0.2) return { bg: "#7433FF", opacity: 0.3, glow: "none" }
    return { bg: "#FFFFFF", opacity: 0.1, glow: "none" }
  }

  const topSpendingDays = heatmapData
    .flat()
    .sort((a, b) => b.spending - a.spending)
    .slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden"
      style={{
        boxShadow: "0 8px 32px rgba(59, 247, 255, 0.1)"
      }}
    >
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-2xl mb-2">Spending Heatmap</h3>
          <p className="text-white/50">
            Daily spending intensity over 12 weeks
          </p>
        </div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Calendar className="w-6 h-6 text-[#3BF7FF]" />
        </motion.div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 rounded-2xl bg-gradient-to-br from-[#3BF7FF]/10 to-transparent border border-[#3BF7FF]/20"
        >
          <p className="text-sm text-white/50 mb-2">Avg Daily Spend</p>
          <p className="text-2xl">₹{(avgSpending / 1000).toFixed(1)}k</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-transparent border border-[#FF6B6B]/20"
        >
          <p className="text-sm text-white/50 mb-2">Peak Day</p>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#FF6B6B]" />
            <p className="text-2xl">₹{(maxSpending / 1000).toFixed(1)}k</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="p-4 rounded-2xl bg-gradient-to-br from-[#E4C580]/10 to-transparent border border-[#E4C580]/20"
        >
          <p className="text-sm text-white/50 mb-2">Total 12 Weeks</p>
          <p className="text-2xl">
            ₹{((avgSpending * weeks * 7) / 100000).toFixed(1)}L
          </p>
        </motion.div>
      </div>

      {/* Heatmap Grid */}
      <div className="mb-8">
        <div className="flex gap-2 mb-3">
          <div className="w-12" /> {/* Spacer for day labels */}
          {Array.from({ length: weeks }).map((_, i) => (
            <div key={i} className="flex-1 text-center text-xs text-white/30">
              {i % 2 === 0 ? `W${i + 1}` : ""}
            </div>
          ))}
        </div>

        {daysOfWeek.map((day, dayIndex) => (
          <div key={day} className="flex gap-2 mb-2">
            <div className="w-12 text-xs text-white/40 flex items-center">
              {day}
            </div>
            {heatmapData.map((week, weekIndex) => {
              const dayData = week[dayIndex]
              const colors = getIntensityColor(dayData.spending)
              const isSelected =
                selectedDay?.week === weekIndex && selectedDay?.day === dayIndex

              return (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.8 + (weekIndex * 7 + dayIndex) * 0.01
                  }}
                  whileHover={{ scale: 1.3, zIndex: 10 }}
                  onClick={() => setSelectedDay(dayData)}
                  className="flex-1 aspect-square rounded-lg cursor-pointer relative group"
                  style={{
                    backgroundColor: colors.bg,
                    opacity: colors.opacity,
                    boxShadow: isSelected
                      ? `0 0 20px ${colors.bg}`
                      : colors.glow,
                    border: isSelected ? `2px solid ${colors.bg}` : "none"
                  }}
                >
                  {/* Tooltip on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    whileHover={{ opacity: 1, y: -10, scale: 1 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 rounded-xl bg-black/95 backdrop-blur-xl border border-white/20 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20"
                  >
                    <p className="text-xs text-white/70 mb-1">{dayData.date}</p>
                    <p className="text-sm">
                      ₹{dayData.spending.toLocaleString("en-IN")}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">Less</span>
          {[0.1, 0.3, 0.5, 0.7, 0.9].map((intensity, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded"
              style={{
                backgroundColor: getIntensityColor(intensity * maxSpending).bg,
                opacity: getIntensityColor(intensity * maxSpending).opacity
              }}
            />
          ))}
          <span className="text-xs text-white/40">More</span>
        </div>
      </div>

      {/* Top Spending Days */}
      <div>
        <h4 className="text-sm text-white/50 mb-4">Top Spending Days</h4>
        <div className="space-y-3">
          {topSpendingDays.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/8 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B6B]/20 to-transparent border border-[#FF6B6B]/30 flex items-center justify-center">
                  <span className="text-[#FF6B6B]">#{index + 1}</span>
                </div>
                <div>
                  <p className="text-sm">
                    {day.fullDate.toLocaleDateString("en-IN", {
                      weekday: "long"
                    })}
                  </p>
                  <p className="text-xs text-white/40">{day.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg">
                  ₹{day.spending.toLocaleString("en-IN")}
                </p>
                <div className="flex items-center gap-1 text-xs text-[#FF6B6B]">
                  <TrendingUp className="w-3 h-3" />
                  <span>
                    {((day.spending / avgSpending - 1) * 100).toFixed(0)}% above
                    avg
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Insight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-[#7433FF]/10 to-[#3BF7FF]/10 border border-[#7433FF]/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm mb-2">Pattern Detected</p>
            <p className="text-xs text-white/60">
              You tend to spend 45% more on weekends. Consider setting weekend
              budgets to maintain consistency.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
export default SpendingHeatmap;