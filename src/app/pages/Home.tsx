import React, { useEffect, useState } from 'react';
import { Box, Grid, Button, Container, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import groupBy from 'lodash.groupby';
import dayjs from 'dayjs';

import { BarChartData, Coordinates, TemperatureUnits, WeatherInfo } from '../typings';

import Layout from '../components/Layout';
import TemperatureUnitForm from '../components/TemperatureUnitForm';
import CardSlider from '../components/CardSlider';
import Barchart from '../components/BarChart';

import useGetWeatherInfo from '../hooks/useGetWeatherInfo';

import { monthName } from '../utils/date';
import storage from '../utils/storage';
import LoadingIndicator from '../components/LoadingIndicator';

const Home: React.FC = () => {
  const [temperatureUnit, setTemperatureUnit] = useState<string>(TemperatureUnits.Celcius);
  const [userCoordinates, setUserCoordinates] = useState<Coordinates>();
  const [weathers, setWeathers] = useState<Array<WeatherInfo>>([]);
  const [selectedCard, setSelectedCard] = useState<number>();
  const [barChartWeatherInfo, SetBarChartWeatherInfo] = useState<Array<BarChartData>>();

  const { data, isLoading, isFetching, refetch } = useGetWeatherInfo(
    userCoordinates,
    temperatureUnit,
  );

  const handleTemperatureUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemperatureUnit(e.target.value);
    storage.set('unit', e.target.value);
  };

  const handleCardSelect = (index: number) => {
    setSelectedCard(index);
    const weatherbarChartData: Array<BarChartData> = weathers[index].data.map((item) => ({
      time: dayjs(item.dt_txt).format('ha'),
      temperature: item.main.temp,
    }));

    SetBarChartWeatherInfo(weatherbarChartData);
  };

  useEffect(() => {
    const storedUnit = storage.get('unit');
    if (storedUnit) {
      setTemperatureUnit(storedUnit);
    } else {
      storage.set('unit', TemperatureUnits.Celcius);
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    } else {
      toast('Kindly enable browser location', { position: 'top-center', duration: 10000 });
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      const response = groupBy(data.list, monthName);

      const weatherDays: Array<WeatherInfo> = [];
      for (const key in response) {
        let weather = { title: key, data: response[key] };
        weatherDays.push(weather);
      }

      setWeathers(weatherDays);
    }
  }, [data, isLoading]);

  return !data || isFetching ? (
    <LoadingIndicator />
  ) : (
    <>
      <Layout>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={9} sm={9} justifyContent="center">
              <TemperatureUnitForm
                options={[
                  { value: TemperatureUnits.Celcius, label: 'Celcius' },
                  { value: TemperatureUnits.Fahrenheit, label: 'Fahrenheit' },
                ]}
                value={temperatureUnit}
                handleChange={handleTemperatureUnitChange}
              />
            </Grid>
            <Grid
              item
              xs={3}
              sm={3}
              alignItems="center"
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button variant="contained" onClick={() => refetch()}>
                Refresh
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="h5" className="country-name">
          {data?.city?.name}, {data?.city?.country}
        </Typography>
      </Layout>
      <Container maxWidth="lg">
        <CardSlider
          data={weathers}
          handleCardSelect={handleCardSelect}
          selectedCard={selectedCard}
        />
      </Container>
      {barChartWeatherInfo && (
        <Layout>
          <Barchart data={barChartWeatherInfo} />
        </Layout>
      )}
    </>
  );
};

export default Home;
