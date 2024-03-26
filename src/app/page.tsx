"use client";

import DonateButton from "@/components/buttons/DonateButton";
import GitHubButton from "@/components/buttons/GitHubButton";
import ShareButton from "@/components/buttons/ShareButton";
import ScreenshotCanvas from "@/components/screenshotCanvas/ScreenshotCanvas";

import Settings from "@/components/settings/Settings";
import { CountdownProvider } from "@/hooks/CountdownContext";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <CountdownProvider>
        <ScreenshotCanvas />
        <Settings />
        <DonateButton />
        <GitHubButton />
        <ShareButton />
      </CountdownProvider>
    </main>
  );
}
