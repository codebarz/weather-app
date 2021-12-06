import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4">404 Page not found</Typography>
      <Button variant="contained" aria-label="home link" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
