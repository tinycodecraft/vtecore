import { ErrorOr, WeatherForecast } from "@/constants/types";
import { BaseService } from "./base.service";

class WeatherService extends BaseService {
    private static _weatherService : WeatherService
    private static _controller = 'Sample'
    private constructor(name: string) {
        super(name)
    }

    public static get Instance() : WeatherService {
        return this._weatherService || (this._weatherService = new this(this._controller))
    }

    public async getWeatherAsync(): Promise<ErrorOr<WeatherForecast[]>> {
        const url = `GetWeathers`;
        
        const { data} = await this.$http.get<ErrorOr<WeatherForecast[]>>(url)
        return data;
    }
}

export const WeatherApi = WeatherService.Instance