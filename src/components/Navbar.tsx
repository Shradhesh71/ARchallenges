"use client"

import {
  ConnectButton,
  useActiveAddress,
  useConnection,
} from "arweave-wallet-kit";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const activeAddress = useActiveAddress();
  const { connected } = useConnection();

   //  ********************************
  // The AO Backend and Frontend Integration are ongoing; the repository will be updated as soon as possible.
  // ********************************

  return (
    <header className="w-full p-4 md:px-8">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Guess & Survive</h1>
        {activeAddress && connected ? (
           <Button variant="destructive">130 Points</Button>
        ) : (
          ""
        )}
        <ConnectButton showBalance={false} />
      </nav>
    </header>
  );
}
