import * as React from 'react';
import GraphRender from './UI/GraphRender';
import { SearchAppBar } from './UI/AppBar';

function App() {

  return (
    <React.Fragment>
      <SearchAppBar></SearchAppBar>
      <GraphRender></GraphRender>
  </React.Fragment>
  );
}

export default App;
