"use client";

import { useGameContext } from "@/context/GameContext";
import { useEffect } from "react";
import { handleGameOver, messageResult } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useActiveAddress } from "arweave-wallet-kit";

type GameStatess = {
  guessedLetters: string;
  category: string;
  remainingAttempts: number;
  word: string;
  isGameOver: boolean;
};

const GameGround = async () => {
  const activeAddress = useActiveAddress();
  const { mode, setMode, gameState, handleGuess, setGameState } =
    useGameContext();

  const fetchNewWord = async () => {
    const { Messages, Spawns, Output, Error } = await messageResult(
      gameState.gameProcess,
      [
        {
          name: "Action",
          value: "Start-Game",
        },
      ]
    );

    const currentState: GameStatess = JSON.parse(Messages[0].Data);

    if (gameState) {
      toast({
        title: "Guess the word.",
        description: (
          <>
            guessing the word of category{" "}
            <span className="text-red-500 font-bold">
              {currentState.category}
            </span>
          </>
        ),
      });

      setGameState({
        ...gameState,
        word: currentState.word,
        isGameOver: currentState.isGameOver,
        category: currentState.category,
        remainingAttempts: currentState.remainingAttempts,
      });
    }
  };

  console.log("gameState: ", gameState);

  useEffect(() => {
    if (gameState.isGameOver) {
      if (gameState.remainingAttempts > 0) {
        handleGameOver(true, activeAddress);

        toast({
          title: "Congratulations🎉!",
          description: "You have guessed the word correctly.",
        });
      } else {
        toast({
          title: "Game Over!",
          description: "You have lost the game.",
        });
        handleGameOver(false, activeAddress);
      }
      setTimeout(() => setMode("gameOver"), 500);
    }
  }, [gameState.isGameOver, setMode]);

  useEffect(() => {
    if (mode === "playing") fetchNewWord();
  }, [mode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {mode === "playing" && (
        <>
          <h1 className="text-3xl font-bold mb-4">Guess & Survive</h1>

          {/* Word Display Section */}
          <div className="flex flex-col items-center mb-10">
            {/* Category Display */}
            <div className="text-3xl font-semibold text-blue-600 mb-6 bg-gray-100 px-6 py-2 rounded-md shadow-lg border-2 border-blue-300">
              {gameState.category}
            </div>

            {/* Word Display with Blanks and Correct Guesses */}
            <div className="flex gap-4">
              {/* Word Display with Blanks and Correct Guesses */}
              <div className="flex gap-4">
                {gameState.word.split("").map((letter, index) => (
                  <span
                    key={index}
                    className={`text-4xl font-bold border-b-4 px-2 ${
                      gameState.guessedLetters.includes(letter)
                        ? "border-green-500 text-gray-800"
                        : "border-gray-400 text-gray-500"
                    }`}
                  >
                    {gameState.guessedLetters.includes(letter) ? letter : "_"}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Alphabet Buttons */}
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {"qwertyuiop".split("").map((letter) => (
                <button
                  key={letter}
                  className={`px-4 py-2 rounded ${
                    gameState.guessedLetters.includes(letter)
                      ? "bg-red-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700"
                  } text-white`}
                  onClick={() => handleGuess(letter)}
                  disabled={gameState.guessedLetters.includes(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-2">
              {"asdfghjkl".split("").map((letter) => (
                <button
                  key={letter}
                  className={`px-4 py-2 rounded ${
                    gameState.guessedLetters.includes(letter)
                      ? "bg-red-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700"
                  } text-white`}
                  onClick={() => handleGuess(letter)}
                  disabled={gameState.guessedLetters.includes(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-2">
              {"zxcvbnm".split("").map((letter) => (
                <button
                  key={letter}
                  className={`px-4 py-2 rounded ${
                    gameState.guessedLetters.includes(letter)
                      ? "bg-red-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700"
                  } text-white`}
                  onClick={() => handleGuess(letter)}
                  disabled={gameState.guessedLetters.includes(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Water Level Indicator Section */}
          <div className="fixed right-10 top-1/4">
            <div className="relative w-48 h-72 border-4 border-gray-700 rounded-xl overflow-hidden bg-gray-200 shadow-lg">
              {/* Water fill animation */}
              <div
                className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-300 animate-wave"
                style={{
                  height: `${Math.abs(gameState.remainingAttempts - 5) * 20}%`,
                }}
              />
              {/* Water level text */}
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                {Math.abs(gameState.remainingAttempts - 5)}/5
              </div>
            </div>
          </div>

          {/* Attempts Remaining */}
          <p className="mt-4 text-lg">
            Remaining Wrong Attempts: {gameState.remainingAttempts}
          </p>
        </>
      )}
    </div>
  );
};

export default GameGround;
