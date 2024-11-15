"use client";

import {
  ConnectButton,
  useActiveAddress,
  useConnection,
} from "arweave-wallet-kit";
import { Button } from "@/components/ui/button";
import { useGameContext } from "@/context/GameContext";
import { messageResult } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Navbar() {
  const activeAddress = useActiveAddress();
  const { connected } = useConnection();
  const { gameState } = useGameContext();
  const [loading, setLoading] = useState(false);
  const [playerScore, setPlayerScore] = useState(null);

  const fetchPlayerDetail = async () => {
    const tags = [{ name: "Action", value: "Get-Player-Profile" }];

    const { Messages, Spawns, Output, Error } = await messageResult(
      gameState.gameProcess,
      tags
    );
    const player = Messages[0].Data;
    const parsedPlayer = JSON.parse(player);
    setPlayerScore(parsedPlayer[0]?.score);
    setLoading(true);
  };

  useEffect(() => {
    if (gameState.gameProcess) {
      fetchPlayerDetail();
    }
  }, [gameState.gameProcess]);

  return (
    <header className="w-full p-4 md:px-8">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Guess & Survive</h1>
        {activeAddress && connected && loading ? (
          <Button variant="destructive">{playerScore} Score </Button>
        ) : (
          ""
        )}
        <ConnectButton showBalance={false} />
      </nav>
    </header>
  );
}
