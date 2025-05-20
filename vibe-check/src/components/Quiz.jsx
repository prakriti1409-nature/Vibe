import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const questions = [
  {
    category: "Food",
    question: "Pick a chaotic snack:",
    options: ["Hot Cheetos", "Pickles & peanut butter", "Matcha latte"],
  },
  {
    category: "Sleep",
    question: "Your sleep schedule is:",
    options: ["Perfect", "What is sleep?", "Nocturnal gremlin mode"],
  },
  {
    category: "Social",
    question: "What’s your ideal Friday night?",
    options: ["Staying in with crystals", "Clubbing in a frog onesie", "Reorganizing your room at 2AM"],
  },
  {
    category: "Symbol",
    question: "Pick a chaotic energy symbol:",
    options: ["💅", "🧃", "🌀"],
  },
  {
    category: "Vibe",
    question: "Choose a random impulse buy:",
    options: ["Tarot cards", "Glow-in-the-dark stars", "A frog plushie"],
  },
  {
    category: "Mood",
    question: "Pick a morning vibe:",
    options: ["Stretch & gratitude journal", "Scroll memes in bed", "Dance in PJs to hyperpop"],
  },
  {
    category: 'Pet',
    question: "Choose your magical companion:",
    options: ["Gremlin raccoon", "Talking butterfly", "Black cat with attitude"],
  },
];

const vibes = [
  {
    name: "Goblin",
    description: "You’re vibing with Goblin energy today. Embrace the chaos.",
    emoji: "🧿"
  },
  {
    name: "Fairy",
    description: "You’re vibing with Fairy energy today. Let it shine.",
    emoji: "🧚"
  },
  {
    name: "Witch",
    description: "You’re vibing with Witch energy today. Trust your intuition.",
    emoji: "🪄"
  },
];

const Quiz = () => {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (optionIndex) => {
    const updated = [...answers, optionIndex];
    setAnswers(updated);

    if (current === questions.length - 1) {
      const counts = [0, 0, 0];
      updated.forEach((idx) => {
        counts[idx]++;
      });
      const maxIndex = counts.indexOf(Math.max(...counts));
      const vibe = vibes[maxIndex];

      navigate('/result', { state: { vibe } });
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-yellow-900 to-purple-700 p-6 font-[Comic_Neue]">
      {!started ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-purple-950 p-10 rounded-2xl shadow-2xl text-center border border-yellow-600 max-w-lg w-full"
        >
          <h1 className="text-4xl text-white font-bold mb-4">ARE YOU READY FOR THE QUIZ?</h1>
          <button
            onClick={handleStart}
            className="mt-6 bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition text-lg"
          >
            Start Now
          </button>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="bg-purple-950 p-8 rounded-2xl shadow-2xl max-w-xl w-full text-center border border-green-600"
          >
            <h2 className="text-xl text-purple-400 mb-2 uppercase tracking-wide">
              {questions[current].category}
            </h2>
            <h1 className="text-2xl font-bold text-white mb-6">
              {questions[current].question}
            </h1>

            <div className="flex flex-col gap-4">
              {questions[current].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded-full transition"
                >
                  {option}
                </button>
              ))}
            </div>

            <p className="mt-6 text-purple-300 text-sm">
              Question {current + 1} of {questions.length}
            </p>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Quiz;
