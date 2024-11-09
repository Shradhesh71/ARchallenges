import { useGameContext } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { dryrunResult, messageResult } from "@/lib/utils";

export default function JoinWaiting() {
  const { setMode, gameState } = useGameContext();

  //  ********************************
  // The AO Backend and Frontend Integration are ongoing; the repository will be updated as soon as possible.
  // ********************************

  const handlePlayNow = async () => {
    console.log("Button clicked");

    if (gameState) {
      // if (currentPlayer) {
      //   console.log("Current player:", currentPlayer);

      // Wait for the player registration message to be sent to the AO process
      const { Messages, Spawns, Output, Error } = await messageResult(
        gameState.gameProcess,
        [
          {
            name: "Action",
            value: "Register-Player",
          },
          {
            name: "DisplayName",
            value: "currentPlayer.name",
          },
        ]
      );

      if (Messages[0].Data === "Successfully registered to game.") {
        toast({
          title: "Successfully registered.",
          description: "Waiting for other players to join.",
        });

        //   setJoinedPlayers([...joinedPlayers, currentPlayer]);
        setMode("playing");
      } else if (Messages[0].Data === "You are already registered.") {
        toast({
          // title: "Player already registered.",
          // description: "Please wait for other players to join.",
          title: "Player Successfully registered.",
          description: "Your Game is Start now!",
        });

        //   setJoinedPlayers([...joinedPlayers, currentPlayer]);
      } else return;

      const userRes = await dryrunResult(gameState.gameProcess, [
        {
          name: "Action",
          value: "Joined-Players",
        },
      ]);

      console.log("Joined users result", userRes);
      if (
        userRes.some(
          (user: { id: string; isCreator: number }) =>
            user.id === user.id && user.isCreator === 1
          // user.id === currentPlayer.id && user.isCreator === 1
        )
      ) {
        // currentPlayer.isCreator = true;
      }
      //   setJoinedPlayers(userRes);
      setTimeout(() => {
        setMode("playing");
      }, 1000);
    } else {
      toast({
        title: "Please login to play.",
        description: "Click on the connect button at the top.",
      });
    }
  };

  return (
    <Button size="lg" className="w-full sm:w-auto" onClick={handlePlayNow}>
      Play Now
    </Button>
  );
}
