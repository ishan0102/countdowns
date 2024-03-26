"use client";
import { useRef } from "react";
import { createFileName, useScreenshot } from "use-react-screenshot";
import Background from "@/components/background/Background";
import Countdown from "@/components/countdown/Countdown";
import DownloadButton from "../buttons/DownloadButton";

export default function ScreenshotCanvas() {
  const [_, takeScreenshot] = useScreenshot({
    quality: 1.0,
  });
  const refSS = useRef(null);

  const download = (
    image: string,
    { name = "countdowns", extension = "png" } = {}
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadSS = () => {
    takeScreenshot(refSS.current).then(download);
  };

  return (
    <>
      <DownloadButton downloadSS={downloadSS} />
      <div
        className=" w-full h-full flex flex-col items-center justify-center"
        ref={refSS}
      >
        <Background />
        <Countdown />
      </div>
    </>
  );
}
