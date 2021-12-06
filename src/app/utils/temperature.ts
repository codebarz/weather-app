import { WeatherInfo } from '../typings';

export const calculateAverageTemperature = (data: WeatherInfo): number => {
  const sum = data.data.reduce((acc, curr) => acc + curr.main.temp, 0);
  return Math.round(sum / data.data.length);
};
