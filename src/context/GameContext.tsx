//  ********************************
// The AO Backend and Frontend Integration are ongoing; the repository will be updated as soon as possible.
// ********************************

"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { dryrunResult } from "@/lib/utils";

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
interface HangmanGameState {
  gameProcess: string;
  word: string;
  guessedLetters: string[];
  remainingAttempts: number;
  isGameOver: boolean;
}

// Define the structure of the GameContextType
interface GameContextType {
  mode: GameMode;
  setMode: (newMode: GameMode) => void;
  gameState: HangmanGameState;
  setGameState: (gameState: HangmanGameState) => void;
  handleGuess: (letter: string) => void;
  fetchNewWord: () => Promise<void>;
  resetGame: () => void;
}

// Create the context with default values
const GameContext = createContext<GameContextType | undefined>(undefined);

// GameProvider component to manage the game state and player info
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<GameMode>("landing");
  const [gameState, setGameState] = useState<HangmanGameState>({
    gameProcess: "tj_besQbfwF2Jib0Uqrcu1U-0o4VlZw_BlWMMrRHNCI",
    word: "",
    guessedLetters: [],
    remainingAttempts: 5,
    isGameOver: false,
  });

  // Function to fetch a new word using dryrunResult
  const fetchNewWord = async () => {
    try {
      const tags = [{ name: "category", value: "random" }];
      const result = await dryrunResult(gameState.gameProcess, tags);
      const newWord = result.word || "blockchain";

      setGameState((prev) => ({
        ...prev,
        word: newWord.toLowerCase(),
        guessedLetters: [],
        remainingAttempts: 5,
        isGameOver: false,
      }));
      setMode("playing");
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };

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

    if (isGameOver) setMode("gameOver");
  };

  // Function to reset the game
  const resetGame = async () => {
    await fetchNewWord();
  };

  useEffect(() => {
    if (mode === "playing") fetchNewWord();
  }, [mode]);

  return (
    <GameContext.Provider
      value={{
        mode,
        setMode,
        gameState,
        setGameState,
        handleGuess,
        fetchNewWord,
        resetGame,
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
