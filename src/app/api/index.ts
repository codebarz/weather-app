import { Coordinates, WeatherResponse } from '../typings';
import request from '../utils/request';

const fetchWeather = async (coordinates: Coordinates, unit: string): Promise<WeatherResponse> => {
  const response = await request.get(`/forecast`, { params: { ...coordinates, units: unit } });
  return response.data;
};

export { fetchWeather };
