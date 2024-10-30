'use client'
import { Axios } from '@/request/request'
import { useEffect, useState } from 'react'

const useCountry = () => {

  const [countries, setCountries] = useState<{ value: string; label: string }[]>([])
  const [states, setStates] = useState<{ value: string; label: string }[]>([])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setCountries([{ label: "Nigeria", value: "Nigeria"}])
      } catch (error: any) {
        console.log(error?.message)
      }
    }
    fetchCountries()
  }, [])

  const fetchStates = async (country: string) => {
    if(!country) return;

    try {
      const req = await Axios.post('/location/states', { country })
   
      const format = req.data.data.map((e: any) => ({
        label: e.name,
        value: e.name,
      }))

      setStates([...format])
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  return {
    countries,
    states,
    fetchStates,
    setStates
  }
}

export default useCountry
