"use client"

import { useCountdown } from "@/hooks/CountdownContext"
import { useEffect, useState } from "react"
import Draggable from "react-draggable"

export default function Countdown() {
  const { date: until, timezone, description, style } = useCountdown()

  const [fractionalTime, setFractionalTime] = useState<number>(
    daysUntilFractional(until, timezone)
  )

  const [traditionalTime, setTraditionalTime] = useState<string>()

  useEffect(() => {
    const updateFactional = setInterval(() => {
      setFractionalTime(daysUntilFractional(until, timezone))
    }, 100)

    const updateTraditional = setInterval(() => {
      const { days, hours, minutes, seconds } = daysUntilTraditional(
        until,
        timezone
      )
      setTraditionalTime(`${days}d ${hours.toString().padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`)
    }, 100)

    return () => {
      clearInterval(updateFactional)
      clearInterval(updateTraditional)
    }
  }, [until, timezone])

  return (
    <Draggable bounds="parent">
      <div className="text-center p-2 md:p-8 w-fit hover:border-1 hover:rounded-lg hover:cursor-move">
        <div className="text-5xl md:text-8xl text-white font-bold font-apple2mono">
          {style === "fractional" && (
            <>
              <span suppressHydrationWarning>
                {fractionalTime.toString().split(".")[0]}
              </span>
              <span
                className="text-2xl md:text-4xl text-neutral-200 text-opacity-75 font-normal -ml-2 md:-ml-4"
                suppressHydrationWarning
              >
                .
                {fractionalTime.toString().split(".")[1].padEnd(6, "0") ||
                  "000000"}
              </span>
            </>
          )}

          {style === "traditional" && (
            <div className="flex gap-2 items-baseline">
              <span className="text-4xl md:text-6xl mr-4" suppressHydrationWarning>
                {traditionalTime?.split(" ")[0]}
              </span>
              <span
                className="text-2xl md:text-4xl -ml-3 md:-ml-4 text-neutral-200 text-opacity-75"
                suppressHydrationWarning
              >
                {traditionalTime?.split(" ")[1]}
              </span>
              <span
                className="text-2xl md:text-4xl -ml-3 md:-ml-0 text-neutral-200 text-opacity-75"
                suppressHydrationWarning
              >
                {traditionalTime?.split(" ")[2]}
              </span>
              <span
                className="text-2xl md:text-4xl -ml-3 md:-ml-0 text-neutral-200 text-opacity-75"
                suppressHydrationWarning
              >
                {traditionalTime?.split(" ")[3]}
              </span>
            </div>
          )}
        </div>

        {description && (
          <span className="text-md md:text-2xl text-neutral-400 text-opacity-75 font-apple2mono">
            {style === "fractional" && "days"} {until < new Date() ? "since" : "till"} {description}
          </span>
        )}
      </div>
    </Draggable>
  )
}

function daysUntilTraditional(until: Date, timezone: string) {
  const timeDifference =
    until.getTime() - getTimezoneOffset(until, timezone) - new Date().getTime()

  const days = Math.abs(Math.floor(timeDifference / (1000 * 60 * 60 * 24)))
  const hours = Math.abs(Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  ))
  const minutes = Math.abs(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)))
  const seconds = Math.abs(Math.floor((timeDifference % (1000 * 60)) / 1000))

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

function getTimezoneOffset(until: Date, timezone: string) {
  const userTimezoneOffset = new Date().getTimezoneOffset() * 60 * 1000
  const targetDate = new Date(
    until.toLocaleString("en-US", { timeZone: timezone })
  )
  const timeDifference =
    targetDate.getTime() - until.getTime() - userTimezoneOffset
  return timeDifference
}

function daysUntilFractional(until: Date, timezone: string) {
  const timeDifference =
    until.getTime() - getTimezoneOffset(until, timezone) - new Date().getTime()
  const daysFraction = timeDifference / (1000 * 60 * 60 * 24)
  return Math.abs(Math.round(daysFraction * 1e6) / 1e6)
}
