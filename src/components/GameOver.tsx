"use client";

import { useEffect, useState } from "react";

interface Player {
  id: string;
  name: string;
  score: number;
  isCreator: boolean;
}
const testPlayers: Player[] = [
  {
    id: "player1",
    name: "Shradhesh",
    score: 0,
    isCreator: true,
  },
  {
    id: "player2",
    name: "Samuel",
    score: 20,
    isCreator: false,
  },
  {
    id: "player3",
    name: "Ankush",
    score: 10,
    isCreator: false,
  },
];

export default function GameOver() {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<Player[]>([]);

  //  ********************************
  // The AO Backend and Frontend Integration are ongoing; the repository will be updated as soon as possible.
  // ********************************
  useEffect(() => {
    setPlayers(testPlayers); // Use test data here
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-blue-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full text-center mr-14 ml-14">
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
                    {/* <th className="py-3 px-4">Role</th> */}
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr key={player.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold">{index + 1}</td>
                      <td className="py-3 px-4">{player.name}</td>
                      <td className="py-3 px-4">{player.score}</td>
                      {/* <td className="py-3 px-4">
                        {player.isCreator ? "Creator" : "Player"}
                      </td> */}
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
