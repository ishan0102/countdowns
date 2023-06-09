// pages/[slug].js
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const getNextOccurrence = (month, day) => {
  const now = new Date()
  const next = new Date(now.getFullYear(), month - 1, day)
  if (now.getTime() > next.getTime()) {
    next.setFullYear(now.getFullYear() + 1)
  }
  return next.toISOString().split('T')[0]
}

const routeKeys = {
  'nye': 'newYears',
  'newyear': 'newYears',
  'newyears': 'newYears',
  'halloween': 'halloween',
  'christmas': 'christmas',
  'xmas': 'christmas',
  'valentines': 'valentines',
}

const routeConfigs = {
  'newYears': {
    date: getNextOccurrence(1, 1),
    time: '00:00',
    desc: 'new year\'s day',
    style: 'fractional',
    bg: 'forest.gif',
  },
  'halloween': {
    date: getNextOccurrence(10, 31),
    time: '00:00',
    desc: 'halloween',
    style: 'fractional',
    bg: 'bedroom.gif',
  },
  'christmas': {
    date: getNextOccurrence(12, 25),
    time: '00:00',
    desc: 'christmas day',
    style: 'fractional',
    bg: 'castle.gif',
  },
  'valentines': {
    date: getNextOccurrence(2, 14),
    time: '00:00',
    desc: 'valentine\'s day',
    style: 'fractional',
    bg: 'star.png',
  },
}

export default function DynamicPage() {
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    const routeKey = routeKeys[slug]
    const routeConfig = routeConfigs[routeKey]

    if (routeConfig) {
      const queryString = Object.keys(routeConfig)
        .map(key => `${key}=${encodeURIComponent(routeConfig[key])}`)
        .join('&')
      router.push(`/?${queryString}`)
    } else {
      // Redirect to home or 404 page
      router.push('/')
    }
  }, [slug])

  return null
}
