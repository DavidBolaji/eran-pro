'use client'
import { useEffect, useState } from 'react'
import { useAxios } from './use-axios';

const useAddress = () => {
  const [states, setStates] = useState<{ value: string; key: string }[]>([])
  const [city, setCity] = useState<{ value: string; key: string }[]>([])
  const Axios = useAxios()

  useEffect(() => {
    const fetchState = async () => {
      try {
        const req = await Axios.post('/location/states', {country: "Nigeria"})
        const format = req.data.data.map((e: any) => ({
          label: e.name,
          value: e.name,
        }))
        setStates([...format])
        return format;
      } catch (error: any) {
        console.log(error?.message)
      }
    }
    fetchState()
  }, [])

  // const fetchState = async (country:string) => {
  //   try {
  //     const req = await Axios.post('/location/states', {country})
  //     const format = req.data.data.map((e: any) => ({
  //       label: e.name,
  //       value: e.name,
  //     }))
  //     setStates([...format])
  //     return format;
  //   } catch (error: any) {
  //     console.log(error?.message)
  //   }
  // }

  const fetchCity = async (state: string) => {
    
    try {
      const req = await Axios.post('/location/cities', { state })
      const format = req.data.data.map((e: any) => ({
        label: e,
        value: e,
      }))

      setCity([...format])
      return format
    } catch (error) {
      console.log((error as Error).message)
    }
  }


  return {
    states,
    city,
    fetchCity,
    setCity
  }
}

export default useAddress
