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
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '200px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  margin: '10px',
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
  const className = classname('weather-slide-item', { "active-slide": active });
  return (
    <Item
      className={className}
      onClick={() => {
        onClick(index);
      }}
    >
      <Grid container spacing={2} rowSpacing={{ sm: 5 }}>
        <Grid item sm={12}>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h6">
            {temperature}
            &deg;{unit === TemperatureUnits.Celcius ? 'C' : 'F'}
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather" />
        </Grid>
        <Grid item sm={12}>
          {date}
        </Grid>
      </Grid>
    </Item>
  );
};

export default SliderItem;
