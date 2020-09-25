import * as React from 'react'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import Container from '../components/Container'

type CityStorage = {
  name: string
  flag: string
  position: { lat: number; lng: number }
} | null

const Home: React.FC = () => {
  const [value, setValue, remove] = useLocalStorage<CityStorage>('city', null, {
    raw: false,
    serializer: (value: CityStorage) => JSON.stringify(value),
    deserializer: (value: string) => (value ? (JSON.parse(value) as CityStorage) : null),
  })
  const [checked, setChecked] = useState<boolean>(false)

  // Checking if city has been saved in local storage
  useEffect(() => {
    if (value) {
    } else {
      setChecked(true)
    }
  }, [value])

  return <Container>home</Container>
}

export default Home
