import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from "./UI/demo";

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
