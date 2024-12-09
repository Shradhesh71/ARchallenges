import { HangmanGameState } from "@/context/GameContext";
import { toast } from "@/hooks/use-toast";
import {
  createDataItemSigner,
  dryrun,
  message,
  result,
} from "@permaweb/aoconnect";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function dryrunResult(
  gameProcess: string,
  tags: { name: string; value: string }[]
) {
  const res = await dryrun({
    process: gameProcess,
    tags,
  }).then((res) => JSON.parse(res.Messages[0].Data));

  return res;
}

export async function messageResult(
  gameProcess: string,
  tags: { name: string; value: string }[],
  data?: any
) {
  const res = await message({
    process: gameProcess,
    signer: createDataItemSigner(window.arweaveWallet),
    tags,
    data,
  });

  let { Messages, Spawns, Output, Error } = await result({
    message: res,
    process: gameProcess,
  });

  console.dir(
    { Messages, Spawns, Output, Error },
    { depth: Infinity, colors: true }
  );

  return { Messages, Spawns, Output, Error };
}

export async function fetchLeaderboard() {
  try {
    const gameProcess = "CCtxq4831lHxSpRTaeJNuSX8FOx7A2fID4-C27mvbNA";
    // const gameProcess = "40yZY0aeTTOmkGqqRPH-jAT26acBfyClVgodD_9fTu4";
    const tags = [{ name: "Action", value: "Check-Leaderboard" }];

    // Perform the dryrun to fetch the leaderboard data
    const res = await dryrunResult(gameProcess, tags);
    console.log("dryrunResult: ", res);

    const players = res.map((item: any) => ({
      id: item.id,
      name: item.name,
      score: item.score,
    }));

    return players;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
}

export async function handleGameOver(playerWon: boolean, activeAddress: any) {
  try {
    const score = playerWon ? 10 : 0;
    console.log("Attempting to update score with data:", {
      playerId: activeAddress,
      score: score,
    });
    console.log(
      "gameState.gameProcess: ",
      "CCtxq4831lHxSpRTaeJNuSX8FOx7A2fID4-C27mvbNA"
    );

    const { Messages, Spawns, Output, Error } = await messageResult(
      "CCtxq4831lHxSpRTaeJNuSX8FOx7A2fID4-C27mvbNA",
      [
        {
          name: "Action",
          value: "Update-Score",
        },
        {
          name: "score",
          value: score.toString(),
        },
      ]
    );

    console.log("Game Over - Score Update", { Messages, Output, Error });
    console.log("Data: ", Messages[0].Data);
    await aoplay(playerWon);
    if (Error) {
      console.error("Error updating score:", Error);
    } else {
      console.log("Score updated successfully.");
    }
  } catch (error) {
    console.error("Failed to send score update:", error);
  }
}

export async function aoplay(playerWon: boolean) {
  try {
    const score = playerWon ? 10 : 0;
    console.log(
      "gameState.gameProcess: ",
      "40yZY0aeTTOmkGqqRPH-jAT26acBfyClVgodD_9fTu4"
    );

    const { Messages, Spawns, Output, Error } = await messageResult(
      "40yZY0aeTTOmkGqqRPH-jAT26acBfyClVgodD_9fTu4",
      [
        {
          name: "Action",
          value: "Update-Points",
        },
        {
          name: "point",
          value: score.toString(),
        }
        // {
        //   name: "game",
        //   value: "Guess & Survive",
        // },
      ]
    );

    console.log("Game Over - Points Update", { Messages, Output, Error });
    console.log("Data: ", Messages[0].Data);
    if (Error) {
      console.error("Error updating Points:", Error);
    } else {
      console.log("Points updated successfully.");
    }
  } catch (error) {
    console.error("Failed to send Points update:", error);
  }
}

export async function getHint(
  gameState: HangmanGameState
): Promise<string | null> {
  const word = gameState.word;
  const guessedLetters: string[] = gameState.guessedLetters;
  const wordArray = word.split("");

  const unguessedLetters = wordArray.filter(
    (char) => !guessedLetters.includes(char)
  );

  if (unguessedLetters.length === 0) {
    toast({
      title: "No hint available.",
      description: "You have guessed all the letters.",
      variant: "destructive",
    });
    return null;
  }

  const randomIndex = Math.floor(Math.random() * unguessedLetters.length);
  const hintLetter = unguessedLetters[randomIndex];

  return hintLetter;
}

export async function hintScore(
  gameState: HangmanGameState
): Promise<string | null> {
  const { Messages, Spawns, Output, Error } = await messageResult(
    "CCtxq4831lHxSpRTaeJNuSX8FOx7A2fID4-C27mvbNA",
    [
      {
        name: "Action",
        value: "Hint-Score",
      },
    ]
  );
  console.log("Data: ", Messages[0].Data);
  if (Error) {
    console.error("Error updating score:", Error);
    return null;
  } else if (Messages[0].Data === "Insufficient score.") {
    console.log("Insufficient score.");

    toast({
      title: "Insufficient score.",
      description: "You have at least 2 score.",
      variant: "destructive",
    });
    return null;
  } else {
    console.log("Score deducted successfully.");

    const hint = await getHint(gameState);
    return hint;
  }
}
