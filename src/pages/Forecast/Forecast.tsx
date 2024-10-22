import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import Container from '../../components/Container'
import { City } from '../../helpers/types'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { useWeatherForecast } from '../../hooks/useWeatherForecast'
import { Text } from 'rebass/styled-components'
import Spinner from '../../components/Spinner'
import ForecastMainInfo from './components/ForecastMainInfo'
import ForecastHourlyInfo from './components/ForecastHourlyInfo'
import ForecastAdditionalInfo from './components/ForecastAdditionalInfo'
import { getPlantMessages } from '../../helpers/plants'
import { getClothesMessages } from '../../helpers/clothes'

const Forecast: React.FC = () => {
  const location = useLocation()
  const [city, setCity] = useState<City | null>(null)

  // Getting city properties
  useEffect(() => {
    if (location.pathname === '/forecast') {
      const data = queryString.parse(location.search)
      setCity({
        city: (data.city as string) || '',
        country: (data.country as string) || '',
        name: (data.name as string) || '',
        flag: (data.flag as string) || '',
        lat: parseFloat((data.lat as string) || '') || 0,
        lng: parseFloat((data.lng as string) || '') || 0,
      })
    } else {
      setCity(null)
    }
  }, [location])

  // Loading forecast data  about city
  const { loading, data, error } = useWeatherForecast(city)

  const dataHourly = useMemo(
    // We're taking 23 items in the future with more than 5 mins from now
    () => (data ? data.hourly.filter((hourlyData: any) => hourlyData.dt - data.current.dt >= 5 * 60).slice(0, 23) : []),
    [data]
  )
  const dataDaily = useMemo(
    // We're taking 6 items in the future with more than 15 mins from now
    () => (data ? data.daily.filter((dailyData: any) => dailyData.dt - data.current.dt >= 15 * 60).slice(0, 6) : []),
    [data]
  )

  // Plants & clothes recommendations
  const plantMessages = data ? getPlantMessages(data) : []
  const clothesMessages = data ? getClothesMessages(data) : []

  return loading ? (
    <Spinner />
  ) : city && data ? (
    <>
      <ForecastMainInfo mt={5} dataCurrent={data.current} city={city} timezone={data.timezone} />
      <ForecastHourlyInfo
        mt={[4, null, 5]}
        dataCurrent={data.current}
        dataHourly={dataHourly}
        timezone={data.timezone}
      />
      <ForecastAdditionalInfo
        mt={[5, null, 6]}
        mb={5}
        dataCurrent={data.current}
        dataDaily={dataDaily}
        timezone={data.timezone}
        plantMessages={plantMessages}
        clothesMessages={clothesMessages}
      />
    </>
  ) : error ? (
    <Container>
      <Text fontSize={[2, null, 3]} color="red">
        {error.message}
      </Text>
    </Container>
  ) : (
    <Container>
      <Text fontSize={[2, null, 3]} color={'#aaa'}>
        Forecast will be displayed here
      </Text>
    </Container>
  )
}

export default Forecast
