import React from 'react';
import { Box } from '@mui/material';
import Carousel from 'react-elastic-carousel';

import { WeatherInfo } from '../../typings';

import SliderItem from './SliderItem';

import { calculateAverageTemperature } from '../../utils/temperature';
import storage from '../../utils/storage';
import useMediaQuery from '@mui/material/useMediaQuery';

interface CardSliderProps {
  data: Array<WeatherInfo>;
  handleCardSelect: (index: number) => void;
  selectedCard?: number;
  onNextItem: any;
  onPrevItem: any;
}

const CardSlider: React.FC<CardSliderProps> = ({
  data,
  handleCardSelect,
  selectedCard,
  onNextItem,
  onPrevItem
}) => {
  const storedUnit = storage.get('unit');
  const matches = useMediaQuery('(min-width: 600px) and (max-width: 900px)');
  const matchMobile = useMediaQuery('(max-width: 599px)');

  return (
    <Box sx={{ flexGrow: 1, pt: 4, pb: 4 }} data-testid="weather-card-slider">
      <Carousel
        // breakPoints={breakPoints}
        pagination={false}
        showEmptySlots={false}
        isRTL={false}
        className="weather-slide"
        itemsToShow={matches ? 2 : matchMobile ? 1 : 3}
        onNextEnd={onNextItem}
        onPrevEnd={onPrevItem}
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
