import { ErrorOr, LabelDetail, WeatherForecast } from "@/constants/types";
import { BaseService } from "./base.service";

class LabelService extends BaseService {
    private static _labelService : LabelService
    private static _controller = 'Sample'
    private constructor(name: string) {
        super(name)
    }

    public static get Instance() : LabelService {
        return this._labelService || (this._labelService= new this(this._controller))
    }

    public async getLabelsAsync(type: string): Promise<ErrorOr<LabelDetail[]>>{
        const url = 'GetLabels';
        const {data} = await this.$wAuthHttp.get<ErrorOr<LabelDetail[]>>(url, {params: { type}})
        return data;
      }

}

export const LabelApi = LabelService.Instance