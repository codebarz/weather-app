import { useQuery } from 'react-query';
import { fetchWeather } from '../api';
import { Coordinates } from '../typings';

const useGetWeatherInfo = (coordinates: Coordinates | undefined, unit: string) => {
  return useQuery(
    ['weather', coordinates, unit],
    () => coordinates && fetchWeather(coordinates, unit),
    { enabled: !!coordinates && !!unit },
  );
};

export default useGetWeatherInfo;
