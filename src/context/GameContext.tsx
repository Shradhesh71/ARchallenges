// "use client";

// import { createContext, useContext, useState, ReactNode } from "react";

// // Define the different game modes for Hangman
// type GameMode = "landing" | "playing" | "gameOver";

// // Define the structure of the Player
// interface Player {
//   id: string;
//   bazarId?: string;
//   name: string;
//   score?: number;
//   isCreator?: boolean;
// }

// // Define the structure of the Hangman game state
// interface HangmanGameState {
//   gameProcess: string;
//   word: string;
//   guessedLetters: string[];
//   remainingAttempts: number;
//   isGameOver: boolean;
// }

// // Define the structure of the GameContextType
// interface GameContextType {
//   mode: GameMode;
//   setMode: (newMode: GameMode) => void;
//   currentPlayer: Player | null;
//   setCurrentPlayer: (player: Player | null) => void;
//   joinedPlayers: Player[];
//   setJoinedPlayers: (players: Player[]) => void;
//   gameState: HangmanGameState;
//   setGameState: (gameState: HangmanGameState) => void;
//   handleGuess: (letter: string) => void;
// //   resetGame: () => void;
// }

// // Create the context with default values
// const GameContext = createContext<GameContextType | undefined>(undefined);

// // GameProvider component to manage the game state and player info
// export const GameProvider = ({ children }: { children: ReactNode }) => {
//   const [mode, setMode] = useState<GameMode>("landing");
//   const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
//   const [joinedPlayers, setJoinedPlayers] = useState<Player[]>([]);
//   const [gameState, setGameState] = useState<HangmanGameState>({
//     gameProcess: "tj_besQbfwF2Jib0Uqrcu1U-0o4VlZw_BlWMMrRHNCI",
//     word: "blockchain", // default word or fetched dynamically
//     guessedLetters: [],
//     remainingAttempts: 5,
//     isGameOver: false,
//   });

//   // Function to handle letter guesses
//   const handleGuess = (letter: string) => {
//     if (gameState.isGameOver || gameState.guessedLetters.includes(letter))
//       return;

//     const newGuessedLetters = [...gameState.guessedLetters, letter];
//     const remainingAttempts = gameState.word.includes(letter)
//       ? gameState.remainingAttempts
//       : gameState.remainingAttempts - 1;

//     // Check if the game is over
//     const isGameOver =
//       remainingAttempts <= 0 ||
//       gameState.word.split("").every((l) => newGuessedLetters.includes(l));

//     // Update the game state
//     setGameState({
//       ...gameState,
//       guessedLetters: newGuessedLetters,
//       remainingAttempts,
//       isGameOver,
//     });

//     // Update mode if the game is over
//     if (isGameOver) {
//       setMode("gameOver");
//     }
//   };

//   // Function to reset the game
// //   const resetGame = () => {
// //     setGameState({
// //       word: "decentralization", // could be fetched from a list of words
// //       guessedLetters: [],
// //       remainingAttempts: 5,
// //       isGameOver: false,
// //     });
// //     setMode("playing");
// //   };

//   return (
//     <GameContext.Provider
//       value={{
//         mode,
//         setMode,
//         currentPlayer,
//         setCurrentPlayer,
//         joinedPlayers,
//         setJoinedPlayers,
//         gameState,
//         setGameState,
//         handleGuess,
//         // resetGame,
//       }}
//     >
//       {children}
//     </GameContext.Provider>
//   );
// };

// // Hook for consuming GameContext
// export const useGameContext = () => {
//   const context = useContext(GameContext);
//   if (!context) {
//     throw new Error("useGameContext must be used within a GameProvider");
//   }
//   return context;
// };

// "use client";

// import { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import { dryrunResult, messageResult } from "@/lib/utils";

// // Define the different game modes for Hangman
// type GameMode = "landing" | "playing" | "gameOver";

// // Define the structure of the Player
// interface Player {
//   id: string;
//   bazarId?: string;
//   name: string;
//   score?: number;
//   isCreator?: boolean;
// }

// // Define the structure of the Hangman game state
// interface HangmanGameState {
//   gameProcess: string;
//   word: string;
//   guessedLetters: string[];
//   remainingAttempts: number;
//   isGameOver: boolean;
//   waterLevel: number; // New: For tracking water level
// }

// // Define the structure of the GameContextType
// interface GameContextType {
//   mode: GameMode;
//   setMode: (newMode: GameMode) => void;
//   currentPlayer: Player | null;
//   setCurrentPlayer: (player: Player | null) => void;
//   joinedPlayers: Player[];
//   setJoinedPlayers: (players: Player[]) => void;
//   gameState: HangmanGameState;
//   setGameState: (gameState: HangmanGameState) => void;
//   handleGuess: (letter: string) => void;
//   fetchNewWord: () => Promise<void>;
//   resetGame: () => void;
// }

