import { ErrorOr, FormPostState, LoginProps, MantineTableProps, TokenProps, UserData, UserListResult, UserState, WeatherForecast } from '@/constants/types'
import { BaseService } from './base.service'
import {get} from '@/utils/http'

class LoginService extends BaseService {
  private static _loginService: LoginService
  private static _controller = 'Auth'
  private constructor(name: string) {
    super(name)
  }

  public static get Instance(): LoginService {
    return this._loginService || (this._loginService = new this(this._controller))
  }

  public async refreshTokenAsync(query: TokenProps): Promise<ErrorOr<TokenProps>> {
    const url = 'Token'
    const { data } = await this.$http.post<ErrorOr<TokenProps>>(url, query)
    return data
  }

  public async getAsync(id: string): Promise<ErrorOr<UserData>>{
    const url = 'GetModel';
    const {data} = await this.$wAuthHttp.get<ErrorOr<UserData>>(url, {params: { id}})
    return data;
  }

  public async listAsync(query: MantineTableProps): Promise<ErrorOr<UserListResult>> {
    const url = `List`
    const { data} = await this.$wAuthHttp.post<ErrorOr<UserListResult>>(url,query)
    return data;
  }

  public async changePasswdAsync(query: LoginProps): Promise<ErrorOr<FormPostState>> {
    const url = `ChangePassword`
    const { data } = await this.$wAuthHttp.post<ErrorOr<FormPostState>>(url, query)
    return data
  }

  public async loginAsync(query: LoginProps): Promise<ErrorOr<UserState>> {
    const url = `Login`

    const { data } = await this.$http.post<ErrorOr<UserState>>(url, query)
    return data
  }
}

export const LoginApi = LoginService.Instance
