import React from 'react';
import { Container } from '@mui/material';

const Layout: React.FC = ({ children }) => {
  return (
    <Container maxWidth="md" sx={{ p: 4 }}>
      {children}
    </Container>
  );
};

export default Layout;
