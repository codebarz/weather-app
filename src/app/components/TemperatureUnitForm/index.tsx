import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

type TemperatureUnitOptions = {
  value: string;
  label: string;
};

interface TemperatureUnitFormProps {
  options: Array<TemperatureUnitOptions>;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TemperatureUnitForm: React.FC<TemperatureUnitFormProps> = ({
  options,
  value,
  handleChange,
}) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="Temperature unit options"
        name="temperature-unit-button-group"
        value={value}
        onChange={handleChange}
        data-testid="temperature-options"
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.label}
            value={option.value}
            control={<Radio />}
            label={option.label}
            className="radio-button"
            data-testid={`${option.label.toLowerCase()}-temp-option`}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default TemperatureUnitForm;
