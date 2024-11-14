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
    // Define the process and tags for your dryrun query
    const gameProcess = "CCtxq4831lHxSpRTaeJNuSX8FOx7A2fID4-C27mvbNA"; // Update this if needed
    const tags = [
      { name: "Action", value: "Check-Leaderboard" }
    ];

    // Perform the dryrun to fetch the leaderboard data
    const res = await dryrunResult(gameProcess, tags);
    console.log("dryrunResult: ",res);
//     dryrunResult:  
// (4) [{…}, {…}, {…}, {…}]
// 0: {name: 'currentPlayer.name', isCreator: 0, score: 0, id: 'p6bidPsrHEhGiQ4wth30my2-NMywQrQZCTheNMYdA78'}
// 1: {name: 'currentPlayer.name', isCreator: 0, score: 0, id: 'bfVoqy30rG4CfgRl4r7rYVKYkrR9D_pUWoG8n4QqXsY'}
// 2: {name: 'currentPlayer.name', isCreator: 0, score: 0, id: 'dlydDd98M6HWpvwk_v-j-qrsJrfRShAMqsz33OB_wTI'}
// 3:{name: 'currentPlayer.name', isCreator: 0, score: 0, id: '5uxxZMZewOCNDACMXKkwQ9ZOGGcbJaOfeKjMVPUKx-g'}
    // Map the result to a readable format
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
