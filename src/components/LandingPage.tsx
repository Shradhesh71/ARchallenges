"use client";

import { Users, Clock, Trophy, Brain } from "lucide-react";
import PlayerProfile from "./PlayerProfile";
import StartGame from "./StartGame";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-between bg-background text-foreground px-6 md:px-12">
      <main className="flex-grow flex flex-col items-center justify-center text-center max-w-4xl w-full">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Think, Guess, Laugh
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
          Test your word-guessing skills in our on-chain Hangman game! 🎮🔗
          Play, compete, and challenge yourself while exploring
          blockchain-powered fun!
        </p>
        <div className="flex items-center justify-center gap-4 w-full">
          {/* <PlayerProfile /> */}
          <StartGame />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="lg">
                Multiplayer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Start Game</DialogTitle>
                <DialogDescription>
                  Start the game by Create or Join(UnRated).
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2 justify-center">
                <Dialog>
                  <DialogTrigger>
                    <Button variant="ghost" className=" bg-black/40">Create Game</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share Code</DialogTitle>
                      <DialogDescription>
                        Anyone who has this code will be able to join this.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                          Link
                        </Label>
                        <Input
                          id="link" 
                          defaultValue="shadcn"
                          readOnly
                        />
                      </div>
                      <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy />
                      </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Button type="button" variant="default">
                          Start Game
                        </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className=" bg-black/40">Join Game</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Type Code</DialogTitle>
                      <DialogDescription>
                        Type your friend code's here.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="code" className="sr-only">
                          Link
                        </Label>
                        <Input id="code" defaultValue="JDXUYBK" />
                      </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="default">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              {/* <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue="https://ui.shadcn.com/docs/installation"
                    readOnly
                  />
                </div>
                <Button type="submit" size="sm" className="px-3">
                  <span className="sr-only">Copy</span>
                  <Copy />
                </Button>
              </div> */}

              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="default">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { icon: Brain, text: "Think" },
            { icon: Users, text: "Multiplayer" },
            { icon: Clock, text: "Quick Rounds" },
            { icon: Trophy, text: "Leaderboards" },
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <feature.icon className="h-8 w-8 mb-2" />
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
