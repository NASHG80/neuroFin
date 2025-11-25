import { motion } from "framer-motion";
import { Volume2, Zap, Send } from "lucide-react";
import { useState, useEffect } from "react";

const VoiceOfMoney = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 120);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const soundWaves = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    height: 20 + Math.random() * 60,
  }));

  // --- CALL BACKEND ---
const askAI = async () => {
  if (!question.trim()) return;
  setLoading(true);

  try {
    const res = await fetch("http://localhost:4000/api/v1/voice-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: "111",
        question: question,
      }),
    });

    const data = await res.json();

    // Show AI text
    setAnswer(data.answer_text);

    // Create audio URL from base64
    const audioUrl = `data:${data.mimetype};base64,${data.audio_base64}`;

    const audioElement = new Audio(audioUrl);

    setAudio(audioElement);
    audioElement.play();
    setIsPlaying(true);

    audioElement.onended = () => setIsPlaying(false);

  } catch (e) {
    console.error("AI voice error:", e);
  }

  setLoading(false);
};


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] 
      backdrop-blur-xl border border-white/10 overflow-hidden relative"
      style={{ boxShadow: "0 8px 32px rgba(116, 51, 255, 0.1)" }}
    >
      {/* Background Animation */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(116, 51, 255, 0.1), transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(59, 247, 255, 0.1), transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(116, 51, 255, 0.1), transparent 50%)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0"
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className="text-xl mb-2">Voice of Money</h3>
            <p className="text-white/50 text-sm">
              Ask your financial questions — AI will speak the answer.
            </p>
          </div>
        </div>

        {/* Input Box */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about your money…"
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 
            text-sm outline-none focus:border-[#3BF7FF]"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            onClick={askAI}
            className="p-3 rounded-xl bg-gradient-to-br from-[#7433FF] to-[#3BF7FF] 
            hover:shadow-lg hover:shadow-[#7433FF]/30 transition-all disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Audio Waves */}
        <div className="h-40 flex items-center justify-center gap-1 mb-8">
          {soundWaves.map((wave, index) => (
            <motion.div
              key={wave.id}
              className="w-1 rounded-full bg-gradient-to-t from-[#7433FF] via-[#3BF7FF] to-[#E4C580]"
              animate={{
                height: isPlaying
                  ? [
                      wave.height,
                      wave.height * 0.7,
                      wave.height * 1.3,
                      wave.height,
                    ]
                  : 20,
                opacity: isPlaying ? [0.3, 1, 0.5, 0.8] : 0.2,
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.02,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* AI Spoken Text */}
        {answer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-gradient-to-r from-[#7433FF]/10 to-[#3BF7FF]/10 
            border border-[#7433FF]/20 mb-6"
          >
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7433FF] 
                to-[#3BF7FF] flex items-center justify-center flex-shrink-0"
              >
                <Zap className="w-5 h-5" />
              </motion.div>

              <div className="flex-1">
                <p className="text-sm mb-2 text-[#3BF7FF]">AI says:</p>
                <p className="text-sm text-white/80 leading-relaxed">{answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default VoiceOfMoney;
