import React from 'react';
import { Box } from '@mui/material';
import Carousel from 'react-elastic-carousel';

import { WeatherInfo } from '../../typings';

import SliderItem from './SliderItem';

import { calculateAverageTemperature } from '../../utils/temperature';
import storage from '../../utils/storage';

interface CardSliderProps {
  data: Array<WeatherInfo>;
  handleCardSelect: (index: number) => void;
  selectedCard?: number;
}

const CardSlider: React.FC<CardSliderProps> = ({ data, handleCardSelect, selectedCard }) => {
  const storedUnit = storage.get('unit');

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <Box sx={{ flexGrow: 1, pt: 4, pb: 4 }}>
      <Carousel
        breakPoints={breakPoints}
        pagination={false}
        showEmptySlots={false}
        isRTL={false}
        className="weather-slide"
      >
        {data?.map((data, index) => {
          const temperature = calculateAverageTemperature(data);
          return (
            <SliderItem
              key={data.title}
              title="Temperature"
              date={data?.title}
              temperature={temperature.toString()}
              icon={data.data[0].weather[0].icon}
              unit={storedUnit}
              onClick={handleCardSelect}
              index={index}
              active={selectedCard === index}
            />
          );
        })}
      </Carousel>
    </Box>
  );
};

export default CardSlider;
