import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Calculator from './components/Calculator';


const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Calculator />
    </ThemeProvider>
  );
};

export default App;