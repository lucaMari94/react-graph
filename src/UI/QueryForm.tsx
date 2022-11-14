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
import { ArtistDefinition } from '../utils/definations';

interface QueryFormProps{
    areaValue:string
    setAreaValue: (area : string) => void
    countTotalArtist: number;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleReset: (event: FormEvent<HTMLButtonElement>) => void;
    artistList: Array<ArtistDefinition>;
}

const QueryForm:FC<QueryFormProps> = (props:QueryFormProps) => {

  const onAreaChange = (event: SelectChangeEvent)=> {
    props.setAreaValue(event.target.value);
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
          <form onSubmit={props.handleSubmit}>
            <FormControl fullWidth size="small">
              <InputLabel id="area-select-label">Area</InputLabel>
              <Select
                disabled={props.countTotalArtist > 0}
                labelId="area-select-label"
                id="area-select"
                label="Area"
                value={props.areaValue}
                onChange={onAreaChange}
              >
                {countryList.map((country) => {        
                  return <MenuItem key={country} value={country} id={country}>{country}</MenuItem>
                })}
              </Select>
            </FormControl>
            <Button sx={{m:1}} disabled={props.countTotalArtist > 0} type="submit" color="primary" variant="contained" size="medium">Search</Button>
            <Button sx={{m:1}} disabled={props.countTotalArtist === 0 || props.artistList.length === props.countTotalArtist} type="submit" color="success" variant="contained" size="medium">Add 25 Artist</Button>
            <Button sx={{m:1}} color="warning" onClick={props.handleReset} size="medium">Reset All</Button>
          </form>
          {props.countTotalArtist !== 0 && <p>Found: {props.countTotalArtist}</p>}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default QueryForm;