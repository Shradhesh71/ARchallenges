"use client";

import { Pencil, Users, Clock, Trophy, Brain } from "lucide-react";
import PlayerProfile from "./PlayerProfile";
import StartGame from "./StartGame";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-between bg-background text-foreground px-6 md:px-12">
      <main className="flex-grow flex flex-col items-center justify-center text-center max-w-4xl w-full">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Think, Guess, Laugh
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
          Test your word-guessing skills in our on-chain Hangman game! 🎮🔗 Play, compete, and challenge yourself while exploring blockchain-powered fun!
        </p>
        <div className="flex items-center justify-center gap-4 w-full">
          <PlayerProfile />
          <StartGame/>
          
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