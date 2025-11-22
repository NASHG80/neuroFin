import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  Heart,
  TrendingUp,
  Gift,
  Home,
  GraduationCap,
  Shield,
  ArrowRightLeft,
  Plus,
  ChevronRight,
  Crown,
  Star
} from "lucide-react"
import { useState } from "react"

const FamilyFinance = () => {
  const [selectedMember, setSelectedMember] = useState("priya")
  const [view, setView] = useState("overview")

  const familyMembers = [
    {
      id: "priya",
      name: "Priya Sharma",
      role: "You",
      avatar: "P",
      color: "#3BF7FF",
      contribution: 100000,
      expenses: 53000,
      savings: 47000,
      status: "primary",
      age: 28,
      goals: ["Wedding", "House", "Car"]
    },
    {
      id: "rahul",
      name: "Rahul Sharma",
      role: "Spouse",
      avatar: "R",
      color: "#7433FF",
      contribution: 95000,
      expenses: 45000,
      savings: 50000,
      status: "contributor",
      age: 30,
      goals: ["House", "Investment", "Vacation"]
    },
    {
      id: "anita",
      name: "Anita Sharma",
      role: "Mother",
      avatar: "A",
      color: "#E4C580",
      contribution: 0,
      expenses: 18000,
      savings: 0,
      status: "dependent",
      age: 58,
      goals: ["Health Insurance", "Retirement"]
    },
    {
      id: "raj",
      name: "Raj Sharma",
      role: "Father",
      avatar: "R",
      color: "#FF6B6B",
      contribution: 35000,
      expenses: 22000,
      savings: 13000,
      status: "contributor",
      age: 62,
      goals: ["Retirement", "Medical"]
    }
  ]

  const sharedGoals = [
    {
      id: 1,
      name: "Dream House Purchase",
      target: 5000000,
      current: 1850000,
      contributors: ["priya", "rahul"],
      deadline: "2026-12",
      icon: Home,
      color: "#3BF7FF",
      priority: "high"
    },
    {
      id: 2,
      name: "Wedding Expenses",
      target: 2000000,
      current: 1200000,
      contributors: ["priya", "rahul", "raj"],
      deadline: "2025-11",
      icon: Heart,
      color: "#E4C580",
      priority: "high"
    },
    {
      id: 3,
      name: "Education Fund",
      target: 1500000,
      current: 450000,
      contributors: ["priya", "rahul"],
      deadline: "2030-06",
      icon: GraduationCap,
      color: "#7433FF",
      priority: "medium"
    },
    {
      id: 4,
      name: "Family Vacation",
      target: 300000,
      current: 185000,
      contributors: ["priya", "rahul"],
      deadline: "2025-06",
      icon: Gift,
      color: "#FF6B6B",
      priority: "low"
    }
  ]

  const familyTransactions = [
    {
      from: "Priya",
      to: "Mother",
      amount: 18000,
      type: "Monthly Support",
      time: "2 days ago",
      recurring: true
    },
    {
      from: "Rahul",
      to: "House Fund",
      amount: 50000,
      type: "Savings",
      time: "3 days ago",
      recurring: true
    },
    {
      from: "Priya",
      to: "House Fund",
      amount: 47000,
      type: "Savings",
      time: "3 days ago",
      recurring: true
    },
    {
      from: "Father",
      to: "Wedding Fund",
      amount: 13000,
      type: "Contribution",
      time: "1 week ago",
      recurring: true
    }
  ]

  const selectedMemberData = familyMembers.find(m => m.id === selectedMember)

  const totalFamilyIncome = familyMembers.reduce(
    (sum, m) => sum + m.contribution,
    0
  )
  const totalFamilyExpenses = familyMembers.reduce(
    (sum, m) => sum + m.expenses,
    0
  )
  const totalFamilySavings = familyMembers.reduce(
    (sum, m) => sum + m.savings,
    0
  )
  const familyHealthScore = Math.round(
    (totalFamilySavings / totalFamilyIncome) * 100
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-10 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 relative overflow-hidden"
      style={{
        boxShadow: "0 8px 32px rgba(116, 51, 255, 0.15)"
      }}
    >
      {/* Animated Background */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(116, 51, 255, 0.15), transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(59, 247, 255, 0.15), transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(116, 51, 255, 0.15), transparent 50%)"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center"
              >
                <Users className="w-7 h-7" />
              </motion.div>
              <div>
                <h3 className="text-3xl mb-1">Family Finance Hub</h3>
                <p className="text-white/50">
                  Collective wealth & shared goals
                </p>
              </div>
            </div>
          </div>

          {/* View Switcher */}
          <div className="flex gap-2">
            {["overview", "flow", "goals"].map(v => (
              <motion.button
                key={v}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView(v)}
                className={`px-5 py-2.5 rounded-xl text-sm transition-all capitalize ${
                  view === v
                    ? "bg-[#7433FF]/20 text-[#7433FF] border border-[#7433FF]/30"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                {v}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Family Stats */}
              <div className="grid grid-cols-4 gap-6 mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#3BF7FF]/10 to-transparent border border-[#3BF7FF]/20 relative overflow-hidden"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#3BF7FF]/10 blur-2xl"
                  />
                  <div className="relative">
                    <p className="text-sm text-white/50 mb-2">Total Income</p>
                    <p className="text-3xl mb-2">
                      ₹{(totalFamilyIncome / 1000).toFixed(0)}k
                    </p>
                    <div className="flex items-center gap-1 text-xs text-[#3BF7FF]">
                      <TrendingUp className="w-3 h-3" />
                      <span>+8.5% vs last month</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#7433FF]/10 to-transparent border border-[#7433FF]/20 relative overflow-hidden"
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#7433FF]/10 blur-2xl"
                  />
                  <div className="relative">
                    <p className="text-sm text-white/50 mb-2">Total Savings</p>
                    <p className="text-3xl mb-2">
                      ₹{(totalFamilySavings / 1000).toFixed(0)}k
                    </p>
                    <div className="flex items-center gap-1 text-xs text-[#E4C580]">
                      <Star className="w-3 h-3" />
                      <span>{familyHealthScore}% savings rate</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#E4C580]/10 to-transparent border border-[#E4C580]/20 relative overflow-hidden"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#E4C580]/10 blur-2xl"
                  />
                  <div className="relative">
                    <p className="text-sm text-white/50 mb-2">Members</p>
                    <p className="text-3xl mb-2">{familyMembers.length}</p>
                    <div className="flex items-center gap-1 text-xs text-white/40">
                      <span>
                        {
                          familyMembers.filter(m => m.status === "contributor")
                            .length
                        }{" "}
                        contributors
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-transparent border border-[#FF6B6B]/20 relative overflow-hidden"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#FF6B6B]/10 blur-2xl"
                  />
                  <div className="relative">
                    <p className="text-sm text-white/50 mb-2">Shared Goals</p>
                    <p className="text-3xl mb-2">{sharedGoals.length}</p>
                    <div className="flex items-center gap-1 text-xs text-[#3BF7FF]">
                      <span>
                        {sharedGoals.filter(g => g.priority === "high").length}{" "}
                        high priority
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Family Members Grid */}
              <div className="mb-10">
                <h4 className="text-xl mb-6 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#E4C580]" />
                  Family Members
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {familyMembers.map((member, index) => {
                    const isSelected = selectedMember === member.id
                    return (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        onClick={() => setSelectedMember(member.id)}
                        className={`p-6 rounded-2xl cursor-pointer transition-all relative overflow-hidden ${
                          isSelected
                            ? "bg-white/10 border-2"
                            : "bg-white/5 border border-white/10 hover:bg-white/8"
                        }`}
                        style={{
                          borderColor: isSelected ? member.color : undefined,
                          boxShadow: isSelected
                            ? `0 0 40px ${member.color}40`
                            : undefined
                        }}
                      >
                        {/* Status Badge */}
                        {member.status === "primary" && (
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-3 right-3"
                          >
                            <Crown className="w-4 h-4 text-[#E4C580]" />
                          </motion.div>
                        )}

                        {/* Avatar */}
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
                          style={{
                            background: `linear-gradient(135deg, ${member.color}40, ${member.color}20)`,
                            boxShadow: `0 0 30px ${member.color}30`
                          }}
                        >
                          {member.avatar}
                        </motion.div>

                        {/* Info */}
                        <div className="text-center mb-4">
                          <p className="text-sm mb-1">{member.name}</p>
                          <p className="text-xs text-white/40">
                            {member.role} • {member.age}y
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="space-y-2">
                          {member.contribution > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-white/50">Income</span>
                              <span style={{ color: member.color }}>
                                ₹{(member.contribution / 1000).toFixed(0)}k
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between text-xs">
                            <span className="text-white/50">Expenses</span>
                            <span>₹{(member.expenses / 1000).toFixed(0)}k</span>
                          </div>
                          {member.savings > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-white/50">Savings</span>
                              <span className="text-[#3BF7FF]">
                                ₹{(member.savings / 1000).toFixed(0)}k
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Contribution Bar */}
                        <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${
                                member.contribution > 0
                                  ? (member.savings / member.contribution) * 100
                                  : 0
                              }%`
                            }}
                            transition={{
                              duration: 1,
                              delay: 0.6 + index * 0.1
                            }}
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${member.color}, ${member.color}80)`,
                              boxShadow: `0 0 10px ${member.color}`
                            }}
                          />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Selected Member Detail */}
              <motion.div
                key={selectedMember}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-2xl bg-gradient-to-r from-white/[0.08] to-white/[0.03] border border-white/10 mb-10"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${selectedMemberData.color}40, ${selectedMemberData.color}20)`,
                        boxShadow: `0 0 30px ${selectedMemberData.color}30`
                      }}
                    >
                      {selectedMemberData.avatar}
                    </div>
                    <div>
                      <h4 className="text-xl mb-1">
                        {selectedMemberData.name}
                      </h4>
                      <p className="text-sm text-white/50">
                        {selectedMemberData.role} • {selectedMemberData.status}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7433FF] to-[#3BF7FF] text-sm"
                  >
                    View Full Profile
                  </motion.button>
                </div>

                {/* Goals */}
                {selectedMemberData.goals.length > 0 && (
                  <div>
                    <p className="text-sm text-white/50 mb-3">Active Goals</p>
                    <div className="flex gap-2">
                      {selectedMemberData.goals.map((goal, i) => (
                        <motion.span
                          key={goal}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + i * 0.1 }}
                          className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs"
                        >
                          {goal}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {view === "flow" && (
            <motion.div
              key="flow"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-8">
                <h4 className="text-xl mb-6 flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-[#3BF7FF]" />
                  Family Money Flow
                </h4>
                <div className="space-y-4">
                  {familyTransactions.map((transaction, index) => {
                    const fromMember = familyMembers.find(
                      m => m.name === transaction.from
                    )
                    const color = fromMember?.color || "#3BF7FF"

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="p-6 rounded-2xl bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/10 transition-all relative overflow-hidden group"
                      >
                        {/* Animated Flow Line */}
                        <motion.div
                          className="absolute left-0 top-0 w-1 h-full"
                          style={{ backgroundColor: color }}
                          initial={{ height: 0 }}
                          animate={{ height: "100%" }}
                          transition={{
                            delay: 0.1 + index * 0.1,
                            duration: 0.5
                          }}
                        />

                        {/* Flow Animation */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: `linear-gradient(90deg, ${color}10, transparent)`
                          }}
                        />

                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            {/* From */}
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-sm"
                              style={{
                                background: `linear-gradient(135deg, ${color}30, ${color}10)`
                              }}
                            >
                              {transaction.from[0]}
                            </div>

                            {/* Arrow with animation */}
                            <div className="flex items-center gap-2">
                              <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="flex items-center gap-1"
                              >
                                <div
                                  className="w-16 h-0.5 rounded-full"
                                  style={{ backgroundColor: color }}
                                />
                                <ChevronRight
                                  className="w-4 h-4"
                                  style={{ color }}
                                />
                              </motion.div>
                            </div>

                            {/* To */}
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm bg-white/5 border border-white/10">
                              {transaction.to[0]}
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm">{transaction.from}</p>
                                <span className="text-xs text-white/40">→</span>
                                <p className="text-sm">{transaction.to}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-white/40">
                                  {transaction.type}
                                </span>
                                {transaction.recurring && (
                                  <span className="px-2 py-0.5 rounded-full bg-[#3BF7FF]/10 text-[#3BF7FF] text-xs">
                                    Recurring
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Amount */}
                          <div className="text-right">
                            <p className="text-xl mb-1" style={{ color }}>
                              ₹{transaction.amount.toLocaleString("en-IN")}
                            </p>
                            <p className="text-xs text-white/40">
                              {transaction.time}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Add Transaction Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-6 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#7433FF]/50 hover:bg-white/5 transition-all flex items-center justify-center gap-3 group"
              >
                <Plus className="w-5 h-5 text-[#7433FF] group-hover:rotate-90 transition-transform" />
                <span className="text-white/60 group-hover:text-white transition-colors">
                  Add Family Transaction
                </span>
              </motion.button>
            </motion.div>
          )}

          {view === "goals" && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="mb-8">
                <h4 className="text-xl mb-6 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#E4C580]" />
                  Shared Family Goals
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sharedGoals.map((goal, index) => {
                    const Icon = goal.icon
                    const progress = (goal.current / goal.target) * 100

                    return (
                      <motion.div
                        key={goal.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 relative overflow-hidden group cursor-pointer"
                        style={{
                          boxShadow: `0 0 30px ${goal.color}20`
                        }}
                      >
                        {/* Animated Background */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: `radial-gradient(circle at 50% 50%, ${goal.color}15, transparent 70%)`
                          }}
                        />

                        <div className="relative">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{
                                  background: `linear-gradient(135deg, ${goal.color}30, ${goal.color}10)`,
                                  boxShadow: `0 0 20px ${goal.color}30`
                                }}
                              >
                                <Icon
                                  className="w-6 h-6"
                                  style={{ color: goal.color }}
                                />
                              </div>
                              <div>
                                <p className="text-sm mb-1">{goal.name}</p>
                                <p className="text-xs text-white/40">
                                  Deadline:{" "}
                                  {new Date(
                                    goal.deadline
                                  ).toLocaleDateString("en-IN", {
                                    month: "short",
                                    year: "numeric"
                                  })}
                                </p>
                              </div>
                            </div>
                            <span
                              className="px-3 py-1 rounded-full text-xs capitalize"
                              style={{
                                backgroundColor: `${goal.color}20`,
                                color: goal.color
                              }}
                            >
                              {goal.priority}
                            </span>
                          </div>

                          {/* Progress */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-white/50">
                                Progress
                              </span>
                              <span
                                className="text-sm"
                                style={{ color: goal.color }}
                              >
                                {progress.toFixed(0)}%
                              </span>
                            </div>
                            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{
                                  duration: 1,
                                  delay: 0.2 + index * 0.1
                                }}
                                className="h-full rounded-full relative"
                                style={{
                                  background: `linear-gradient(90deg, ${goal.color}, ${goal.color}80)`,
                                  boxShadow: `0 0 10px ${goal.color}`
                                }}
                              >
                                {/* Shimmer Effect */}
                                <motion.div
                                  animate={{ x: ["-100%", "200%"] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear"
                                  }}
                                  className="absolute inset-0 w-1/3"
                                  style={{
                                    background:
                                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
                                  }}
                                />
                              </motion.div>
                            </div>
                          </div>

                          {/* Amount */}
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-xs text-white/40 mb-1">
                                Current
                              </p>
                              <p className="text-lg">
                                ₹{(goal.current / 100000).toFixed(2)}L
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-white/40 mb-1">
                                Target
                              </p>
                              <p className="text-lg">
                                ₹{(goal.target / 100000).toFixed(0)}L
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-white/40 mb-1">
                                Remaining
                              </p>
                              <p className="text-lg text-[#FF6B6B]">
                                ₹
                                {(
                                  (goal.target - goal.current) /
                                  100000
                                ).toFixed(2)}
                                L
                              </p>
                            </div>
                          </div>

                          {/* Contributors */}
                          <div className="pt-4 border-t border-white/10">
                            <p className="text-xs text-white/40 mb-2">
                              Contributors
                            </p>
                            <div className="flex items-center gap-2">
                              {goal.contributors.map(contributorId => {
                                const contributor = familyMembers.find(
                                  m => m.id === contributorId
                                )
                                return (
                                  <motion.div
                                    key={contributorId}
                                    whileHover={{ scale: 1.1 }}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                                    style={{
                                      background: `linear-gradient(135deg, ${contributor?.color}40, ${contributor?.color}20)`,
                                      border: `1px solid ${contributor?.color}30`
                                    }}
                                  >
                                    {contributor?.avatar}
                                  </motion.div>
                                )
                              })}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 rounded-lg bg-white/5 border border-dashed border-white/20 hover:border-[#7433FF]/50 flex items-center justify-center"
                              >
                                <Plus className="w-4 h-4 text-white/40" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Add Goal Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-6 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#7433FF]/50 hover:bg-white/5 transition-all flex items-center justify-center gap-3 group"
              >
                <Plus className="w-5 h-5 text-[#7433FF] group-hover:rotate-90 transition-transform" />
                <span className="text-white/60 group-hover:text-white transition-colors">
                  Create New Family Goal
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Family Health Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#7433FF]/10 to-[#3BF7FF]/10 border border-[#7433FF]/30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center"
              >
                <Shield className="w-7 h-7" />
              </motion.div>
              <div>
                <p className="text-sm text-[#3BF7FF] mb-1">
                  Family Financial Health Score
                </p>
                <p className="text-3xl">{familyHealthScore}/100</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/50 mb-2">Overall Status</p>
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 rounded-xl bg-[#3BF7FF]/20 text-[#3BF7FF]">
                  Excellent
                </span>
                <TrendingUp className="w-5 h-5 text-[#3BF7FF]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
export default FamilyFinance;