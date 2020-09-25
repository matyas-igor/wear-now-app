import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'
import Container from '../../components/Container'
import Spinner from '../../components/Spinner'
import { useCitySearch } from '../../hooks/useCitySearch'
import HomeCitySearchForm from './components/HomeCitySearchForm'
import HomeCityList from './components/HomeCityList'
import { useCityStorage } from '../../hooks/useCityStorage'

const Home: React.FC = () => {
  const history = useHistory()
  const location = useLocation()

  const [cityValue, setCityValue, removeCityValue] = useCityStorage()
  const [checked, setChecked] = useState<boolean>(false)

  // Checking if city has been saved into local storage, also redirecting when saving new city
  useEffect(() => {
    if (checked && cityValue) {
      // Redirect to forecast page
      history.push(`/forecast?${queryString.stringify(cityValue)}`)
    }
    const query = queryString.parse(location.search)
    if (!checked && query.reset) {
      // Cleaning saved city
      removeCityValue()
    }
    if (!checked) {
      // Mark flag as checked
      setChecked(true)
    }
  }, [checked, cityValue])

  const { search, cities, loading, error, message } = useCitySearch()

  const select = useCallback(
    (city) => {
      setCityValue({
        city: city.components.city,
        country: city.components.country,
        flag: city.annotations.flag,
        name: city.formatted,
        lat: city.geometry.lat,
        lng: city.geometry.lng,
      })
    },
    [setCityValue]
  )

  return !checked ? (
    <Spinner />
  ) : (
    <Container small>
      <HomeCitySearchForm search={search} loading={loading} />
      <HomeCityList select={select} cities={cities} loading={loading} error={error} message={message} />
    </Container>
  )
}

export default Home
