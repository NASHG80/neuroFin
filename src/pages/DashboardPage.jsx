import { motion, AnimatePresence } from "framer-motion";
import FinancialHealthScore from "../components/dashboard/FinancialHealthScore";
import SmartAccounts from "../components/dashboard/SmartAccounts";
import SpendingGraph from "../components/dashboard/SpendingGraph";
import FestivePlanner from "../components/dashboard/FestivePlanner";
import FinancialChallenges from "../components/dashboard/FinancialChallenges";
import FuturePlanning from "../components/dashboard/FuturePlanning";
import AutomationsHub from "../components/dashboard/AutomationsHub";
import NotificationsFeed from "../components/dashboard/NotificationsFeed";
import GoalsSection from "../components/dashboard/GoalsSection";
import MonthlyComparison from "../components/dashboard/MonthlyComparison";
import CashFlowAnalysis from "../components/dashboard/CashFlowAnalysis";
import InvestmentPortfolio from "../components/dashboard/InvestmentPortfolio";
import SpendingHeatmap from "../components/dashboard/SpendingHeatmap";
import TransactionFlow from "../components/dashboard/TransactionFlow";
import SmartInsights from "../components/dashboard/SmartInsights";
import VoiceOfMoney from "../components/dashboard/VoiceOfMoney";
import FamilyFinance from "../components/dashboard/FamilyFinance";
import {
  Sparkles,
  Bell,
  Settings,
  TrendingUp,
  BarChart3,
  Wallet,
  Zap,
  Activity,
  Download,
  Users,
  Brain,
  X,
  LogOut,
  MessageSquareText
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeView, setActiveView] = useState("overview");
  const [notificationCount, setNotificationCount] = useState(3);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [userData, setUserData] = useState({ name: "User", email: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);

  // --- GLOBAL DASHBOARD STATE ---
  const [netWorth, setNetWorth] = useState(4664900);
  const [monthlyGrowth, setMonthlyGrowth] = useState(51300);
  const [activeGoalsCount, setActiveGoalsCount] = useState(0);
  
  const [transactions, setTransactions] = useState([]);

  const [goals, setGoals] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyTransactions, setFamilyTransactions] = useState([]);

  const addTransaction = async (newTx) => {
    setTransactions(prev => [newTx, ...prev]);
    if (newTx.type === 'income') {
      setNetWorth(prev => prev + newTx.amount);
      setMonthlyGrowth(prev => prev + newTx.amount);
    } else {
      setNetWorth(prev => prev - newTx.amount);
    }

    const token = localStorage.getItem("nf_token");
    if (!token) return;

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newTx)
      });

      if (!res.ok) {
        return;
      }

      const savedTx = await res.json();
      setTransactions(prev => prev.map(tx => (tx.id === newTx.id ? savedTx : tx)));
    } catch (err) {
      console.error("Failed to save transaction", err);
    }
  };

  const addFamilyMember = async (newMember) => {
    setFamilyMembers(prev => [...prev, newMember]);

    const token = localStorage.getItem("nf_token");
    if (!token) return;

    try {
      const res = await fetch("/api/family/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newMember)
      });

      if (!res.ok) {
        return;
      }

      const savedMember = await res.json();
      setFamilyMembers(prev => prev.map(m => (m.id === newMember.id ? savedMember : m)));
    } catch (err) {
      console.error("Failed to save family member", err);
    }
  };

  const deleteFamilyMember = async (memberToDelete) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== memberToDelete.id));

    const token = localStorage.getItem("nf_token");
    if (!token || !memberToDelete.id) return;

    try {
      const res = await fetch(`/api/family/members/${memberToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        return;
      }
    } catch (err) {
      console.error("Failed to delete family member", err);
    }
  };

  const addFamilyTransaction = async (newTx) => {
    setFamilyTransactions(prev => [newTx, ...prev]);

    const token = localStorage.getItem("nf_token");
    if (!token) return;

    try {
      const res = await fetch("/api/family/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newTx)
      });

      if (!res.ok) {
        return;
      }

      const savedTx = await res.json();
      setFamilyTransactions(prev => prev.map(tx => (tx.id === newTx.id ? savedTx : tx)));
    } catch (err) {
      console.error("Failed to save family transaction", err);
    }
  };

  const updateFamilyTransaction = async (updatedTx) => {
    setFamilyTransactions(prev => prev.map(tx => (tx.id === updatedTx.id ? updatedTx : tx)));

    const token = localStorage.getItem("nf_token");
    if (!token || !updatedTx.id) return;

    try {
      const res = await fetch(`/api/family/transactions/${updatedTx.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedTx)
      });

      if (!res.ok) {
        return;
      }

      const savedTx = await res.json();
      setFamilyTransactions(prev => prev.map(tx => (tx.id === updatedTx.id ? savedTx : tx)));
    } catch (err) {
      console.error("Failed to update family transaction", err);
    }
  };

  // Function to add to a goal (could be used later)
  const addGoal = async (newGoal) => {
      const token = localStorage.getItem("nf_token");

      if (!token) {
        setGoals(prev => [...prev, newGoal]);
        setActiveGoalsCount(prev => prev + 1);
        return;
      }

      try {
        const res = await fetch("/api/goals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: newGoal.name,
            target: newGoal.target,
            current: newGoal.current,
            emoji: newGoal.emoji,
            color: newGoal.color
          })
        });

        if (!res.ok) {
          setGoals(prev => [...prev, newGoal]);
          setActiveGoalsCount(prev => prev + 1);
          return;
        }

        const savedGoal = await res.json();
        setGoals(prev => [...prev, savedGoal]);
        setActiveGoalsCount(prev => prev + 1);
      } catch (err) {
        console.error("Failed to save goal", err);
        setGoals(prev => [...prev, newGoal]);
        setActiveGoalsCount(prev => prev + 1);
      }
  };

  const deleteGoal = async (goalToDelete) => {
    setGoals(prev => prev.filter(g => g.id !== goalToDelete.id));
    setActiveGoalsCount(prev => Math.max(0, prev - 1));

    const token = localStorage.getItem("nf_token");
    if (!token || !goalToDelete.id) return;

    try {
      const res = await fetch(`/api/goals/${goalToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        // If delete failed, reload goals from server to resync state
        const reload = await fetch("/api/goals", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (reload.ok) {
          const data = await reload.json();
          setGoals(Array.isArray(data) ? data : []);
          setActiveGoalsCount(Array.isArray(data) ? data.length : 0);
        }
      }
    } catch (err) {
      console.error("Failed to delete goal", err);
    }
  };

  // Load user data
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("nf_user");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to parse user data");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("nf_token");
    if (!token) return;

    async function fetchGoals() {
      try {
        const res = await fetch("/api/goals", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setGoals(data);
          setActiveGoalsCount(data.length);
        }
      } catch (err) {
        console.error("Failed to load goals", err);
      }
    }

    fetchGoals();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("nf_token");
    if (!token) return;

    async function fetchFamilyMembers() {
      try {
        const res = await fetch("/api/family/members", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setFamilyMembers(data);
        }
      } catch (err) {
        console.error("Failed to load family members", err);
      }
    }

    fetchFamilyMembers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("nf_token");
    if (!token) return;

    async function fetchFamilyTransactions() {
      try {
        const res = await fetch("/api/family/transactions", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setFamilyTransactions(data);
        }
      } catch (err) {
        console.error("Failed to load family transactions", err);
      }
    }

    fetchFamilyTransactions();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("nf_token");
    if (!token) return;

    async function fetchTransactions() {
      try {
        const res = await fetch("/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setTransactions(data);
        }
      } catch (err) {
        console.error("Failed to load transactions", err);
      }
    }

    fetchTransactions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("nf_token");
    localStorage.removeItem("nf_user");
    navigate("/login");
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: BarChart3, gradient: "from-[#7433FF] to-[#3BF7FF]" },
    { id: "analytics", label: "Analytics", icon: TrendingUp, gradient: "from-[#3BF7FF] to-[#E4C580]" },
    { id: "family", label: "Family", icon: Users, gradient: "from-[#E4C580] to-[#FF6B6B]" },
    { id: "insights", label: "AI Insights", icon: Brain, gradient: "from-[#E4C580] to-[#7433FF]" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#00010D] text-white overflow-x-hidden relative pb-40 lg:pb-0">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15], x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[500px] lg:w-[800px] h-[500px] lg:h-[800px] bg-[#7433FF] rounded-full blur-[150px] lg:blur-[200px]"
        />

        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1], x: [0, -60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-0 w-[600px] lg:w-[900px] h-[600px] lg:h-[900px] bg-[#3BF7FF] rounded-full blur-[180px] lg:blur-[220px]"
        />

        <motion.div
          className="hidden lg:block absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
          style={{ background: "radial-gradient(circle, rgba(116,51,255,.4), transparent 70%)", left: mousePosition.x - 300, top: mousePosition.y - 300 }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </div>

      {/* Desktop Nav Bar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 border-b border-white/10 backdrop-blur-2xl bg-black/30 sticky top-0 hidden lg:block"
        style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset" }}
      >
        <div className="max-w-[2000px] mx-auto px-10 py-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* CHANGED: onClick now navigates to /dashboard instead of / */}
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <motion.div whileHover={{ scale: 1.05, rotate: 180 }} transition={{ duration: 0.6 }} className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7433FF] via-[#3BF7FF] to-[#E4C580] p-0.5">
                  <div className="w-full h-full bg-[#00010D] rounded-[14px] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
              <div>
                <h1 className="text-2xl tracking-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">Nuerofin</h1>
                <p className="text-xs text-white/30 tracking-wide">MONEY OS</p>
              </div>
            </div>

            <div className="flex gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveView(item.id)}
                    className="relative px-6 py-3 rounded-2xl transition-all overflow-hidden group"
                  >
                    {isActive && (
                      <>
                        <motion.div layoutId="activeTab" className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-20`} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                        <div className="absolute inset-0 border border-white/20 rounded-2xl" />
                      </>
                    )}
                    <div className="relative flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-white/40"}`} />
                      <span className={`text-sm ${isActive ? "text-white" : "text-white/40"}`}>{item.label}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10" onClick={() => setNotificationCount(0)}>
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#3BF7FF] to-[#7433FF] rounded-full flex items-center justify-center text-xs">
                    {notificationCount}
                  </motion.div>
                )}
              </motion.button>
              <motion.button onClick={handleLogout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10" title="Logout">
                <LogOut className="w-5 h-5 text-white/60" />
              </motion.button>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/10 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center text-lg font-bold">
                {userData.name ? userData.name[0].toUpperCase() : "U"}
              </div>
              <div>
                <p className="text-sm font-medium">{userData.name}</p>
                <p className="text-xs text-white/40">Premium</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="hidden lg:block border-t border-white/5 px-10 py-4 bg-black/20 backdrop-blur-md">
          <div className="max-w-[2000px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-8">
              {[
                { label: "Net Worth", value: `₹${(netWorth/100000).toFixed(2)}L`, change: "+8.5%", color: "#3BF7FF", icon: Wallet },
                { label: "Monthly Growth", value: `₹${(monthlyGrowth/1000).toFixed(1)}k`, change: "+12%", color: "#E4C580", icon: TrendingUp },
                { label: "Active Goals", value: `${activeGoalsCount}/4`, change: "94%", color: "#7433FF", icon: Activity },
                { label: "Automations", value: "5", change: "Running", color: "#3BF7FF", icon: Zap },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg,${stat.color}20,${stat.color}10)`, boxShadow: `0 0 20px ${stat.color}20` }}>
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">{stat.label}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm">{stat.value}</p>
                        <span className="text-xs" style={{ color: stat.color }}>{stat.change}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="text-sm text-white/30">
              {currentTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} • {currentTime.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#00010D]/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 pb-6 z-50 safe-area-bottom">
        {/* CHANGED: Added cursor-pointer and onClick handler to navigate to /dashboard */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#7433FF] via-[#3BF7FF] to-[#E4C580] p-0.5">
              <div className="w-full h-full bg-[#00010D] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <span className="text-lg font-medium bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Nuerofin</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2" onClick={() => setNotificationCount(0)}>
            <Bell className="w-6 h-6 text-white/80" />
            {notificationCount > 0 && (
              <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#3BF7FF] rounded-full border border-black" />
            )}
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center text-sm font-bold" onClick={() => setIsMobileMenuOpen(true)}>
            {userData.name ? userData.name[0].toUpperCase() : "U"}
          </div>
        </div>
      </div>

      {/* Mobile User Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-[#00010D] p-6 lg:hidden"
          >
            <div className="flex justify-end mb-8">
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/10 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center text-4xl font-bold mb-2">
                {userData.name ? userData.name[0].toUpperCase() : "U"}
              </div>
              <h2 className="text-2xl font-light">{userData.name}</h2>
              <p className="text-white/50 -mt-4">{userData.email}</p>
              
              <div className="w-full h-px bg-white/10 my-4" />
              
              <button className="w-full p-4 rounded-2xl bg-white/5 flex items-center gap-4 text-lg">
                <Settings className="w-6 h-6 text-white/70" />
                Settings
              </button>
              <button className="w-full p-4 rounded-2xl bg-white/5 flex items-center gap-4 text-lg">
                <Download className="w-6 h-6 text-white/70" />
                Export Data
              </button>
              <button onClick={handleLogout} className="w-full p-4 rounded-2xl bg-red-500/10 text-red-400 flex items-center gap-4 text-lg mt-auto">
                <LogOut className="w-6 h-6" />
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12 mt-16 lg:mt-0">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2">
            <div>
              <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl lg:text-6xl mb-2 lg:mb-3 tracking-tight bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent font-light">
                {getGreeting()}, {userData.name ? userData.name.split(' ')[0] : 'Friend'}
              </motion.h2>
              <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="text-white/50 text-sm lg:text-xl">
                Your financial universe • {currentTime.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeView === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Left Column */}
                <div className="lg:col-span-8 space-y-6 lg:space-y-8">
                  <FinancialHealthScore netWorth={netWorth} />
                  <SpendingGraph />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <FestivePlanner />
                    <MonthlyComparison />
                  </div>
                  <AutomationsHub />
                </div>
                {/* Right Column */}
                <div className="lg:col-span-4 space-y-6 lg:space-y-8">
                  <SmartAccounts netWorth={netWorth} />
                  <GoalsSection goals={goals} onAddGoal={addGoal} onDeleteGoal={deleteGoal} />
                  <FinancialChallenges />
                  <FuturePlanning />
                  <NotificationsFeed />
                </div>
              </div>
            </motion.div>
          )}

          {activeView === "analytics" && (
            <motion.div key="analytics" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-8 space-y-6 lg:space-y-8">
                  <CashFlowAnalysis />
                  <InvestmentPortfolio />
                  <SpendingHeatmap />
                  <TransactionFlow transactions={transactions} onAddTransaction={addTransaction} />
                </div>
                <div className="lg:col-span-4 space-y-6 lg:space-y-8">
                  <VoiceOfMoney />
                  <MonthlyComparison />
                  <GoalsSection goals={goals} onAddGoal={addGoal} onDeleteGoal={deleteGoal} />
                  <NotificationsFeed />
                </div>
              </div>
            </motion.div>
          )}

          {activeView === "family" && (
            <motion.div key="family" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
              <FamilyFinance
                members={familyMembers}
                onAddMember={addFamilyMember}
                transactions={familyTransactions}
                onAddTransaction={addFamilyTransaction}
                onUpdateTransaction={updateFamilyTransaction}
                onDeleteMember={deleteFamilyMember}
                goals={goals}
                onAddGoal={addGoal}
              />
            </motion.div>
          )}

          {activeView === "insights" && (
            <motion.div key="insights" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
              <SmartInsights />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/assistant')}
        className="fixed bottom-24 lg:bottom-10 right-6 lg:right-10 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-[#7433FF] to-[#3BF7FF] flex items-center justify-center shadow-[0_0_40px_rgba(116,51,255,0.5)] border border-white/20"
      >
        <MessageSquareText className="w-7 h-7 text-white" />
      </motion.button>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#00010D]/90 backdrop-blur-xl border-t border-white/10 px-6 py-3 pb-6 z-50 safe-area-bottom">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className="flex flex-col items-center gap-1"
              >
                <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? "bg-white/10 text-[#3BF7FF]" : "text-white/40"}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-[10px] ${isActive ? "text-white" : "text-white/40"}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}