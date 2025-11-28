import React from 'react';
import ChatInterface from '../components/chatbot/ChatInterface';
import { motion } from 'framer-motion';

export default function AssistantPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Custom cubic-bezier for "Apple-like" smoothing
      className="w-full h-screen bg-[#00010D]"
    >
      <ChatInterface />
    </motion.div>
  );
}

// const key="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"