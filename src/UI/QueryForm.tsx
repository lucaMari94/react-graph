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
import { ArtistDefinition } from '../utils/definitions';

interface QueryFormProps{
    areaValue:string
    setAreaValue: (area : string) => void;
    countTotalArtist: number;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleReset: (event: FormEvent<HTMLButtonElement>) => void;
    artistList: Array<ArtistDefinition>;
    selectChangeHandler: (event: SelectChangeEvent) => void;
}

const QueryForm:FC<QueryFormProps> = (props:QueryFormProps) => {
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
              <InputLabel id="area-select-label">Country</InputLabel>
              <Select
                disabled={props.countTotalArtist > 0}
                labelId="area-select-label"
                id="area-select"
                label="Country"
                value={props.areaValue}
                onChange={props.selectChangeHandler}
              >
                {countryList.map((country) => {        
                  return <MenuItem key={country} value={country} id={country}>{country}</MenuItem>
                })}
              </Select>
            </FormControl>
            <Button sx={{m:1}} disabled={props.countTotalArtist > 0 || props.areaValue === ""} type="submit" color="primary" variant="contained" size="medium">Search</Button>
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