import { useLocalStorage } from 'react-use'
import { City } from '../helpers/types'
import { Dispatch, SetStateAction } from 'react'

export const useCityStorage = (): [
  City | null | undefined,
  Dispatch<SetStateAction<City | null | undefined>>,
  () => void
] => {
  const [value, setValue, remove] = useLocalStorage<City | null>('city', null, {
    raw: false,
    serializer: (value: City | null) => (value ? JSON.stringify(value) : ''),
    deserializer: (value: string) => (value ? (JSON.parse(value) as City) : null),
  })
  return [value, setValue, remove]
}
