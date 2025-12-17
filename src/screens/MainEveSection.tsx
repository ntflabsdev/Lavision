import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import eveChat from "../assets/EveChat.mp4"
interface Message {
  id: number;
  text: string;
  isEve: boolean;
}

type ChatVariant = "full" | "mini";

const EveReplies = [
  "Got it. Tell me a bit more so I can personalize this.",
  "Nice. What else matters most to you here?",
  "Understood. Anything you want me to emphasize or avoid?",
  "Thanks. I’m refining your world. Add any detail you like.",
  "Cool! Describe the vibe or mood you’re going for.",
  "Noted. If you have priorities, list them out for me.",
  "Okay. Colors, sounds, or feelings you want included?",
];

export default function EVEChat({ variant = "full", onClose }: { variant?: ChatVariant; onClose?: () => void; }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [input, setInput] = useState("");
  const hasSentInitial = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (hasSentInitial.current) return;
    hasSentInitial.current = true;

    const sendWelcome = async () => {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setMessages([
        { id: Date.now(), text: "Hi, I’m Eve – your personal guide. How can I help you today?", isEve: true },
      ]);
    };

    sendWelcome();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setInput("");
    
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: userText, isEve: false },
    ]);

    setIsThinking(true);
    await new Promise((resolve) => setTimeout(resolve, 850));
    setIsThinking(false);

    const reply = EveReplies[Math.floor(Math.random() * EveReplies.length)];
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: reply, isEve: true },
    ]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const placeholder = isThinking
    ? "Eve is thinking..."
    : "Type your answer here…";

  const containerClass =
    variant === "mini"
      ? "fixed bottom-24 right-6 w-[420px] max-w-[90vw] h-[520px] z-[1300]"
      : "fixed inset-0 w-full h-full overflow-hidden z-[1200]";

  return (
    <div className={containerClass}>
      {/* Video/Gradient Backdrop (full) */}
      {variant === "full" && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src={eveChat}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-pink-900/30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}

      {/* Panel styling for mini (with video bg) */}
      {variant === "mini" && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            src={eveChat}
          />
          <div className="absolute inset-0 rounded-3xl bg-black/60 border border-white/10 shadow-2xl backdrop-blur-sm" />
        </>
      )}

      <div className={`relative z-10 flex flex-col h-full ${variant === "mini" ? "p-4" : ""}`}>
        {/* Close (optional) */}
        {onClose && (
          <button
            onClick={onClose}
            className={`absolute ${variant === "mini" ? "top-3 right-3" : "top-4 right-4"} z-20 rounded-full bg-black/60 text-white px-3 py-1 text-sm hover:bg-black/80`}
          >
            Close
          </button>
        )}

        {/* Chat Area */}
        <div className={`flex-1 overflow-y-auto ${variant === "mini" ? "px-3 pb-2 pt-2" : "px-6 pb-4 pt-4"}`}>
          <div className={`${variant === "mini" ? "max-w-full" : "max-w-3xl mx-auto"} flex flex-col gap-4`}>
            {messages.map((msg, index) => {
              const fromEnd = messages.length - 1 - index;
              const isOld = fromEnd > 2;
              
              return (
                <div
                  key={msg.id}
                  className={`max-w-[65%] transition-opacity duration-500 ${
                    msg.isEve ? "self-start" : "self-end"
                  } ${isOld ? "opacity-40" : "opacity-100"}`}
                >
                  <div
                    className={`px-5 py-4 rounded-2xl ${
                      msg.isEve
                        ? "bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-tl-sm"
                        : "bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-tr-sm"
                    }`}
                  >
                    <p className="text-white text-base leading-relaxed whitespace-pre-line">
                      {msg.text}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className={`${variant === "mini" ? "pb-3 pt-2" : "pb-8 pt-4"}`}>
          <div className={`${variant === "mini" ? "w-full px-2" : "w-full max-w-2xl mx-auto px-4"}`}>
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isThinking}
                placeholder={placeholder}
                className={`w-full ${variant === "mini" ? "px-4 py-3 pr-12" : "px-6 py-4 pr-14"} rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white placeholder:text-slate-400 text-base outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              <button
                onClick={handleSend}
                disabled={isThinking || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}