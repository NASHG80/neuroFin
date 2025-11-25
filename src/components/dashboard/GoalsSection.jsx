import { motion, AnimatePresence } from "framer-motion"
import { Target, Plus, X } from "lucide-react"
import { useState } from "react"

const GoalsSection = ({ goals = [], onAddGoal, onDeleteGoal }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', current: '', emoji: '🎯', color: '#3BF7FF' });

  // Fallback data if no props passed
  const displayGoals = Array.isArray(goals) ? goals : [];

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!onAddGoal) return;
    onAddGoal({
        id: Date.now(),
        name: newGoal.name,
        target: Number(newGoal.target),
        current: Number(newGoal.current),
        emoji: newGoal.emoji,
        color: newGoal.color
    });
    setIsModalOpen(false);
    setNewGoal({ name: '', target: '', current: '', emoji: '🎯', color: '#3BF7FF' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10"
      style={{
        boxShadow: "0 8px 32px rgba(116, 51, 255, 0.08)"
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl">Goals</h3>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsModalOpen(true)}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Add Goal Modal */}
      <AnimatePresence>
        {isModalOpen && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <motion.div className="bg-[#0A0A10] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl">New Goal</h3>
                        <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5"/></button>
                    </div>
                    <form onSubmit={handleAddGoal} className="space-y-4">
                        <input 
                            type="text" placeholder="Goal Name (e.g. Goa Trip)" required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                            value={newGoal.name} onChange={e => setNewGoal({...newGoal, name: e.target.value})}
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <input 
                                type="number" placeholder="Target Amount" required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                                value={newGoal.target} onChange={e => setNewGoal({...newGoal, target: e.target.value})}
                            />
                            <input 
                                type="number" placeholder="Current Saved" required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                                value={newGoal.current} onChange={e => setNewGoal({...newGoal, current: e.target.value})}
                            />
                        </div>
                        <div className="flex gap-2">
                            {['#3BF7FF', '#7433FF', '#E4C580', '#FF6B6B'].map(c => (
                                <div key={c} onClick={() => setNewGoal({...newGoal, color: c})} 
                                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${newGoal.color === c ? 'border-white' : 'border-transparent'}`} 
                                style={{backgroundColor: c}} />
                            ))}
                        </div>
                        <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7433FF] to-[#3BF7FF] font-medium">Create Goal</button>
                    </form>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {displayGoals.length === 0 ? (
          <p className="text-sm text-white/60 text-center">Add your first goal</p>
        ) : (
          displayGoals.map((goal, index) => {

            const percentage = (goal.current / goal.target) * 100

            return (
              <motion.div
                key={goal.id ?? index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative cursor-pointer group"
              >
                {/* Jar Container */}
                <div className="relative h-40 rounded-2xl bg-gradient-to-b from-white/5 to-white/10 border border-white/10 overflow-hidden">
                  {onDeleteGoal && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onDeleteGoal(goal); }}
                      className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full bg-black/40 border border-white/30 flex items-center justify-center text-xs text-white/70 hover:bg-red-500/70 hover:border-red-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}

                  {/* Liquid Fill */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${percentage}%` }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                      delay: 0.8 + index * 0.1
                    }}
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      background: `linear-gradient(180deg, ${goal.color}80, ${goal.color}40)`,
                      boxShadow: `0 -10px 40px ${goal.color}60`
                    }}
                  >
                    {/* Wave Effect */}
                    <motion.div
                      animate={{
                        x: [0, 20, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute top-0 left-0 right-0 h-8"
                      style={{
                        background: `radial-gradient(ellipse at center, ${goal.color}40 0%, transparent 70%)`
                      }}
                    />
                  </motion.div>

                  {/* Goal Info Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl mb-2"
                    >
                      {goal.emoji}
                    </motion.div>
                    <p className="text-sm mb-1">{goal.name}</p>
                    <p className="text-xs text-white/50 mb-2">
                      {Math.round(percentage)}% Complete
                    </p>

                    <div className="text-center">
                      <motion.p
                        className="text-lg tracking-tight"
                        style={{ color: goal.color }}
                      >
                        ₹{(goal.current / 1000).toFixed(0)}k
                      </motion.p>
                      <p className="text-xs text-white/40">
                        of ₹{(goal.target / 1000).toFixed(0)}k
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>
    </motion.div>
  )
}
export default GoalsSection;