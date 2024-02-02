import Spinner from '@/components/layout/mnSpinner'
import { ErrorOr, HubMethodEnum, WeatherForecast, WeatherInit, WeatherState } from '@/constants/types'
import { useAppDispatch, useAppSelector } from '@/hooks'
import React, { useEffect, useState } from 'react'
import WeatherTable from './WeatherTable'
import { getWeatherAsync, receiveWeather } from '@/hooks/store/dmWeatherSlice'
import { SignalRApi } from '@/api/signalr.service'

const WeatherForm = () => {
  const dispatch = useAppDispatch()
  const { isLoading, forecasts } = useAppSelector<WeatherState>((state) => state.dmWeather ?? WeatherInit)
  const [connectionId, setConnectionId] = useState<string>('')

  useEffect(() => {
    if (SignalRApi.connectionId) {
      setConnectionId(SignalRApi.connectionId)
      // Example to subscribe a method
      // SignalRApi.subscribe(HubMethodEnum.weather, true, (data) => {
      //   console.log(`the data receive:`, data)
      //   dispatch(receiveWeather(data as ErrorOr<WeatherForecast[]>))
      // })
    }
    dispatch(getWeatherAsync(true))
  }, [dispatch])

  return (
    <div className="section">
      <div className="container">
        <h3 className="title is-3">Weather Random Sample</h3>
        <div className="box container-box">
          <h3 className="title is-4">Weather Data</h3>
          <h5 className="subtitle is-5">
            This component demonstrates fetching data from the server and working with URL parameters.
            {connectionId && ` by connection ${connectionId}`}
          </h5>
          <Spinner isLoading={isLoading ?? true} />
          <WeatherTable forecasts={forecasts} />
        </div>
      </div>
    </div>
  )
}

export default WeatherForm
