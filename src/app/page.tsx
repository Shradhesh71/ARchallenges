"use client";

import { useGameContext } from "@/context/GameContext";
import { useConnection } from "arweave-wallet-kit";
import dynamic from "next/dynamic";

// Dynamically import the different components based on the game mode
const LandingPage = dynamic(() => import("@/components/LandingPage"), {
  ssr: false,
});
const HangmanGame = dynamic(() => import("@/components/HangmanGame"), {
  ssr: false,
});
const GameOver = dynamic(() => import("@/components/GameOver"), { ssr: false });

export default function HangmanApp() {
  const { mode, setMode } = useGameContext();
  const { connected } = useConnection();

  if (!connected) {
    setMode("landing");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {mode === "landing" && <LandingPage />}
      {mode === "playing" && <HangmanGame />}
      {mode === "gameOver" && <GameOver />}
    </div>
  );
}
