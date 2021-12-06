import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Carousle from 'react-elastic-carousel';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import { WeatherInfo } from '../../typings';
import SliderItem from './SliderItem';
import { calculateAverageTemperature } from '../../utils/temperature';
import storage from '../../utils/storage';

SwiperCore.use([Navigation]);

interface CardSliderProps {
  data: Array<WeatherInfo>;
  handleCardSelect: (index: number) => void;
  selectedCard?: number;
}

const CardSlider: React.FC<CardSliderProps> = ({ data, handleCardSelect, selectedCard }) => {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const storedUnit = storage.get('unit');

  useEffect(() => {
    if (window.innerWidth <= 760) setSlidesPerView(1);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, pt: 4, pb: 4 }}>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={20}
        slidesPerGroup={1}
        loop={false}
        navigation={true}
        observeParents={true}
        observer={true}
        observeSlideChildren={true}
        className="weather-slide"
      >
        {data?.map((data, index) => {
          const temperature = calculateAverageTemperature(data);
          return (
            <SwiperSlide>
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
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default CardSlider;
