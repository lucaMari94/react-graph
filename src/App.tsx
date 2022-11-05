import * as React from 'react';
import GraphRender from './UI/GraphRender';
import { SearchAppBar } from './UI/AppBar';

function App() {
  return (
    <React.StrictMode>
      <SearchAppBar></SearchAppBar>
      <GraphRender></GraphRender>
  </React.StrictMode>
  );
}

export default App;
