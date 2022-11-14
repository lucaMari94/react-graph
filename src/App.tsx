import * as React from 'react';
import GraphRender from './UI/GraphRender';
import { SearchAppBar } from './UI/AppBar';
import QueryForm from './UI/QueryForm';
import { FormEvent, useState } from 'react';

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(areaValue !== ""){
      let artistListArray: Array<ArtistDefinition> = [];
      let count : number = 0;
      httpCall(areaValue).then(async (res)=>{
        artistListArray.push(...res.artists);
        /*const count = res.count; 
        while (count >= artistListArray.length) {
          // await new Promise((resolve) => setTimeout(resolve, 500)); 
          httpCall(areaValue, artistListArray.length).then((res)=>{
            artistListArray.push(...res.artists);
            console.log(artistListArray);
          }).catch((error) => {
            console.error(error);
          });
        }*/
        setArtistList(artistListArray)
      }).catch((error) => {
        console.error(error);
      });
    }
  }
  
  return (
    <React.Fragment>
      <SearchAppBar></SearchAppBar>
      <QueryForm areaValue={areaValue} 
                 setAreaValue={setAreaValue} 
                 handleSubmit={handleSubmit}
      />

      <GraphRender areaValue={areaValue} 
                   artistList={artistList}
      />
      
  </React.Fragment>
  );
}

export default App;
