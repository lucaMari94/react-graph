import * as React from 'react';
import TableDataVisualization from './UI/TableDataVisualization';
import { SearchAppBar } from './UI/AppBar';
import QueryForm from './UI/QueryForm';
import { FormEvent, useState } from 'react';
import { EventObject } from 'cytoscape';
import { Container, SelectChangeEvent } from '@mui/material';
import { ArtistDefinition } from './utils/definitions';
import ChartVisualization from './UI/ChartVisualization';
import GraphVisualization from './UI/GraphVisualization';
import { get25ArtistByCountry } from './utils/http';

function App() {

  const [areaValue, setAreaValue] = useState<string>("");
  const [artistList, setArtistList] = useState<Array<ArtistDefinition>>([]);
  const [countTotalArtist, setCountTotalArtist] = useState<number>(0);

  const selectChangeHandler = (event: SelectChangeEvent) => {
    setAreaValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(areaValue !== ""){
      get25ArtistByCountry(areaValue, artistList.length).then((res: any)=>{
        setCountTotalArtist(res.count);
        setArtistList((prevState: Array<ArtistDefinition>) => {
          return [...prevState, ...res.artists];
        });
      }).catch((error: Error) => {
        console.error(error);
      });
    }
  }

  const clickNodeHandler = (event: EventObject) => {
    event.preventDefault();
    if(areaValue !== ""){
      get25ArtistByCountry(areaValue, artistList.length).then((res: any)=>{
        setCountTotalArtist(res.count);
        setArtistList((prevState: Array<ArtistDefinition>) => {
          return [...prevState, ...res.artists];
        });
      }).catch((error: Error) => {
        console.error(error);
      });
    }
  }

  // RESET ALL DATA: country, table, graph and charts
  const handleReset = () => {
    setAreaValue("");
    setArtistList([]);
    setCountTotalArtist(0);
  }
  
  return (
    <React.Fragment>
      <SearchAppBar></SearchAppBar>
      <Container fixed sx={{marginTop:3}}>
          <QueryForm 
            areaValue={areaValue}
            setAreaValue={setAreaValue}
            countTotalArtist={countTotalArtist}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
            artistList={artistList}
            selectChangeHandler={selectChangeHandler}
          />

          <TableDataVisualization
            artistList={artistList}
            countTotalArtist={countTotalArtist}
          />

          <GraphVisualization 
            areaValue={areaValue}
            artistList={artistList}
            clickNodeHandler={clickNodeHandler}
          />

          <ChartVisualization/>
      </Container>
      
  </React.Fragment>
  );
}

export default App;
