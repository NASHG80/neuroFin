import { useState } from 'react';
import { ChatPanel } from './ChatPanel';
import { Sparkles, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import logo from "../../assets/logo.png";

function ChatInterface() {
  const navigate = useNavigate();

  return (
    <div className="flex h-[calc(100vh-80px)] lg:h-screen bg-[#00010D] text-white overflow-hidden relative">

      {/* MAIN CHAT AREA - Full Width */}
      <div className="flex-1 flex flex-col relative min-w-0 bg-[#00010D]">

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#3BF7FF]" />
            <span className="font-medium">NeuroFin Assistant</span>
          </div>
        </div>

        {/* Chat Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth"
        >
          <ChatPanel />
        </motion.div>
      </div>

    </div>
  );
}

export default ChatInterface;
