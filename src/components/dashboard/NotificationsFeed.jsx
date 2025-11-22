import { motion } from "framer-motion"
import {
  Bell,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Sparkles,
  DollarSign
} from "lucide-react"

const NotificationsFeed = () => {
  const notifications = [
    {
      type: "success",
      icon: CheckCircle,
      title: "Goal Achieved!",
      message: "Your Europe Trip fund reached 75%",
      time: "2m ago",
      color: "#3BF7FF",
      priority: "high"
    },
    {
      type: "insight",
      icon: Sparkles,
      title: "AI Insight",
      message: "You can save ₹8,000 extra by reducing dining expenses",
      time: "1h ago",
      color: "#E4C580",
      priority: "medium"
    },
    {
      type: "alert",
      icon: AlertCircle,
      title: "Budget Alert",
      message: "Shopping budget 85% used this month",
      time: "3h ago",
      color: "#FF6B6B",
      priority: "high"
    },
    {
      type: "income",
      icon: DollarSign,
      title: "Salary Credited",
      message: "₹95,000 deposited to HDFC Account",
      time: "1d ago",
      color: "#3BF7FF",
      priority: "normal"
    },
    {
      type: "trend",
      icon: TrendingUp,
      title: "Investment Update",
      message: "Portfolio up by 12.5% this quarter",
      time: "2d ago",
      color: "#E4C580",
      priority: "normal"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10"
      style={{
        boxShadow: "0 8px 32px rgba(59, 247, 255, 0.08)"
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl mb-1">Activity</h3>
          <p className="text-xs text-white/50">Your money updates</p>
        </div>
        <motion.div
          animate={{ rotate: [0, -15, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Bell className="w-5 h-5 text-[#3BF7FF]" />
        </motion.div>
      </div>

      {/* AI Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1 }}
        className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#7433FF]/15 to-[#3BF7FF]/15 border border-[#7433FF]/30 overflow-hidden relative"
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(90deg, rgba(116, 51, 255, 0.15) 0%, rgba(59, 247, 255, 0.15) 100%)",
              "linear-gradient(90deg, rgba(59, 247, 255, 0.15) 0%, rgba(116, 51, 255, 0.15) 100%)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <div className="relative z-10 flex items-start gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center flex-shrink-0"
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <div>
            <p className="text-xs text-[#3BF7FF] mb-1">
              Your Week in 8 Seconds
            </p>
            <p className="text-sm text-white/80">
              Spent ₹12k less than usual. Saved ₹45k. Investment portfolio
              +₹18k. On track for all goals. 🎯
            </p>
          </div>
        </div>
      </motion.div>

      {/* Notifications List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {notifications.map((notification, index) => {
          const Icon = notification.icon

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="relative p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all cursor-pointer group"
            >
              {/* Priority Indicator */}
              {notification.priority === "high" && (
                <motion.div
                  className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                  style={{ backgroundColor: notification.color }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Glow on Hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${notification.color}15, transparent 70%)`
                }}
              />

              <div className="relative z-10 flex items-start gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${notification.color}20`,
                    boxShadow: `0 0 20px ${notification.color}20`
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: notification.color }}
                  />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm">{notification.title}</p>
                    <span className="text-xs text-white/30 flex-shrink-0">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 line-clamp-2">
                    {notification.message}
                  </p>
                </div>
              </div>

              {/* Unread Dot */}
              {index < 2 && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-4 right-4 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: notification.color,
                    boxShadow: `0 0 8px ${notification.color}`
                  }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* View All Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all text-sm text-white/70"
      >
        View All Activity
      </motion.button>
    </motion.div>
  )
}
export default NotificationsFeed;