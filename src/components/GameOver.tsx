"use client";

import { fetchLeaderboard } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Player {
  id: string;
  name: string;
  score: number;
  isCreator: boolean;
}

export default function GameOver() {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setLoading(false);
    const loadLeaderboard = async () => {
      const leaderboard = await fetchLeaderboard();
      console.log("Fetched leaderboard:", leaderboard);
      setPlayers(leaderboard);
    };
    loadLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-blue-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full text-center mr-20 ml-20">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">🏆 Game Over!</h1>

        {loading ? (
          <p className="text-gray-500">Loading leaderboard...</p>
        ) : (
          <>
            {players.length > 0 ? (
              <table className="w-full border-collapse bg-gray-100 shadow rounded-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 text-lg">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Player Name</th>
                    <th className="py-3 px-4">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr key={player.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold">{index + 1}</td>
                      <td className="py-3 px-4">
                        {player.id.slice(0, 6)}...{player.id.slice(-6)}
                      </td>
                      <td className="py-3 px-4">{player.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No players found.</p>
            )}
          </>
        )}

        <button
          onClick={() => window.location.reload()}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  );
}
