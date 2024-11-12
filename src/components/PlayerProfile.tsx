"use client";

import { useGameContext } from "@/context/GameContext";
import { createDataItemSigner, dryrun } from "@permaweb/aoconnect";
import { useActiveAddress, useConnection } from "arweave-wallet-kit";
import { useEffect } from "react";

export default function PlayerProfile() {
  // const { currentPlayer, setCurrentPlayer } = useGameContext();
  const activeAddress = useActiveAddress();
  const { connected } = useConnection();

  //  ********************************
  // The AO Backend and Frontend Integration are ongoing; the repository will be updated as soon as possible.
  // ********************************

  const fetchPlayerProfile = async () => {
    if (!activeAddress) {
      console.error("No active address found");
      return;
    }

    console.log("Fetching player profile for:", activeAddress);

    try {
      // Step 1: Fetch Profile ID
      const profileIdRes = await dryrun({
        process: "CCtxq4831lHxSpRTaeJNuSX8FOx7A2fID4-C27mvbNA",
        tags: [{ name: "Action", value: "Get-Profiles-By-Delegate" }],
        signer: createDataItemSigner(window.arweaveWallet),
        data: JSON.stringify({ Address: activeAddress }),
      });

      console.log("Raw profile ID response:", profileIdRes);

      // Check if Messages array is empty
      if (!profileIdRes.Messages || profileIdRes.Messages.length === 0) {
        console.warn("No messages found in response. Checking Output field.");
        console.log("Output data:", profileIdRes.Output?.data);
        return;
      }
      console.log("Raw profile ");
      const profileIdData = JSON.parse(profileIdRes.Messages[0].Data);
      console.log("Profile ID data:", profileIdData);

      if (!profileIdData || !profileIdData[0]?.ProfileId) {
        console.error("Profile ID not found:", profileIdData);
        return;
      }

      // Step 2: Fetch Player Profile Info
      const profileRes = await dryrun({
        process: profileIdData[0].ProfileId,
        tags: [{ name: "Action", value: "Info" }],
        data: "",
      });

      console.log("Raw profile response:", profileRes);

      const profileData = profileRes.Messages?.[0]?.Data
        ? JSON.parse(profileRes.Messages[0].Data)
        : {};

      console.log("Fetched profile data:", profileData);

      const playerDetails = {
        id: activeAddress,
        name: profileData?.Profile?.DisplayName || "ANON",
        score: 0,
        bazarId: profileIdData[0].ProfileId,
      };

      console.log("Player profile details:", playerDetails);
      // setCurrentPlayer(playerDetails);
    } catch (error) {
      console.error("Error fetching player profile:", error);
    }
  };

  useEffect(() => {
    if (connected && activeAddress) {
      fetchPlayerProfile();
    }
  }, [connected, activeAddress]);

  return (
    <div className="text-2xl font-bold text-red-400">
      {/* {currentPlayer ? <p>{currentPlayer.name}</p> : <p>Shradhesh</p>} */}
    </div>
  );
}
