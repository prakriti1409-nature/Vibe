import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Memoize the vibe object to avoid ESLint warning
  const vibe = useMemo(() => location.state?.vibe || {
    name: "Goblin",
    description: "You’re living your chaotic Goblin life! Embrace the madness 🌀",
    emoji: "🧿",
  }, [location.state]);

  // Save to Firestore
  useEffect(() => {
    const saveVibe = async () => {
      try {
        console.log("Saving vibe to Firestore:", vibe); // Logging for debug
        await addDoc(collection(db, 'vibes'), {
          vibe,
          timestamp: serverTimestamp(),
        });
        console.log("Saved successfully!");
      } catch (error) {
        console.error("Error saving vibe to Firestore:", error);
      }
    };

    saveVibe();
  }, [vibe]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-purple-700 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-purple-950 shadow-2xl rounded-2xl p-10 max-w-xl w-full text-center border border-purple-600"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Your Vibe Result ✨
        </h1>

        <div className="text-7xl mb-4">{vibe.emoji}</div>

        <h2 className="text-2xl font-semibold text-purple-300 mb-2">
          {vibe.name} Vibe
        </h2>

        <p className="text-white text-lg mb-6">{vibe.description}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition"
          >
            Retake Quiz
          </button>

          <button
            onClick={() =>
              navigator.share &&
              navigator.share({
                title: 'My Vibe Result',
                text: `I got the ${vibe.name} vibe! ${vibe.description}`,
                url: window.location.href,
              })
            }
            className="bg-white hover:bg-gray-100 text-purple-800 px-6 py-2 rounded-full transition"
          >
            Share Vibe
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Result;
