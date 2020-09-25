import useFetch from 'use-http'
import { useEffect, useState } from 'react'
import queryString from 'query-string'

const OPEN_CAGE_URL = 'https://api.opencagedata.com/geocode/v1'
const OPEN_CAGE_KEY = process.env.REACT_APP_OPEN_CAGE_KEY

export const useCitySearch = (): {
  search: (cityName?: string | null) => void
  cities: any[]
  loading: boolean
  error: Error | null
  message: string | null
} => {
  const [cities, setCities] = useState([])
  const [message, setMessage] = useState<string | null>(null)
  const [waiting, setWaiting] = useState<boolean>(false)
  const { get, response, loading, error } = useFetch(OPEN_CAGE_URL)

  const search = async (cityName?: string | null) => {
    setMessage(null)

    if (!cityName) {
      setCities([])
      return
    }

    const data = await get(`/json?${queryString.stringify({ q: cityName, key: OPEN_CAGE_KEY })}`)
    if (response.ok) {
      if (data.status.code === 200) {
        setCities(data.results)
        setMessage(null)
      } else {
        setCities([])
        setMessage(data.status.message)
      }
    }
  }

  useEffect(() => {
    if (loading) {
      setWaiting(true)
    } else {
      // Wait additional 1s to implement API calls throttling
      const timeoutId = setTimeout(() => setWaiting(false), 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [loading])

  return { search, cities, loading: loading || waiting, error, message }
}
