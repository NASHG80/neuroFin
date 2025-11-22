import { motion } from "framer-motion"
import {
  Sparkles,
  Heart,
  Home,
  Car,
  GraduationCap,
  Palmtree
} from "lucide-react"

const FuturePlanning = () => {
  const events = [
    {
      name: "Marriage",
      year: 2026,
      estimatedCost: 2500000,
      probability: 85,
      icon: Heart,
      color: "#E4C580",
      status: "high-priority"
    },
    {
      name: "Dream Home",
      year: 2028,
      estimatedCost: 8500000,
      probability: 70,
      icon: Home,
      color: "#7433FF",
      status: "planned"
    },
    {
      name: "New Car",
      year: 2027,
      estimatedCost: 1200000,
      probability: 75,
      icon: Car,
      color: "#3BF7FF",
      status: "planned"
    },
    {
      name: "Child's Education",
      year: 2035,
      estimatedCost: 5000000,
      probability: 60,
      icon: GraduationCap,
      color: "#E4C580",
      status: "future"
    },
    {
      name: "Retirement",
      year: 2050,
      estimatedCost: 50000000,
      probability: 90,
      icon: Palmtree,
      color: "#3BF7FF",
      status: "future"
    }
  ]

  const currentYear = 2024

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden"
      style={{
        boxShadow: "0 8px 32px rgba(59, 247, 255, 0.08)"
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl mb-1">Future Planning</h3>
          <p className="text-xs text-white/50">AI-powered life timeline</p>
        </div>
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-5 h-5 text-[#3BF7FF]" />
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#7433FF] via-[#3BF7FF] to-[#E4C580] opacity-30" />

        {/* Events */}
        <div className="space-y-6">
          {events.map((event, index) => {
            const Icon = event.icon
            const yearsAway = event.year - currentYear

            return (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.15 }}
                className="relative flex gap-4"
              >
                {/* Timeline Node */}
                <motion.div
                  className="relative z-10 flex-shrink-0"
                  whileHover={{ scale: 1.2 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                    style={{
                      backgroundColor: `${event.color}20`,
                      borderColor: event.color,
                      boxShadow: `0 0 20px ${event.color}40`
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${event.color}40`,
                        `0 0 30px ${event.color}60`,
                        `0 0 20px ${event.color}40`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Icon className="w-5 h-5" style={{ color: event.color }} />
                  </motion.div>

                  {/* Particle Animation */}
                  {index < 2 && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full"
                          style={{ backgroundColor: event.color }}
                          animate={{
                            x: [0, Math.random() * 20 - 10],
                            y: [0, Math.random() * 20 - 10],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.6,
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>

                {/* Event Card */}
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex-1 p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${event.color}10, transparent)`
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm mb-1">{event.name}</p>
                      <p className="text-xs text-white/40">
                        {event.year} • {yearsAway} years away
                      </p>
                    </div>
                    <div
                      className="px-2 py-1 rounded-lg text-xs"
                      style={{
                        backgroundColor: `${event.color}20`,
                        color: event.color
                      }}
                    >
                      {event.probability}% likely
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/40 mb-1">
                        Estimated Cost
                      </p>
                      <p className="text-sm" style={{ color: event.color }}>
                        ₹{(event.estimatedCost / 100000).toFixed(1)}L
                      </p>
                    </div>

                    {/* Mini Progress Indicator */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scaleY: 0 }}
                          animate={{
                            scaleY: i < event.probability / 20 ? 1 : 0.3
                          }}
                          transition={{ delay: 1 + index * 0.15 + i * 0.1 }}
                          className="w-1 h-6 rounded-full origin-bottom"
                          style={{
                            backgroundColor:
                              i < event.probability / 20
                                ? event.color
                                : "#ffffff20"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* AI Insight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#7433FF]/10 to-[#3BF7FF]/10 border border-[#7433FF]/20"
      >
        <div className="flex items-start gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center flex-shrink-0"
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <div className="flex-1">
            <p className="text-xs text-[#3BF7FF] mb-1">AI Recommendation</p>
            <p className="text-xs text-white/70">
              Start saving ₹45,000/month now to comfortably achieve your
              marriage goal by 2026. Auto-invest enabled.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 p-3 rounded-xl bg-gradient-to-r from-[#7433FF]/20 to-[#3BF7FF]/20 border border-[#7433FF]/30 hover:border-[#7433FF]/50 transition-all text-sm"
      >
        Adjust Timeline
      </motion.button>
    </motion.div>
  )
}
export default FuturePlanning;