// // Create the context with default values
// const GameContext = createContext<GameContextType | undefined>(undefined);

// // GameProvider component to manage the game state and player info
// export const GameProvider = ({ children }: { children: ReactNode }) => {
//   const [mode, setMode] = useState<GameMode>("landing");
//   const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
//   const [joinedPlayers, setJoinedPlayers] = useState<Player[]>([]);
//   const [gameState, setGameState] = useState<HangmanGameState>({
//     gameProcess: "tj_besQbfwF2Jib0Uqrcu1U-0o4VlZw_BlWMMrRHNCI",
//     word: "",
//     guessedLetters: [],
//     remainingAttempts: 5,
//     isGameOver: false,
//     waterLevel: 0,
//   });

//   // Function to fetch a new word using dryrunResult
//   const fetchNewWord = async () => {
//     try {
//       const tags = [{ name: "category", value: "random" }];
//       const result = await dryrunResult(gameState.gameProcess, tags);
//       const newWord = result.word || "blockchain"; // Fallback if no word is fetched

//       setGameState((prev) => ({
//         ...prev,
//         word: newWord.toLowerCase(),
//         guessedLetters: [],
//         remainingAttempts: 5,
//         isGameOver: false,
//         waterLevel: 0,
//       }));
//       setMode("playing");
//     } catch (error) {
//       console.error("Error fetching word:", error);
//     }
//   };

//   // Function to handle letter guesses
//   const handleGuess = (letter: string) => {
//     if (gameState.isGameOver || gameState.guessedLetters.includes(letter))
//       return;

//     const newGuessedLetters = [...gameState.guessedLetters, letter];
//     const isCorrectGuess = gameState.word.includes(letter);
//     const remainingAttempts = isCorrectGuess
//       ? gameState.remainingAttempts
//       : gameState.remainingAttempts - 1;
//     const waterLevel = isCorrectGuess ? gameState.waterLevel : gameState.waterLevel + 1;

//     // Check if the game is over
//     const isGameOver =
//       remainingAttempts <= 0 ||
//       gameState.word.split("").every((l) => newGuessedLetters.includes(l));

//     // Update the game state
//     setGameState({
//       ...gameState,
//       guessedLetters: newGuessedLetters,
//       remainingAttempts,
//       waterLevel,
//       isGameOver,
//     });

//     // Update mode if the game is over
//     if (isGameOver) {
//       setMode("gameOver");
//     }
//   };

//   // Function to reset the game
//   const resetGame = async () => {
//     await fetchNewWord();
//   };

//   // Fetch a new word when the game starts
//   useEffect(() => {
//     if (mode === "playing") fetchNewWord();
//   }, [mode]);

//   return (
//     <GameContext.Provider
//       value={{
//         mode,
//         setMode,
//         currentPlayer,
//         setCurrentPlayer,
//         joinedPlayers,
//         setJoinedPlayers,
//         gameState,
//         setGameState,
//         handleGuess,
//         fetchNewWord,
//         resetGame,
//       }}
//     >
//       {children}
//     </GameContext.Provider>
//   );
// };

// // Hook for consuming GameContext
// export const useGameContext = () => {
//   const context = useContext(GameContext);
//   if (!context) {
//     throw new Error("useGameContext must be used within a GameProvider");
//   }
//   return context;
// };

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
import { dryrunResult, messageResult } from "@/lib/utils";

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
  // fetchNewWord: () => Promise<void>;
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
    mode:"landing",
    score: 0
  });

  // Function to fetch a new word using dryrunResult
  // const fetchNewWord = async () => {
  //   try {
  //     const { Messages, Spawns, Output, Error } = await messageResult(
  //       gameState.gameProcess,
  //       [
  //         {
  //           name: "Action",
  //           value: "Start-Game",
  //         },
  //       ]
  //     );
  //     const currentState:HangmanGameState = Messages[0].Data;
  //     console.log("currentState: ",currentState);

      // setGameState({
      //   ...gameState,
      //   word: currentState.word,
      //   guessedLetters: [],
      //   remainingAttempts: currentState.remainingAttempts,
      //   isGameOver: currentState.isGameOver,
      // });
  //     setMode("playing");
  //   } catch (error) {
  //     console.error("Error fetching word:", error);
  //   }
  // };

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
  // const resetGame = async () => {
  //   await fetchNewWord();
  // };

  // useEffect(() => {
  //   if (mode === "playing") fetchNewWord();
  // }, [mode]);

  return (
    <GameContext.Provider
      value={{
        mode,
        setMode,
        gameState,
        setGameState,
        handleGuess,
        // fetchNewWord,
        // resetGame,
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
