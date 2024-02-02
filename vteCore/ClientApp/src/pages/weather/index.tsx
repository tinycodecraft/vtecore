import Spinner from '@/components/layout/mnSpinner'
import { HubMethodEnum, WeatherInit, WeatherState } from '@/constants/types'
import { useAppDispatch, useAppSelector } from '@/hooks'
import React, { useEffect } from 'react'
import WeatherTable from './WeatherTable'
import { getWeatherAsync } from '@/hooks/store/dmWeatherSlice'
import { SignalRApi } from '@/api/signalr.service'
import { canWait } from '@/utils/methods'

const WeatherForm = () => {
  const dispatch = useAppDispatch()
  const { isLoading, forecasts } = useAppSelector<WeatherState>((state) => state.dmWeather ?? WeatherInit)

  useEffect(() => {
    async function invokeMe() {
      console.log(`the dispatch happens!`)
      SignalRApi.subscribe(HubMethodEnum.weather, true)
      await canWait(1000)
      dispatch(getWeatherAsync(true))
    }
    invokeMe()
  }, [dispatch])

  return (
    <div className="section">
      <div className="container">
        <h3 className="title is-3">Weather Random Sample</h3>
        <div className="box container-box">
          <h3 className="title is-4">Weather Data</h3>
          <h5 className="subtitle is-5">
            This component demonstrates fetching data from the server and working with URL parameters.
          </h5>
          <Spinner isLoading={isLoading ?? true} />
          <WeatherTable forecasts={forecasts} />
        </div>
      </div>
    </div>
  )
}

export default WeatherForm
