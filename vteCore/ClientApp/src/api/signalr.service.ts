import { ErrorOr, HubMethodEnum, RESULT_BROKER_URL, UnsubscribeFunc, WeatherForecast } from '@/constants/types'
import { getSignalRConnection, startSignalRConnection } from '@/utils/signalr'
import { HubConnection, HubConnectionState } from '@microsoft/signalr'
import { waitForHubInfo, receiveHubInfo } from '@/hooks/store/dmHubSlice'
import { receiveWeather } from '@/hooks/store/dmWeatherSlice'
import { toast } from 'react-toastify'
import { canWait } from '@/utils/methods'

class SignalRService {
  private static _signalRService: SignalRService
  private _hubConnection: HubConnection
  private _connectionId: string | undefined
  private constructor() {
    waitForHubInfo()
    this._hubConnection = getSignalRConnection(`${RESULT_BROKER_URL}`)
    if (this._hubConnection && this._hubConnection.connectionId) {
      this._connectionId = this._hubConnection.connectionId
      receiveHubInfo(this._connectionId)
    }
  }
  get signalrState(): HubConnectionState {
    return this._hubConnection.state
  }
  get connectionId(): string | undefined {
    console.assert(this._connectionId !== undefined)
    return this._connectionId
  }

  public static get Instance(): SignalRService {
    return this._signalRService || (this._signalRService = new this())
  }
  public async initConnection(): Promise<void> {
    try {
      if (this._hubConnection.state !== HubConnectionState.Connected) {
        await startSignalRConnection(this._hubConnection)
      }
      console.log(`the hubconnection`, this._hubConnection)
    } catch (e) {
      console.error(e)
    }
  }
  public async subscribe(method: string, debug?: boolean): Promise<UnsubscribeFunc> {
    const conn = this._hubConnection

    if (conn.state !== HubConnectionState.Connected) {
      await conn.start()
      await canWait(2000)
    }

    conn.off('subscribed')
    conn.on('subscribed', (response: string) => {
      console.log(response)
      if (debug) {
        toast.success(response)
      }
    })
    conn.off(method)
    conn.on(method, (data: ErrorOr<any>) => {
      switch (method) {
        case HubMethodEnum.weather:
          if (debug) {
            console.log(`weather method call`, data)
          }
          receiveWeather(data as ErrorOr<WeatherForecast[]>)
      }
    })
    await conn.invoke('subscribe', method)

    return () => {
      conn.invoke('unsubscribe').then(() => {
        conn.off('subscribed')
        conn.off(method)

        console.log(`unsubscribe method ${method}`)
        if (debug) {
          toast(`unsubscribe method ${method}`)
        }
      })
    }
  }
}

export const SignalRApi = SignalRService.Instance
