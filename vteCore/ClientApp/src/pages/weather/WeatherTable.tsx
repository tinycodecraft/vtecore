import { WeatherState } from '@/constants/types';
import dayjs from 'dayjs';

type WeatherTableProps = Pick<WeatherState, 'forecasts'>;

const WeatherTable = ({ forecasts }: WeatherTableProps) => (
  <table className="table is-fullwidth">
    <thead>
      <tr>
        <th>Date</th>
        <th>Temp. (C)</th>
        <th>Temp. (F)</th>
        <th>Summary</th>
      </tr>
    </thead>
    <tbody>
      {forecasts.map((f) => (
        <tr key={f.id}>
          <td>{dayjs( f.recordDate).format('DD/MM/YYYY')}</td>
          <td>{f.temperatureC}</td>
          <td>{f.temperatureF}</td>
          <td>{f.summary}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

WeatherTable.displayName = 'ForecastTable';

export default WeatherTable;
