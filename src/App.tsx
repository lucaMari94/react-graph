import * as React from 'react';
import GraphRender from './UI/GraphRender';
import { SearchAppBar } from './UI/AppBar';
import QueryForm from './UI/QueryForm';
import { FormEvent, useState } from 'react';
import { EventObject } from 'cytoscape';
import { Container } from '@mui/material';

export interface ArtistDefinition {
  id: string;
  type: string;
  name: string;
  score: number;
  country: string;
  aliases: Array<{
    name: string;
    locale: string;
    type: string;
  }>;
  area: {
    name: string;
    type: string;
  };
};

function App() {

  const [areaValue, setAreaValue] = useState<string>("");
  const [artistList, setArtistList] = useState<Array<ArtistDefinition>>([]);
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
        setArtistList((prevState: Array<ArtistDefinition>) => {
          return [...prevState, ...res.artists];
        });
      }).catch((error) => {
        console.error(error);
      });
    }
  }
  
  return (
    <React.Fragment>
      <SearchAppBar></SearchAppBar>
      <Container fixed sx={{marginTop:3}}>
          <QueryForm areaValue={areaValue} 
                    setAreaValue={setAreaValue} 
                    handleSubmit={handleSubmit}
          />

          <GraphRender areaValue={areaValue} 
                      artistList={artistList}
                      handleSubmit={handleSubmit}
          />
      </Container>
      
  </React.Fragment>
  );
}

export default App;
