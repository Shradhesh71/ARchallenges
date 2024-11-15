"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the different game modes for Hangman
type GameMode = "landing" | "playing" | "gameOver";

// Define the structure of the Player
interface Player {
  id: string;
  bazarId?: string;
  name: string;
  score?: number;
  isCreator?: boolean;
}

// Define the structure of the Hangman game state
export interface HangmanGameState {
  gameProcess: string;
  word: string;
  guessedLetters: string[];
  remainingAttempts: number;
  isGameOver: boolean;
  category: string;
  mode: string;
  score: number;
}

// Define the structure of the GameContextType
interface GameContextType {
  mode: GameMode;
  setMode: (newMode: GameMode) => void;
  gameState: HangmanGameState;
  setGameState: (gameState: HangmanGameState) => void;
  handleGuess: (letter: string) => void;
}

// Create the context with default values
const GameContext = createContext<GameContextType | undefined>(undefined);

// GameProvider component to manage the game state and player info
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<GameMode>("landing");
  const [gameState, setGameState] = useState<HangmanGameState>({
    gameProcess: "CCtxq4831lHxSpRTaeJNuSX8FOx7A2fID4-C27mvbNA",
    word: "",
    guessedLetters: [],
    remainingAttempts: 5,
    isGameOver: false,
    category: "",
    mode: "landing",
    score: 0,
  });

  // Function to handle letter guesses
  const handleGuess = (letter: string) => {
    if (gameState.isGameOver || gameState.guessedLetters.includes(letter))
      return;

    const newGuessedLetters = [...gameState.guessedLetters, letter];
    const isCorrectGuess = gameState.word.includes(letter);
    const remainingAttempts = isCorrectGuess
      ? gameState.remainingAttempts
      : gameState.remainingAttempts - 1;

    const isGameOver =
      remainingAttempts <= 0 ||
      gameState.word.split("").every((l) => newGuessedLetters.includes(l));

    setGameState({
      ...gameState,
      guessedLetters: newGuessedLetters,
      remainingAttempts,
      isGameOver,
    });
  };

  return (
    <GameContext.Provider
      value={{
        mode,
        setMode,
        gameState,
        setGameState,
        handleGuess,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Hook for consuming GameContext
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
