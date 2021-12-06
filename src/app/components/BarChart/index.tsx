import React from 'react';
import { Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BarchartProps {
  data: Array<any>;
}

const Barchart: React.FC<BarchartProps> = ({ data }) => {
  return (
    <Box sx={{ flexGrow: 1, width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="temperature" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Legend />
          <Bar dataKey="temperature" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Barchart;
