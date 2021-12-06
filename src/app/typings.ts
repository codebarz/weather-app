export enum TemperatureUnits {
  Celcius = 'metric',
  Fahrenheit = 'imperial',
}

export interface WeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface IJsonResponse<T> {
  data: T;
  status: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface ICity {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherResponse {
  city: ICity;
  list: Array<WeatherData>;
}

export interface WeatherInfo {
  title: string;
  data: Array<WeatherData>;
}

export type BarChartData = {
  time: string;
  temperature: number;
};
