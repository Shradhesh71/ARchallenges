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
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 5;

  useEffect(() => {
    const loadLeaderboard = async () => {
      const leaderboard = await fetchLeaderboard();
      console.log("Fetched leaderboard:", leaderboard);
      // Sort players in descending order by score
      const sortedLeaderboard = leaderboard.sort((a:Player, b:Player) => b.score - a.score);
      setPlayers(sortedLeaderboard);
      setLoading(false);
    };
    loadLeaderboard();
  }, []);

  // Pagination logic
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const totalPages = Math.ceil(players.length / playersPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="h-full mt-20 bg-gradient-to-br from-purple-800 to-blue-600 flex items-center justify-center">
      <div className="h-max bg-white mb-32 mt-20 rounded-lg shadow-lg p-8 max-w-2xl w-full text-center mr-20 ml-20">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">🏆 Game Over!</h1>

        {loading ? (
          <p className="text-gray-500">Loading leaderboard...</p>
        ) : (
          <>
            {players.length > 0 ? (
              <>
                <table className="w-full border-collapse bg-gray-100 shadow rounded-md">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700 text-lg">
                      <th className="py-3 px-4">Rank</th>
                      <th className="py-3 px-4">Player ID</th>
                      <th className="py-3 px-4">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPlayers.map((player, index) => (
                      <tr key={player.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold">
                          {indexOfFirstPlayer + index + 1}
                        </td>
                        <td className="py-3 px-4">
                          {player.id.slice(0, 6)}...{player.id.slice(-6)}
                        </td>
                        <td className="py-3 px-4">{player.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-6 gap-4">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`bg-gray-200 px-4 py-2 rounded-full shadow-md font-semibold transition duration-300 hover:bg-gray-300 ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    &lt;
                  </button>

                  <span className="text-gray-700 font-semibold">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`bg-gray-200 px-4 py-2 rounded-full shadow-md font-semibold transition duration-300 hover:bg-gray-300 ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    &gt;
                  </button>
                </div>
              </>
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
