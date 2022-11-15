import * as React from 'react';
import TableDataVisualization from './UI/TableDataVisualization';
import { SearchAppBar } from './UI/AppBar';
import QueryForm from './UI/QueryForm';
import { useState } from 'react';
import { Container, SelectChangeEvent } from '@mui/material';
import ChartVisualization from './UI/ChartVisualization';
import GraphVisualization from './UI/GraphVisualization';

function App() {

  const [areaValue, setAreaValue] = useState<string>("");

  const selectChangeHandler = (event: SelectChangeEvent) => {
    setAreaValue(event.target.value);
  };
  
  return (
    <React.Fragment>
      <SearchAppBar></SearchAppBar>
      <Container fixed sx={{marginTop:3}}>
          <QueryForm 
            areaValue={areaValue}
            setAreaValue={setAreaValue}
            selectChangeHandler={selectChangeHandler}
          />

          <TableDataVisualization/>

          <GraphVisualization 
            areaValue={areaValue}
          />

          <ChartVisualization/>
      </Container>
      
  </React.Fragment>
  );
}

export default App;
