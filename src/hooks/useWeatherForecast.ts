import { City } from '../helpers/types'
import useFetch from 'use-http'
import { useEffect, useState } from 'react'
import queryString from 'query-string'

const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5'
const OPEN_WEATHER_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY

const ENV = process.env.REACT_APP_ENV

export const useWeatherForecast = (
  city: City | null
): {
  data: any
  loading: boolean
  error: Error | null
} => {
  const [data, setData] = useState<any>(null)
  const [waiting, setWaiting] = useState<boolean>(false)
  const { get, response, loading, error } = useFetch(OPEN_WEATHER_URL)

  useEffect(() => {
    setData(null)
    if (city) {
      if (ENV === 'production') {
        // getting data from the server
        get(
          `/onecall?${queryString.stringify({
            lat: city.lat,
            lon: city.lng,
            appid: OPEN_WEATHER_KEY,
            units: 'metric',
            exclude: 'minutely,alerts',
          })}`
        )
          .then((data) => {
            if (response.ok) {
              setData(data)
            }
          })
          .catch((e) => console.error(e))
      } else {
        // mocking with example of data
        setWaiting(true)
        import('../fixtures/berlin')
          .then((data: any) => {
            setData(data.default)
          })
          .finally(() => {
            setWaiting(false)
          })
          .catch((e) => console.error(e))
      }
    }
  }, [city])

  return { data, loading: loading || waiting, error }
}
