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
  Star,
  X,
  Wallet,
  MoreHorizontal,
  ArrowDownLeft,
  ArrowUpRight
} from "lucide-react"
import { useState } from "react"

const FamilyFinance = ({ members = [], onAddMember }) => {
  const [selectedMember, setSelectedMember] = useState("priya")
  const [view, setView] = useState("overview")
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [newMember, setNewMember] = useState({ name: '', role: '', relation: 'Member', color: '#3BF7FF' })

  // Fallback if no props passed
  const familyMembers = members.length > 0 ? members : [
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
    }
  ]

  const handleAddMember = (e) => {
    e.preventDefault()
    if (!onAddMember) return
    onAddMember({
      id: Date.now().toString(),
      name: newMember.name,
      role: newMember.role || newMember.relation,
      avatar: newMember.name[0].toUpperCase(),
      color: newMember.color,
      contribution: 0,
      expenses: 0,
      savings: 0,
      status: 'member',
      age: 25, // Default
      goals: []
    })
    setIsAddMemberOpen(false)
    setNewMember({ name: '', role: '', relation: 'Member', color: '#3BF7FF' })
  }

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
      contributors: ["priya", "rahul"],
      deadline: "2025-11",
      icon: Heart,
      color: "#E4C580",
      priority: "high"
    },
    {
        id: 3,
        name: "Europe Trip",
        target: 500000,
        current: 150000,
        contributors: ["priya", "rahul"],
        deadline: "2025-08",
        icon: Gift,
        color: "#FF6B6B",
        priority: "medium"
    }
  ]

  const familyTransactions = [
    { from: "Priya", to: "Mother", amount: 5000, type: "Sent to Mom", time: "Yesterday", recurring: false, flow: "out" },
    { from: "Rahul", to: "House Fund", amount: 50000, type: "Savings", time: "5h ago", recurring: true, flow: "in" },
    { from: "Priya", to: "Account", amount: 85000, type: "Salary Credit", time: "1st Nov", recurring: true, flow: "in" },
    { from: "Father", to: "Wedding Fund", amount: 13000, type: "Contribution", time: "2d ago", recurring: true, flow: "in" }
  ]

  const selectedMemberData = familyMembers.find(m => m.id === selectedMember) || familyMembers[0]

  // Filter transactions for the selected member to show in the detailed view
  const memberTransactions = familyTransactions.filter(tx => 
    tx.from.toLowerCase().includes(selectedMemberData.name.split(' ')[0].toLowerCase())
  );

  const totalFamilyIncome = familyMembers.reduce((sum, m) => sum + m.contribution, 0)
  const totalFamilySavings = familyMembers.reduce((sum, m) => sum + m.savings, 0)
  const familyHealthScore = totalFamilyIncome > 0 ? Math.round((totalFamilySavings / totalFamilyIncome) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-4 lg:p-10 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 relative overflow-hidden"
      style={{ boxShadow: "0 8px 32px rgba(116, 51, 255, 0.15)" }}
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
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 gap-6 md:gap-0">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center flex-shrink-0"
            >
              <Users className="w-6 h-6 md:w-7 md:h-7" />
            </motion.div>
            <div>
              <h3 className="text-2xl md:text-3xl mb-1 font-light">Family Hub</h3>
              <p className="text-white/50 text-sm">Collective wealth & goals</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center overflow-x-auto no-scrollbar">
            <div className="flex bg-white/5 rounded-xl p-1 shrink-0">
                {["overview", "flow", "goals"].map(v => (
                <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm transition-all capitalize ${
                    view === v
                        ? "bg-[#7433FF] text-white shadow-lg shadow-[#7433FF]/20"
                        : "text-white/50 hover:text-white"
                    }`}
                >
                    {v}
                </button>
                ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddMemberOpen(true)}
              className="px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs md:text-sm flex items-center gap-2 hover:bg-white/15 transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" /> <span className="hidden xs:inline">Add</span>
            </motion.button>
          </div>
        </div>

        {/* Add Member Modal */}
        <AnimatePresence>
          {isAddMemberOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-[#0A0A10] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl">Add Family Member</h3>
                  <button onClick={() => setIsAddMemberOpen(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleAddMember} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-white/50 ml-1">Name</label>
                    <input
                        type="text" placeholder="e.g. Mom" required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7433FF]/50 transition-colors"
                        value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-white/50 ml-1">Role</label>
                    <input
                        type="text" placeholder="e.g. Dependent"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7433FF]/50 transition-colors"
                        value={newMember.role} onChange={e => setNewMember({ ...newMember, role: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs text-white/50 ml-1">Theme Color</label>
                    <div className="flex gap-3">
                        {['#3BF7FF', '#7433FF', '#E4C580', '#FF6B6B'].map(c => (
                        <div key={c} onClick={() => setNewMember({ ...newMember, color: c })}
                            className={`w-10 h-10 rounded-full cursor-pointer border-2 transition-all flex items-center justify-center ${newMember.color === c ? 'border-white scale-110' : 'border-transparent'}`}
                            style={{ backgroundColor: c }}>
                            {newMember.color === c && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        ))}
                    </div>
                  </div>

                  <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7433FF] to-[#3BF7FF] font-medium mt-4 hover:shadow-lg hover:shadow-[#7433FF]/25 transition-all">
                    Add Member
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {view === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Family Stats - 2x2 grid on mobile for better density */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-10">
                {/* Stats Cards */}
                <motion.div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-[#3BF7FF]/10 to-transparent border border-[#3BF7FF]/20 relative overflow-hidden">
                  <div className="relative">
                    <p className="text-xs md:text-sm text-white/50 mb-1 md:mb-2">Total Income</p>
                    <p className="text-xl md:text-3xl mb-1 md:mb-2">₹{(totalFamilyIncome / 1000).toFixed(0)}k</p>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-[#3BF7FF]">
                      <TrendingUp className="w-3 h-3" /> <span>+8.5%</span>
                    </div>
                  </div>
                </motion.div>
                <motion.div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-[#7433FF]/10 to-transparent border border-[#7433FF]/20 relative overflow-hidden">
                  <div className="relative">
                    <p className="text-xs md:text-sm text-white/50 mb-1 md:mb-2">Total Savings</p>
                    <p className="text-xl md:text-3xl mb-1 md:mb-2">₹{(totalFamilySavings / 1000).toFixed(0)}k</p>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-[#E4C580]">
                      <Star className="w-3 h-3" /> <span>{familyHealthScore}% rate</span>
                    </div>
                  </div>
                </motion.div>
                <motion.div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-[#E4C580]/10 to-transparent border border-[#E4C580]/20 relative overflow-hidden">
                  <div className="relative">
                    <p className="text-xs md:text-sm text-white/50 mb-1 md:mb-2">Members</p>
                    <p className="text-xl md:text-3xl mb-1 md:mb-2">{familyMembers.length}</p>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-white/40">
                      <span>{familyMembers.filter(m => m.status === "contributor").length} active</span>
                    </div>
                  </div>
                </motion.div>
                <motion.div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-transparent border border-[#FF6B6B]/20 relative overflow-hidden">
                  <div className="relative">
                    <p className="text-xs md:text-sm text-white/50 mb-1 md:mb-2">Goals</p>
                    <p className="text-xl md:text-3xl mb-1 md:mb-2">{sharedGoals.length}</p>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-[#3BF7FF]">
                      <span>{sharedGoals.filter(g => g.priority === "high").length} high prio</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Family Members Grid */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h4 className="text-lg md:text-xl flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#E4C580]" /> Family Members
                  </h4>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                  {familyMembers.map((member, index) => {
                    const isSelected = selectedMember === member.id
                    return (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        onClick={() => setSelectedMember(member.id)}
                        className={`p-4 rounded-2xl cursor-pointer transition-all relative overflow-hidden ${isSelected ? "bg-white/10 border-2" : "bg-white/5 border border-white/10 hover:bg-white/8"}`}
                        style={{ borderColor: isSelected ? member.color : undefined }}
                      >
                        {member.status === "primary" && (
                          <div className="absolute top-3 right-3"><Crown className="w-3 h-3 md:w-4 md:h-4 text-[#E4C580]" /></div>
                        )}
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl mx-auto mb-3 md:mb-4 flex items-center justify-center text-xl md:text-2xl font-bold text-white" style={{ background: `linear-gradient(135deg, ${member.color}40, ${member.color}20)`, boxShadow: `0 0 30px ${member.color}30` }}>
                          {member.avatar}
                        </div>
                        <div className="text-center mb-3 md:mb-4">
                          <p className="text-xs md:text-sm mb-0.5 truncate font-medium">{member.name}</p>
                          <p className="text-[10px] md:text-xs text-white/40">{member.role}</p>
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                          <div className="flex justify-between text-[10px] md:text-xs">
                            <span className="text-white/50">Income</span>
                            <span style={{ color: member.color }}>₹{(member.contribution / 1000).toFixed(0)}k</span>
                          </div>
                          <div className="flex justify-between text-[10px] md:text-xs">
                            <span className="text-white/50">Savings</span>
                            <span className="text-[#3BF7FF]">₹{(member.savings / 1000).toFixed(0)}k</span>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-4 h-1 md:h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${member.contribution > 0 ? (member.savings / member.contribution) * 100 : 0}%` }}
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${member.color}, ${member.color}80)` }}
                          />
                        </div>
                      </motion.div>
                    )
                  })}
                  
                  {/* Add Member Card (Shortcut) */}
                  <motion.div
                    onClick={() => setIsAddMemberOpen(true)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-4 rounded-2xl cursor-pointer border border-dashed border-white/20 hover:border-white/40 flex flex-col items-center justify-center gap-2 md:gap-3 min-h-[160px] md:min-h-[200px] group"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                        <Plus className="w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover:text-white" />
                    </div>
                    <span className="text-xs md:text-sm text-white/50 group-hover:text-white transition-colors text-center">Add Member</span>
                  </motion.div>
                </div>
              </div>

              {/* Detailed View Panel */}
              <motion.div
                key={selectedMember}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 md:p-8 rounded-2xl bg-gradient-to-r from-white/[0.08] to-white/[0.03] border border-white/10 mb-10"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl md:text-2xl font-bold" style={{ background: `linear-gradient(135deg, ${selectedMemberData.color}40, ${selectedMemberData.color}20)` }}>
                      {selectedMemberData.avatar}
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl mb-1 font-medium">{selectedMemberData.name}</h4>
                      <p className="text-xs md:text-sm text-white/50">{selectedMemberData.role} • {selectedMemberData.status}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs md:text-sm hover:bg-white/10 flex items-center justify-center gap-2">
                        <Wallet className="w-3 h-3 md:w-4 md:h-4" /> Set Budget
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-[#7433FF] to-[#3BF7FF] text-xs md:text-sm font-medium">
                        View Analytics
                    </button>
                  </div>
                </div>
                
                {/* Recent Activity for Selected Member */}
                <div className="mt-6 pt-6 border-t border-white/10">
                    <h5 className="text-sm text-white/70 mb-4">Recent Transactions</h5>
                    <div className="space-y-3">
                        {memberTransactions.length > 0 ? memberTransactions.map((tx, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.flow === 'in' ? 'bg-[#E4C580]/20 text-[#E4C580]' : 'bg-[#3BF7FF]/20 text-[#3BF7FF]'}`}>
                                        {tx.flow === 'in' ? <Wallet className="w-4 h-4"/> : <ArrowRightLeft className="w-4 h-4"/>}
                                    </div>
                                    <div>
                                        <p className="text-xs md:text-sm">{tx.type}</p>
                                        <p className="text-[10px] md:text-xs text-white/40">{tx.time}</p>
                                    </div>
                                </div>
                                <p className={`text-xs md:text-sm font-medium ${tx.flow === 'in' ? 'text-[#E4C580]' : 'text-white'}`}>
                                    {tx.flow === 'in' ? '+' : '-'} ₹{tx.amount.toLocaleString()}
                                </p>
                            </div>
                        )) : (
                            <p className="text-xs text-white/30 italic">No recent activity for {selectedMemberData.name}</p>
                        )}
                    </div>
                </div>
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
                      {familyTransactions.map((tx, index) => {
                         const member = familyMembers.find(m => m.name.includes(tx.from)) || familyMembers[0];
                         const color = member.color || "#3BF7FF";
                         return (
                            <div key={index} className="relative p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style={{background: `${color}20`, color: color}}>
                                    {tx.flow === "in" ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                  </div>
                                  <div>
                                     <p className="text-sm">{tx.from} <span className="text-white/40 text-xs">to</span> {tx.to}</p>
                                     <p className="text-xs text-white/40">{tx.time} • {tx.type}</p>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <p className={`font-medium ${tx.flow === "in" ? "text-[#E4C580]" : "text-white"}`}>
                                    {tx.flow === "in" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                                  </p>
                                  {tx.recurring && <span className="text-[10px] bg-[#3BF7FF]/10 text-[#3BF7FF] px-1.5 py-0.5 rounded">Recurring</span>}
                               </div>
                            </div>
                         )
                      })}
                   </div>
                </div>
             </motion.div>
          )}
          
          {view === "goals" && (
             <motion.div
               key="goals"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
             >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {sharedGoals.map((goal, index) => {
                      const progress = (goal.current / goal.target) * 100;
                      const Icon = goal.icon;
                      return (
                         <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 text-white">
                                     <Icon className="w-5 h-5" style={{color: goal.color}} />
                                  </div>
                                  <div>
                                     <h4 className="text-sm font-medium">{goal.name}</h4>
                                     <p className="text-xs text-white/40">Target: ₹{(goal.target/100000).toFixed(1)}L</p>
                                  </div>
                               </div>
                               <span className="text-xs px-2 py-1 rounded bg-white/5 text-white/60">{goal.priority}</span>
                            </div>
                            
                            <div className="mb-2 flex justify-between text-xs">
                               <span className="text-white/40">Progress</span>
                               <span style={{color: goal.color}}>{progress.toFixed(0)}%</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                               <div className="h-full rounded-full" style={{width: `${progress}%`, background: goal.color}} />
                            </div>
                            
                            <div className="flex items-center justify-between">
                               <div className="flex -space-x-2">
                                  {goal.contributors.map((c, i) => (
                                     <div key={i} className="w-6 h-6 rounded-full bg-white/10 border border-black flex items-center justify-center text-[10px]">
                                        {c[0]}
                                     </div>
                                  ))}
                               </div>
                               <p className="text-xs text-white/40">By {goal.deadline}</p>
                            </div>
                         </div>
                      )
                   })}
                   
                   {/* Add Goal Card */}
                   <div className="p-6 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center gap-2 text-white/40 hover:text-white hover:border-white/40 cursor-pointer transition-all min-h-[180px]">
                      <Plus className="w-8 h-8" />
                      <span className="text-sm">Add New Goal</span>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default FamilyFinance;