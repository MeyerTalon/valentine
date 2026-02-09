"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "./components/FloatingHearts";
import RunawayButton from "./components/RunawayButton";
import Celebration from "./components/Celebration";

type Screen = "name" | "question" | "thanks";

export default function ValentinePage() {
  const [name, setName] = useState("");
  const [screen, setScreen] = useState<Screen>("name");
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      setName(trimmed);
      setScreen("question");
    }
  };

  const handleYes = async () => {
    setScreen("thanks");
    setIsSending(true);
    setEmailError(null);
    try {
      const res = await fetch("/api/valentine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, accepted: true }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send");
      }
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Could not send notification");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <FloatingHearts />
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {screen === "name" && (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md mx-auto text-center"
            >
              <h1 className="font-poppins font-semibold text-2xl md:text-3xl text-valentine-red mb-2">
                A little question for you
              </h1>
              <form onSubmit={handleNameSubmit} className="space-y-6">
                <label className="block font-quicksand text-lg text-valentine-red-soft">
                  What&apos;s your name?
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-valentine-pink bg-white/80 text-valentine-red placeholder-valentine-pink-dark/60 focus:outline-none focus:ring-2 focus:ring-valentine-red/40 focus:border-valentine-red font-quicksand text-lg"
                  required
                  autoFocus
                />
                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 rounded-2xl bg-valentine-red text-white font-poppins font-semibold text-lg shadow-lg hover:bg-valentine-red/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue 💕
                </motion.button>
              </form>
            </motion.div>
          )}

          {screen === "question" && (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg mx-auto text-center space-y-8"
            >
              <h2 className="font-poppins font-semibold text-2xl md:text-4xl text-valentine-red leading-tight">
                Will you be my Valentine, {name}?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    type="button"
                    onClick={handleYes}
                    className="px-8 py-4 rounded-2xl bg-valentine-red text-white font-poppins font-semibold text-xl shadow-lg hover:bg-valentine-red/90 border-2 border-valentine-red"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Yes! 💕
                  </motion.button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full sm:w-auto"
                >
                  <RunawayButton
                    onClick={() => {}}
                    className="px-6 py-3 rounded-2xl bg-valentine-pink-light border-2 border-valentine-pink text-valentine-red font-poppins font-medium"
                  >
                    No
                  </RunawayButton>
                </motion.div>
              </div>
            </motion.div>
          )}

          {screen === "thanks" && (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md mx-auto text-center space-y-6"
            >
              <Celebration />
              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-valentine-red">
                Yay! Thank you, {name}! 💕
              </h2>
              <p className="font-quicksand text-lg text-valentine-red-soft">
                You just made my day. Happy Valentine&apos;s Day!
              </p>
              {isSending && (
                <p className="font-quicksand text-valentine-pink-dark">Sending a little note...</p>
              )}
              {emailError && (
                <p className="font-quicksand text-sm text-valentine-red/80">
                  (We couldn&apos;t send the email notification, but your answer was saved in our hearts!)
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
