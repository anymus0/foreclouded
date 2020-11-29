export interface WeatherData {
  lastUpdated: Date;
  temp: number;
  weather: Weather;
  hourly: Array<HourlyReport>;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface HourlyReport {
  time: Date;
  temp: number;
  weather: Weather;
}
