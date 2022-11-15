import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC, FormEvent } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { countryList } from '../utils/countryList';
import { SelectChangeEvent } from '@mui/material';
import { get25ArtistByCountry } from '../utils/http';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { add, removeAll, setTotal } from '../store/artistSlice';

interface QueryFormProps{
    areaValue:string
    setAreaValue: (area : string) => void;
    selectChangeHandler: (event: SelectChangeEvent) => void;
}

const QueryForm:FC<QueryFormProps> = (props:QueryFormProps) => {

  const artistList = useSelector((state: RootState) => state.artist.artistList);
  const countTotalArtist = useSelector((state: RootState) => state.artist.total);
  
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(props.areaValue !== ""){
      get25ArtistByCountry(props.areaValue, artistList.length).then((res: any)=>{
        dispatch(setTotal(res.count));
        dispatch(add(res.artists));
      }).catch((error: Error) => {
        console.error(error);
      });
    }
  }

  const handleReset = () => {
    props.setAreaValue("");
    dispatch(removeAll());
    dispatch(setTotal(0));
  }

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Queries MusicBrainz</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth size="small">
              <InputLabel id="area-select-label">Country</InputLabel>
              <Select
                disabled={countTotalArtist > 0}
                labelId="area-select-label"
                id="area-select"
                label="Country"
                value={props.areaValue}
                onChange={props.selectChangeHandler}>
                  {countryList.map((country) => {        
                    return <MenuItem key={country} value={country} id={country}>{country}</MenuItem>
                  })}
              </Select>
            </FormControl>
            <Button sx={{m:1}} disabled={countTotalArtist > 0 || props.areaValue === ""} type="submit" color="primary" variant="contained" size="medium">Search</Button>
            <Button sx={{m:1}} disabled={countTotalArtist === 0 || artistList.length === countTotalArtist} type="submit" color="success" variant="contained" size="medium">Add 25 Artist</Button>
            <Button sx={{m:1}} color="warning" onClick={handleReset} size="medium">Reset All</Button>
          </form>
          {countTotalArtist !== 0 && <p>Found: {countTotalArtist}</p>}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default QueryForm;