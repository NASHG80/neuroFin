import { Mic } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function useVoiceInput({ onTranscript }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  useEffect(() => {
    return () => {
      isListeningRef.current = false;
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) { /* */ }
        recognitionRef.current = null;
      }
    };
  }, []);

  const stop = () => {
    isListeningRef.current = false;
    setListening(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (e) { /* */ }
      recognitionRef.current = null;
    }
  };

  const start = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (e) { /* */ }
      recognitionRef.current = null;
    }

    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-IN";

    rec.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      onTranscript?.(text);
    };

    rec.onerror = () => {
      isListeningRef.current = false;
      recognitionRef.current = null;
      setListening(false);
    };

    rec.onend = () => {
      if (isListeningRef.current) {
        try { rec.start(); } catch (e) {
          isListeningRef.current = false;
          recognitionRef.current = null;
          setListening(false);
        }
      }
    };

    recognitionRef.current = rec;
    isListeningRef.current = true;
    setListening(true);

    try { rec.start(); } catch (e) {
      isListeningRef.current = false;
      recognitionRef.current = null;
      setListening(false);
    }
  };

  const toggle = () => {
    if (isListeningRef.current) stop();
    else start();
  };

  return { listening, toggle };
}

// Compact mic button for inside the input bar
export function MicButton({ listening, onClick }) {
  const hasSpeechAPI = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  if (!hasSpeechAPI) return null;

  return (
    <button
      type="button"
      title={listening ? "Stop listening" : "Start voice input"}
      className={`p-2 transition-colors rounded-lg ${
        listening
          ? "text-red-500 animate-pulse bg-red-500/10"
          : "text-gray-500 hover:text-white hover:bg-white/5"
      }`}
      onClick={onClick}
    >
      <Mic className="w-5 h-5" />
    </button>
  );
}

// Visualizer bar strip – compact, shows only when listening
export function VoiceVisualizer({ listening, bars = 48 }) {
  if (!listening) return null;

  return (
    <div className="h-5 flex items-center justify-center gap-0.5 mb-3">
      {[...Array(bars)].map((_, i) => (
        <div
          key={i}
          className="w-0.5 rounded-full bg-[#3BF7FF]/50 animate-pulse transition-all duration-300"
          style={{
            height: `${20 + Math.random() * 80}%`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}
