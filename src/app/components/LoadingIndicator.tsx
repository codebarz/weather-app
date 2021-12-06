import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingIndicator: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingIndicator;
