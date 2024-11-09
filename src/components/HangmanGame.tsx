"use client";

import { useGameContext } from "@/context/GameContext";
import { useEffect } from "react";
import { dryrunResult, messageResult } from "@/lib/utils";

const GameGround = () => {
  const { mode, setMode, gameState, handleGuess, resetGame } = useGameContext();

  

  // Display the current word with underscores for unguessed letters
  const displayWord = "gameState.word"
    .split("")
    .map((letter) => (gameState.guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  // Function to handle letter click
  const onLetterClick = (letter: string) => {
    handleGuess(letter);
  };

  useEffect(() => {
    if (gameState.isGameOver) {
      setTimeout(() => setMode("gameOver"), 500);
    }
  }, [gameState.isGameOver, setMode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {mode === "playing" && (
        <>
          <h1 className="text-3xl font-bold mb-4">Guess & Survive</h1>
          
          {/* Word Display Section */}
          <div className="flex flex-col items-center mb-10">
            {/* Category Display */}
            <div className="text-3xl font-semibold text-blue-600 mb-6 bg-gray-100 px-6 py-2 rounded-md shadow-lg border-2 border-blue-300">
              gameState
            </div>

            {/* Word Display with Blanks and Correct Guesses */}
            <div className="flex gap-4">
              {displayWord.split("").map((letter, index) => (
                <span
                  key={index}
                  className={`text-4xl font-bold border-b-4 ${
                    letter === "_" ? "border-gray-400" : "border-green-500"
                  } text-gray-800 px-2`}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          {/* Alphabet Buttons */}
          <div className="space-y-4">
            {/* Row 1: A - I */}
            <div className="flex justify-center gap-2">
              {"QWERTYUIOP".split("").map((letter) => (
                <button
                  key={letter}
                  onClick={() => onLetterClick(letter)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    gameState.guessedLetters.includes(letter)
                      ? gameState.word.includes(letter)
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  disabled={gameState.guessedLetters.includes(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Row 2: J - R */}
            <div className="flex justify-center gap-2">
              {"ASDFGHJKL".split("").map((letter) => (
                <button
                  key={letter}
                  onClick={() => onLetterClick(letter)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    gameState.guessedLetters.includes(letter)
                      ? gameState.word.includes(letter)
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  disabled={gameState.guessedLetters.includes(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Row 3: S - Z */}
            <div className="flex justify-center gap-2">
              {"ZXCVBNM".split("").map((letter) => (
                <button
                  key={letter}
                  onClick={() => onLetterClick(letter)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    gameState.guessedLetters.includes(letter)
                      ? gameState.word.includes(letter)
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
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
                  height: `${gameState.remainingAttempts * 20}%`,
                }}
              />
              {/* Water level text */}
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                {gameState.remainingAttempts % 5}/5
              </div>
            </div>
          </div>

          {/* Attempts Remaining */}
          <p className="mt-4 text-lg">
            Remaining Attempts: {gameState.remainingAttempts}
          </p>
        </>
      )}

      {mode === "gameOver" && (
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            {gameState.remainingAttempts > 0 ? "🎉 You Win!" : "💧 Game Over!"}
          </h2>
          <button
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GameGround;
