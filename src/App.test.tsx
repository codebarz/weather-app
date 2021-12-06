import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as weatherUtils from './app/api';
import { City, WeatherData } from './app/typings';
import CardSlider from './app/components/CardSlider';
import Layout from './app/components/Layout';
import TemperatureUnitForm from './app/components/TemperatureUnitForm';

jest.mock('./app/api');

const mockData = {
  city: {
    id: 2352778,
    name: 'Lagos',
    coord: {
      lat: 9.0765,
      lon: 7.3986,
    },
    country: 'NG',
    population: 200000,
    timezone: 3600,
    sunrise: 1634534293,
    sunset: 1634577153,
  } as City,
  list: [
    {
      dt: 1634601600,
      main: {
        temp: 23.4,
        feels_like: 24.07,
        temp_min: 22.77,
        temp_max: 23.4,
        pressure: 1012,
        sea_level: 1012,
        grnd_level: 960,
        humidity: 87,
        temp_kf: 0.63,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 94,
      },
      wind: {
        speed: 0.99,
        deg: 258,
        gust: 1.26,
      },
      visibility: 10000,
      pop: 0.46,
      rain: {
        '3h': 0.17,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2021-12-06 18:00:00',
    } as WeatherData,
  ],
};

const sliderMockData = { data: [{ title: 'December 1, 2021', data: mockData.list }] };

const mockFetchWeather = jest.spyOn(weatherUtils, 'fetchWeather');
mockFetchWeather.mockResolvedValue(mockData);

test('slider renders weather info', () => {
  render(<CardSlider data={sliderMockData.data} handleCardSelect={() => {}} selectedCard={0} />);
  const slider = screen.getByTestId('weather-card-slider');
  const temperatureText = screen.getByText(/temperature/gi);

  expect(slider).toBeInTheDocument();
  expect(temperatureText).toBeInTheDocument();
});

test('Card date properly rendered on card', () => {
  render(<CardSlider data={sliderMockData.data} handleCardSelect={() => {}} selectedCard={0} />);
  const pattern = new RegExp('December 1, 2021', 'gi');
  const dateDisplayed = screen.getByText(pattern);

  expect(dateDisplayed).toBeInTheDocument();
});

test('Layout component renders with children', () => {
  render(
    <Layout>
      <div data-testid="test-child-component">Child Component</div>
    </Layout>,
  );

  expect(screen.getByTestId('test-child-component')).toBeInTheDocument();
  expect(screen.getByText(/child component/gi)).toBeInTheDocument();
});

test('Should render temperature options', () => {
  render(
    <TemperatureUnitForm
      options={[
        { value: 'celcius', label: 'Celcius' },
        { value: 'kelvin', label: 'Kelvin' },
      ]}
      value="kelvin"
      handleChange={() => {}}
    />,
  );

  const celciusOption = screen.getByTestId('celcius-temp-option');
  const kelvinOption = screen.getByTestId('kelvin-temp-option');

  expect(celciusOption).toBeInTheDocument();
  expect(kelvinOption).toBeInTheDocument();
});

test('Should change temperature unit when an option is selected', () => {
  render(
    <TemperatureUnitForm
      options={[
        { value: 'celcius', label: 'Celcius' },
        { value: 'kelvin', label: 'Kelvin' },
      ]}
      value="kelvin"
      handleChange={() => {}}
    />,
  );

  const kelvinOption = screen.getByRole('radio', { name: 'Kelvin' });

  userEvent.click(kelvinOption);

  expect((kelvinOption as HTMLInputElement).checked).toBe(true);
});
