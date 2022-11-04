import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './UI/Demo';

function App() {
  return (
    <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Demo />
    </StyledEngineProvider>
  </React.StrictMode>
  );
}

export default App;
