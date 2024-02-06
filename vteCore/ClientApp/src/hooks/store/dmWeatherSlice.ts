import { WeatherApi } from '@/api/weather.service'
import { ErrorOr, WeatherForecast, WeatherInit, WeatherState } from '@/constants/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/hooks'
import { toast } from 'react-toastify'

export const dmWeatherSlice = createSlice({
  name: 'dmWeather',
  initialState: WeatherInit,
  reducers: {
    requestWeather: (state, action: PayloadAction<WeatherState>) => {
      const load = action.payload
      if (load) {
        state.isLoading = load.isLoading
        state.forecasts = load.forecasts
        state.debug = load.debug
      } else {
        state.isLoading = true
        state.forecasts = []
      }
    },
    receiveWeather: (state, action: PayloadAction<ErrorOr<WeatherForecast[]>>) => {
      state.isLoading = false
      const load = action.payload
      console.log(action.payload)
      if (load) {
        if ((load.isError || !load.value) && state.debug && !load.errors?.length) {
          toast(`Weather Forecast getting error: ${load.errors[0]}`)
        }
        state.forecasts = load.value ?? []
      }
    },
  },
})

// export const getWeatherAsync = createAsyncThunk('dmWeather/getAsync', async ({}, { dispatch, getState }) => {})

export const getWeatherAsync = createAsyncThunk(
  'dmWeather/getAsync',
  async (debug: boolean, { dispatch, getState }) => {
    const {
      dmHub: { token: accessToken, refreshToken: renewToken },
    } = (getState as () => RootState)()
    console.log(`weather async thunk! with token ${accessToken} + renew ${renewToken}`)

    console.log(`starting the get weather thunk with debug =  ${debug}`)
    try {
      if (accessToken) {
        WeatherApi.token = accessToken
      }
      if (renewToken) {
        WeatherApi.refreshToken = renewToken
      }
      dispatch(requestWeather(WeatherInit))
      const payload = await WeatherApi.getWeatherAsync()

      dispatch(receiveWeather(payload))
    } catch (e) {
      if (debug && e) {
        toast(`error on Weather get: ${JSON.stringify(e)}`)
      }

      console.error(e)
    }
  },
)

export const { requestWeather, receiveWeather } = dmWeatherSlice.actions

export default dmWeatherSlice.reducer
