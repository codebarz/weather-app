import React from 'react';
import { Paper, styled, Grid, Typography } from '@mui/material';
import classname from 'classnames';
import { TemperatureUnits } from '../../typings';

interface SliderItemProps {
  title: string;
  temperature: string;
  icon: any;
  date: string;
  unit?: string;
  onClick: (index: number) => void;
  index: number;
  active?: boolean;
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: '20px 5px',
  textAlign: 'center',
  height: '200px',
  width: '100%',
  border: 'none',
  margin: '10px',
  borderRadius: '10px',
  background: '#2c313f',
  boxShadow: '0 0 24px rgba(0, 0, 0, 0.05)',
  color: '#fff',
  overflow: 'hidden',
}));

const SliderItem: React.FC<SliderItemProps> = ({
  title,
  temperature,
  icon,
  date,
  unit,
  onClick,
  index,
  active,
}) => {
  const className = classname('weather-slide-item', { 'active-slide': active });
  return (
    <Item
      className={className}
      onClick={() => {
        onClick(index);
      }}
    >
      <div className="heartbeat"></div>
      <div className="heartbeat-2"></div>
      <Grid container columnSpacing={{ sm: 2 }} direction="column">
        <Grid item sm={12} zIndex={10}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography variant="h6">
            {temperature}
            &deg;{unit === TemperatureUnits.Celcius ? 'C' : 'F'}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <img src={`http://openweathermap.org/img/w/${icon}.png`} className="icon" alt="Weather" />
        </Grid>
        <Grid item sm={12}>
          {date}
        </Grid>
      </Grid>
    </Item>
  );
};

export default SliderItem;
