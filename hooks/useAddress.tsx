'use client'
import { Axios } from '@/request/request'
import { useState } from 'react'

const useAddress = () => {
  const [states, setStates] = useState<{ value: string; key: string }[]>([])
  const [city, setCity] = useState<{ value: string; key: string }[]>([])

  const fetchState = async (country:string) => {
    try {
      const req = await Axios.post('/location/states', {country})
      const format = req.data.data.map((e: any) => ({
        label: e.name,
        value: e.name,
      }))
      setStates([...format])
    } catch (error: any) {
      console.log(error?.message)
    }
  }

  const fetchCity = async (state: string) => {
    
    try {
      const req = await Axios.post('/location/cities', { state })
      const format = req.data.data.map((e: any) => ({
        label: e,
        value: e,
      }))

      setCity([...format])
    } catch (error) {
      console.log((error as Error).message)
    }
  }


  return {
    states,
    city,
    fetchCity,
    fetchState,
    setCity
  }
}

export default useAddress
