import { useGameContext } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { messageResult } from "@/lib/utils";

export default function JoinWaiting() {
  const { setMode, gameState } = useGameContext();

  const handlePlayNow = async () => {
    console.log("Button clicked");
    if (gameState) {
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

      if (Messages[0].Data === "Successfully registered.") {
        toast({
          title: "Successfully registered.",
          description: "Start your game now.",
        });

        setMode("playing");
      } else if (Messages[0].Data === "You are already registered.") {
        toast({
          title: "Player Game Start.",
          description: "Your Game are Start Now.",
        });

        setMode("playing");
      } else {
        console.log("You are in else", Error);
        toast({
          title: "Error in Play Now button!",
          description: `Error: ${Error}`,
        });
      }
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
