import { ErrorOr, LoginProps, UserState, WeatherForecast } from '@/constants/types'
import { BaseService } from './base.service'

class LoginService extends BaseService {
  private static _loginService: LoginService
  private static _controller = 'Auth'
  private constructor(name: string) {
    super(name)
  }

  public static get Instance(): LoginService {
    return this._loginService || (this._loginService = new this(this._controller))
  }

  public async loginAsync(query: LoginProps): Promise<ErrorOr<UserState>> {
    const url = `Login`

    const { data } = await this.$http.post<ErrorOr<UserState>>(url, query)
    return data
  }
}

export const LoginApi = LoginService.Instance
