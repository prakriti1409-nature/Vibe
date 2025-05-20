import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LiveVibes = () => {
  const [vibeCounts, setVibeCounts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "vibes"), (snapshot) => {
      const counts = {};

      snapshot.forEach((doc) => {
        const name = doc.data().vibe?.name;
        if (name) {
          counts[name] = (counts[name] || 0) + 1;
        }
      });

      const formatted = Object.entries(counts).map(([name, count]) => ({
        name,
        count,
      }));

      console.log("Live vibe counts:", formatted); // Logging for debug

      setVibeCounts(formatted);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="bg-purple-950 p-6 rounded-xl w-full max-w-3xl">
        <h2 className="text-white text-2xl mb-6 font-bold text-center">
          Live Vibe Check 💫
        </h2>

        {vibeCounts.length === 0 ? (
          <p className="text-purple-300 text-center">Waiting for vibes... ✨</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vibeCounts}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default LiveVibes;
