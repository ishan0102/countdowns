"use client";

import Background from "@/components/background/Background";
import DonateButton from "@/components/buttons/DonateButton";
import GitHubButton from "@/components/buttons/GitHubButton";
import ShareButton from "@/components/buttons/ShareButton";
import Countdown from "@/components/countdown/Countdown";
import Settings from "@/components/settings/Settings";
import { CountdownProvider } from "@/hooks/CountdownContext";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <CountdownProvider>
        <Background />
        <Countdown />
        <Settings />
        <DonateButton />
        <GitHubButton />
        <ShareButton />
      </CountdownProvider>
    </main>
  );
}
