"use client";

import {
  ConnectButton,
  useActiveAddress,
  useConnection,
} from "arweave-wallet-kit";
import { Button } from "@/components/ui/button";
import { useGameContext } from "@/context/GameContext";
import { dryrunResult } from "@/lib/utils";
import { useEffect } from "react";

export default function Navbar() {
  const activeAddress = useActiveAddress();
  const { connected } = useConnection();
  const { mode, setMode, gameState, handleGuess, setGameState } =
    useGameContext();
  const fetchPlayerDetail = async () => {
    console.log("Fetching player detail...");
    const player = await dryrunResult("CCtxq4831lHxSpRTaeJNuSX8FOx7A2fID4-C27mvbNA", [
      {
        name: "Action",
        value: "Get-Player-Profile",
      },
    ]);

    console.log("player: ", player);
  };

  useEffect(() => {
    if (gameState.gameProcess) {
      fetchPlayerDetail();
    }
  }, [gameState.gameProcess]);

  //  ********************************
  // The AO Backend and Frontend Integration are ongoing; the repository will be updated as soon as possible.
  // ********************************

  return (
    <header className="w-full p-4 md:px-8">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Guess & Survive</h1>
        {activeAddress && connected ? (
          <Button variant="destructive">{gameState.guessedLetters}</Button>
        ) : (
          ""
        )}
        <ConnectButton showBalance={false} />
      </nav>
    </header>
  );
}
