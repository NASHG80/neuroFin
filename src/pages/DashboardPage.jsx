/* JSX version of provided TSX code (TypeScript annotations removed) */
import { motion, AnimatePresence } from "framer-motion";
import { FinancialHealthScore } from "./components/FinancialHealthScore";
import { SmartAccounts } from "./components/SmartAccounts";
import { SpendingGraph } from "./components/SpendingGraph";
import { FestivePlanner } from "./components/FestivePlanner";
import { FinancialChallenges } from "./components/FinancialChallenges";
import { FuturePlanning } from "./components/FuturePlanning";
import { AutomationsHub } from "./components/AutomationsHub";
import { NotificationsFeed } from "./components/NotificationsFeed";
import { GoalsSection } from "./components/GoalsSection";
import { MonthlyComparison } from "./components/MonthlyComparison";
import { CashFlowAnalysis } from "./components/CashFlowAnalysis";
import { InvestmentPortfolio } from "./components/InvestmentPortfolio";
import { SpendingHeatmap } from "./components/SpendingHeatmap";
import { TransactionFlow } from "./components/TransactionFlow";
import { SmartInsights } from "./components/SmartInsights";
import { VoiceOfMoney } from "./components/VoiceOfMoney";
import { FamilyFinance } from "./components/FamilyFinance";
import {
  Sparkles,
  Bell,
  Settings,
  TrendingUp,
  BarChart3,
  Wallet,
  Zap,
  Activity,
  Search,
  Download,
  Share2,
  Users,
  Brain,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeView, setActiveView] = useState("overview");
  const [notificationCount, setNotificationCount] = useState(3);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

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
    <div ref={containerRef} className="min-h-screen bg-[#00010D] text-white overflow-x-hidden relative">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15], x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-[#7433FF] rounded-full blur-[200px]"
        />

        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1], x: [0, -60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-0 w-[900px] h-[900px] bg-[#3BF7FF] rounded-full blur-[220px]"
        />

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08], x: [0, 40, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-[#E4C580] rounded-full blur-[210px]"
        />

        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -100, 0], opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
          />
        ))}

        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
          style={{ background: "radial-gradient(circle, rgba(116,51,255,.4), transparent 70%)", left: mousePosition.x - 300, top: mousePosition.y - 300 }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </div>

      {/* Nav Bar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 border-b border-white/10 backdrop-blur-2xl bg-black/30 sticky top-0"
        style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset" }}
      >
        <div className="max-w-[2000px] mx-auto px-10 py-6 flex items-center justify-between">

          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05, rotate: 180 }} transition={{ duration: 0.6 }} className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7433FF] via-[#3BF7FF] to-[#E4C580] p-0.5">
                  <div className="w-full h-full bg-[#00010D] rounded-[14px] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#7433FF] via-[#3BF7FF] to-[#E4C580] opacity-30 blur-lg" />
              </motion.div>
              <div>
                <h1 className="text-2xl tracking-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">Nuerofin</h1>
                <p className="text-xs text-white/30 tracking-wide">NEXT-GEN MONEY OS</p>
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
                    {!isActive && <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <input type="text" placeholder="Search transactions..." className="w-64 px-4 py-2.5 pl-10 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#7433FF]/50 transition-all" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            </motion.div>

            <div className="flex items-center gap-2">
              <motion.button whileHover={{ scale: 1.05, rotate: 5 }} whileTap={{ scale: 0.95 }} className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                <Download className="w-5 h-5" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.05, rotate: -5 }} whileTap={{ scale: 0.95 }} className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                <Share2 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
                onClick={() => setNotificationCount(0)}
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#3BF7FF] to-[#7433FF] rounded-full flex items-center justify-center text-xs">
                    {notificationCount}
                  </motion.div>
                )}
              </motion.button>
              <motion.button whileHover={{ scale: 1.05, rotate: 90 }} whileTap={{ scale: 0.95 }} className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/10 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] flex items-center justify-center text-lg">P</div>
              <div>
                <p className="text-sm">Priya Sharma</p>
                <p className="text-xs text-white/40">Premium</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="border-t border-white/5 px-10 py-4">
          <div className="max-w-[2000px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-8">
              {[
                { label: "Net Worth", value: "₹46.6L", change: "+8.5%", color: "#3BF7FF", icon: Wallet },
                { label: "Monthly Growth", value: "₹51.3k", change: "+12%", color: "#E4C580", icon: TrendingUp },
                { label: "Active Goals", value: "3/4", change: "94%", color: "#7433FF", icon: Activity },
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

      <div className="relative z-10 max-w-[2000px] mx-auto px-10 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
          <div className="flex items-end justify-between">
            <div>
              <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-6xl mb-3 tracking-tight bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                {getGreeting()}, Priya
              </motion.h2>
              <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="text-white/50 text-xl">
                Your financial universe • {currentTime.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeView === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 xl:col-span-8 space-y-8">
                  <FinancialHealthScore />
                  <SpendingGraph />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <FestivePlanner />
                    <MonthlyComparison />
                  </div>
                  <AutomationsHub />
                </div>
                <div className="col-span-12 xl:col-span-4 space-y-8">
                  <SmartAccounts />
                  <GoalsSection />
                  <FinancialChallenges />
                  <FuturePlanning />
                  <NotificationsFeed />
                </div>
              </div>
            </motion.div>
          )}

          {activeView === "analytics" && (
            <motion.div key="analytics" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 xl:col-span-8 space-y-8">
                  <CashFlowAnalysis />
                  <InvestmentPortfolio />
                  <SpendingHeatmap />
                  <TransactionFlow />
                </div>
                <div className="col-span-12 xl:col-span-4 space-y-8">
                  <VoiceOfMoney />
                  <MonthlyComparison />
                  <GoalsSection />
                  <NotificationsFeed />
                </div>
              </div>
            </motion.div>
          )}

          {activeView === "family" && (
            <motion.div key="family" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
              <FamilyFinance />
            </motion.div>
          )}

          {activeView === "insights" && (
            <motion.div key="insights" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
              <SmartInsights />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
