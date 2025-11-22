import { motion } from "framer-motion";

import { Zap, Plus, ChevronRight, DollarSign, PiggyBank, CreditCard, TrendingUp } from "lucide-react";

const AutomationsHub = () => {
  const automations = [
    {
      name: "Salary Auto-Allocator",
      description: "When salary arrives → Move 20% to savings → Pay bills → Invest ₹10k",
      active: true,
      nodes: [
        { icon: DollarSign, label: "Salary In", color: "#E4C580" },
        { icon: PiggyBank, label: "20% Save", color: "#3BF7FF" },
        { icon: CreditCard, label: "Pay Bills", color: "#7433FF" },
        { icon: TrendingUp, label: "Invest", color: "#E4C580" }
      ],
      triggers: 47,
      saved: 135000
    },
    {
      name: "Festival Savings",
      description: "Auto-save ₹5,000 weekly for upcoming Diwali",
      active: true,
      nodes: [
        { icon: DollarSign, label: "Weekly", color: "#7433FF" },
        { icon: PiggyBank, label: "₹5k Save", color: "#E4C580" }
      ],
      triggers: 12,
      saved: 60000
    },
    {
      name: "Smart Bill Pay",
      description: "Auto-pay utilities when balance > ₹50k",
      active: false,
      nodes: [
        { icon: DollarSign, label: "Check Balance", color: "#3BF7FF" },
        { icon: CreditCard, label: "Pay Bills", color: "#7433FF" }
      ],
      triggers: 0,
      saved: 0
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden"
      style={{ boxShadow: "0 8px 32px rgba(116, 51, 255, 0.08)" }}
    >
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl">Automations Hub</h3>
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <Zap className="w-5 h-5 text-[#E4C580]" />
            </motion.div>
          </div>
          <p className="text-white/50">Set it and forget it - Money on autopilot</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="space-y-4">
        {automations.map((automation, index) => (
          <motion.div
            key={automation.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className={`relative p-6 rounded-2xl border cursor-pointer overflow-hidden ${
              automation.active
                ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10"
                : "bg-white/5 border-white/5 opacity-60"
            }`}
          >
            {automation.active && (
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 50%, rgba(116, 51, 255, 0.1), transparent 50%)",
                    "radial-gradient(circle at 100% 50%, rgba(59, 247, 255, 0.1), transparent 50%)",
                    "radial-gradient(circle at 0% 50%, rgba(116, 51, 255, 0.1), transparent 50%)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            )}

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm">{automation.name}</h4>
                    {automation.active && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-[#3BF7FF]"
                        style={{ boxShadow: "0 0 10px #3BF7FF" }}
                      />
                    )}
                  </div>
                  <p className="text-xs text-white/40">{automation.description}</p>
                </div>

                <motion.div whileHover={{ x: 5 }} className="flex-shrink-0">
                  <ChevronRight className="w-5 h-5 text-white/30" />
                </motion.div>
              </div>

              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                {automation.nodes.map((node, nodeIndex) => {
                  const Icon = node.icon;
                  return (
                    <div key={nodeIndex} className="flex items-center gap-2 flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2 + index * 0.1 + nodeIndex * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="relative"
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center border-2"
                          style={{
                            backgroundColor: `${node.color}20`,
                            borderColor: `${node.color}60`,
                            boxShadow: automation.active ? `0 0 15px ${node.color}30` : "none"
                          }}
                        >
                          <Icon className="w-4 h-4" style={{ color: node.color }} />
                        </div>

                        {automation.active && nodeIndex < automation.nodes.length - 1 && (
                          <motion.div
                            className="absolute top-1/2 left-full w-1 h-1 rounded-full"
                            style={{ backgroundColor: node.color }}
                            animate={{ x: [0, 20], opacity: [1, 0] }}
                            transition={{ duration: 1.5, delay: nodeIndex * 0.3, repeat: Infinity, repeatDelay: 2 }}
                          />
                        )}
                      </motion.div>

                      {nodeIndex < automation.nodes.length - 1 && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 1.3 + index * 0.1 + nodeIndex * 0.1 }}
                          className="h-px w-6 bg-gradient-to-r from-white/20 to-white/10 origin-left"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {automation.active && (
                <div className="flex items-center gap-6 text-xs">
                  <div>
                    <p className="text-white/40 mb-1">Triggered</p>
                    <p className="text-white/80">{automation.triggers}x</p>
                  </div>
                  <div>
                    <p className="text-white/40 mb-1">Total Saved</p>
                    <p className="text-[#3BF7FF]">₹{(automation.saved / 1000).toFixed(0)}k</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-[#7433FF]/10 via-[#3BF7FF]/10 to-[#E4C580]/10 border border-white/10"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/50 mb-1">Total Automated Savings</p>
            <motion.p
              className="text-3xl bg-gradient-to-r from-[#3BF7FF] to-[#E4C580] bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
            >
              ₹1,95,000
            </motion.p>
          </div>

          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center"
            style={{ boxShadow: "0 0 40px rgba(116, 51, 255, 0.4)" }}
          >
            <Zap className="w-8 h-8" />
          </motion.div>
        </div>

        <p className="text-xs text-white/40 mt-3">Your automations saved you ₹12,000 this week without any manual effort</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E4C580]/20 to-transparent flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#E4C580]" />
          </div>
          <div className="flex-1">
            <p className="text-xs">
              <span className="text-[#E4C580]">Pro Tip:</span> Create custom automation flows with conditions and multiple actions
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
export default AutomationsHub;