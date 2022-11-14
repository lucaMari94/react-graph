import * as React from 'react';
import GraphRender from './UI/GraphVisualization';
import TableDataVisualization from './UI/TableDataVisualization';
import { SearchAppBar } from './UI/AppBar';
import QueryForm from './UI/QueryForm';
import { FormEvent, useState } from 'react';
import { EventObject } from 'cytoscape';
import { Container } from '@mui/material';
import { ArtistDefinition } from './utils/definations';
import ChartVisualization from './UI/ChartVisualization';

function App() {

  const [areaValue, setAreaValue] = useState<string>("");
  const [artistList, setArtistList] = useState<Array<ArtistDefinition>>([]);
  const [countTotalArtist, setCountTotalArtist] = useState<number>(0);
  
  const httpCall = async (area: string, offset : number = 0) => {
      const url: string = "https://musicbrainz.org/ws/2/artist?query=area:" + area + "&offset=" + offset + "&fmt=json";
      const httpResponse: Response = await fetch(url, { mode: "cors" });
      if (httpResponse.status !== 200) {
        throw new Error( "Error");
      }
      return (await httpResponse.json());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement> | EventObject) => {
    event.preventDefault();
    if(areaValue !== ""){
      httpCall(areaValue, artistList.length).then((res)=>{
        setCountTotalArtist(res.count);
        setArtistList((prevState: Array<ArtistDefinition>) => {
          return [...prevState, ...res.artists];
        });
      }).catch((error) => {
        console.error(error);
      });
    }
  }

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
          />

          <TableDataVisualization
            areaValue={areaValue} 
            artistList={artistList}
            countTotalArtist={countTotalArtist}
          />

          <GraphRender 
            areaValue={areaValue} 
            artistList={artistList}
            handleSubmit={handleSubmit}
          />

          <ChartVisualization/>
      </Container>
      
  </React.Fragment>
  );
}

export default App;
