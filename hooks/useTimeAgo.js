import { useState, useEffect } from "react"
import { formatDate } from "./useDateFormat"

const isRelativeTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.RelativeTimeFormat

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const times = (unit) => {
  if (unit === "second") return 1000
  if (unit === "minute") return 60000
  if (unit === "hour") return 3600000

  return 3600000
}

const getDateDifs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.floor(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDifs(timestamp))

  useEffect(() => {
    if (isRelativeTimeFormatSupported) {
      const interval = setInterval(() => {
        const newTimeAgo = getDateDifs(timestamp)
        setTimeAgo(newTimeAgo)
      }, times(unit))

      return () => clearInterval(interval)
    }
  }, [timestamp])

  if (!isRelativeTimeFormatSupported) {
    return formatDate(timestamp)
  }

  const rtf = new Intl.RelativeTimeFormat("es", {
    style: "long",
  })

  const { value, unit } = timeAgo

  return rtf.format(value, unit)
}
