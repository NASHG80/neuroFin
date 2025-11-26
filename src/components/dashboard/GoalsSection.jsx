import { motion } from "framer-motion"
import { Target, Plus, X, Pencil } from "lucide-react"

import { useState } from "react"
import { createPortal } from "react-dom"

const GoalsSection = ({ goals = [], onAddGoal, onDeleteGoal, onUpdateGoal }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', current: '', emoji: '🎯', color: '#3BF7FF' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [editGoal, setEditGoal] = useState({ name: '', target: '', current: '', emoji: '🎯', color: '#3BF7FF' });

  // Fallback data if no props passed
  const displayGoals = Array.isArray(goals) ? goals : [];

  const handleAddGoal = (e) => {
    e.preventDefault();
    
    // 1. Validation: Ensure required fields are filled
    if (!newGoal.name || !newGoal.target) return;

    // 2. Trigger Parent Function
    if (onAddGoal) {
        onAddGoal({
            id: Date.now(), // Temporary ID for optimistic UI
            name: newGoal.name,
            target: Number(newGoal.target),
            current: Number(newGoal.current) || 0,
            emoji: newGoal.emoji,
            color: newGoal.color
        });
    }

    // 3. Reset and Close
    setIsModalOpen(false);
    setNewGoal({ name: '', target: '', current: '', emoji: '🎯', color: '#3BF7FF' });
  };

  const openEditModal = (goal) => {
    if (!onUpdateGoal) return;
    setEditingGoal(goal);
    setEditGoal({
      name: goal.name || '',
      target: goal.target ?? '',
      current: goal.current ?? '',
      emoji: goal.emoji || '🎯',
      color: goal.color || '#3BF7FF'
    });
    setIsEditModalOpen(true);
  };

  const handleEditGoal = (e) => {
    e.preventDefault();
    if (!editingGoal || !onUpdateGoal) return;

    onUpdateGoal({
      ...editingGoal,
      name: editGoal.name,
      target: Number(editGoal.target) || 0,
      current: Number(editGoal.current) || 0,
      emoji: editGoal.emoji,
      color: editGoal.color
    });

    setIsEditModalOpen(false);
    setEditingGoal(null);
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
          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center shadow-[0_0_15px_rgba(116,51,255,0.5)]"
        >
          <Plus className="w-4 h-4 text-white" />
        </motion.button>
      </div>

      {/* MODAL - Uses createPortal to render outside current stacking context */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                className="bg-[#05050A] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden"
            >
                {/* Subtle Top Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 blur-md rounded-full" />

                <div className="flex justify-between items-center mb-6 relative z-10">
                    <h3 className="text-xl font-medium tracking-wide">New Goal</h3>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="p-2 -mr-2 text-white/50 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                <form onSubmit={handleAddGoal} className="space-y-4 relative z-10">
                    
                    {/* Name Input */}
                    <div className="space-y-1.5">
                        <input 
                            type="text" 
                            placeholder="Goal Name (e.g. Goa Trip)" 
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#3BF7FF]/50 focus:bg-white/10 transition-all"
                            value={newGoal.name} 
                            onChange={e => setNewGoal({...newGoal, name: e.target.value})}
                        />
                    </div>

                    {/* Amount Inputs Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <input 
                            type="number" 
                            placeholder="Target Amount" 
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#3BF7FF]/50 focus:bg-white/10 transition-all"
                            value={newGoal.target} 
                            onChange={e => setNewGoal({...newGoal, target: e.target.value})}
                        />
                        <input 
                            type="number" 
                            placeholder="Current Saved" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#3BF7FF]/50 focus:bg-white/10 transition-all"
                            value={newGoal.current} 
                            onChange={e => setNewGoal({...newGoal, current: e.target.value})}
                        />
                    </div>

                    {/* Color Picker */}
                    <div className="py-2">
                        <p className="text-xs text-white/40 mb-3 ml-1">Theme Color</p>
                        <div className="flex gap-4">
                            {['#3BF7FF', '#7433FF', '#E4C580', '#FF6B6B'].map(c => (
                                <div 
                                    key={c} 
                                    onClick={() => setNewGoal({...newGoal, color: c})} 
                                    className={`w-10 h-10 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${newGoal.color === c ? 'scale-110' : 'hover:scale-105'}`}
                                    style={{
                                        background: c,
                                        boxShadow: newGoal.color === c ? `0 0 20px ${c}60` : 'none',
                                        border: newGoal.color === c ? '2px solid white' : '2px solid transparent'
                                    }} 
                                />
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7433FF] to-[#3BF7FF] font-medium text-white shadow-[0_0_20px_rgba(116,51,255,0.3)] mt-2"
                    >
                        Create Goal
                    </motion.button>
                </form>
            </motion.div>
        </div>,
        document.body
      )}

      {isEditModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            className="bg-[#05050A] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 blur-md rounded-full" />

            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="text-xl font-medium tracking-wide">Edit Goal</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 -mr-2 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5"/>
              </button>
            </div>

            <form onSubmit={handleEditGoal} className="space-y-4 relative z-10">
              <div className="space-y-1.5">
                <input 
                  type="text" 
                  placeholder="Goal Name" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#3BF7FF]/50 focus:bg-white/10 transition-all"
                  value={editGoal.name}
                  onChange={e => setEditGoal({ ...editGoal, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="number" 
                  placeholder="Target Amount" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#3BF7FF]/50 focus:bg-white/10 transition-all"
                  value={editGoal.target}
                  onChange={e => setEditGoal({ ...editGoal, target: e.target.value })}
                />
                <input 
                  type="number" 
                  placeholder="Current Saved" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#3BF7FF]/50 focus:bg-white/10 transition-all"
                  value={editGoal.current}
                  onChange={e => setEditGoal({ ...editGoal, current: e.target.value })}
                />
              </div>

              <div className="py-2">
                <p className="text-xs text-white/40 mb-3 ml-1">Theme Color</p>
                <div className="flex gap-4">
                  {['#3BF7FF', '#7433FF', '#E4C580', '#FF6B6B'].map(c => (
                    <div 
                      key={c} 
                      onClick={() => setEditGoal({ ...editGoal, color: c })} 
                      className={`w-10 h-10 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${editGoal.color === c ? 'scale-110' : 'hover:scale-105'}`}
                      style={{
                        background: c,
                        boxShadow: editGoal.color === c ? `0 0 20px ${c}60` : 'none',
                        border: editGoal.color === c ? '2px solid white' : '2px solid transparent'
                      }} 
                    />
                  ))}
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7433FF] to-[#3BF7FF] font-medium text-white shadow-[0_0_20px_rgba(116,51,255,0.3)] mt-2"
              >
                Save Changes
              </motion.button>
            </form>
          </motion.div>
        </div>,
        document.body
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {displayGoals.length === 0 ? (
          <div className="text-center py-8 opacity-50">
            <Target className="w-8 h-8 mx-auto mb-2 text-white/30" />
            <p className="text-sm">No goals set yet</p>
          </div>
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
                className="relative"
              >
                {/* Jar Container */}
                <div className="relative h-40 rounded-2xl bg-gradient-to-b from-white/5 to-white/10 border border-white/10 overflow-hidden">
                  {onUpdateGoal && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); openEditModal(goal); }}
                      className="absolute top-3 right-9 z-20 p-1.5 rounded-full bg-black/60 border border-white/20 text-white/70 hover:bg-white/80 hover:text-black"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                  )}
                  {onDeleteGoal && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onDeleteGoal(goal); }}
                      className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/60 border border-white/20 text-white/70 hover:bg-red-500/80 hover:text-white"
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
                      background: `linear-gradient(180deg, ${goal.color}90, ${goal.color}40)`,
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
                      className="text-3xl mb-2 drop-shadow-lg"
                    >
                      {goal.emoji}
                    </motion.div>
                    <p className="text-sm mb-1 font-medium text-shadow">{goal.name}</p>
                    <p className="text-xs text-white/60 mb-2">
                      {Math.round(percentage)}% Complete
                    </p>

                    <div className="text-center">
                      <motion.p
                        className="text-lg font-bold tracking-tight text-white drop-shadow-md"
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