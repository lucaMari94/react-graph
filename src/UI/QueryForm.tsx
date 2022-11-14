import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChangeEvent, FC, FormEvent } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { countryList } from '../utils/countryList';
import { SelectChangeEvent } from '@mui/material';

interface QueryFormProps{
    areaValue:string
    setAreaValue: (area : string) => void
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const QueryForm:FC<QueryFormProps> = (props:QueryFormProps) => {

  const onAreaChange = (event: SelectChangeEvent)=> {
    props.setAreaValue(event.target.value);
  }

  const handleReset = () => {
    props.setAreaValue("");
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
            <Button sx={{m:1}} type="submit" color="primary" variant="contained" size="medium">Search</Button>
            <Button sx={{m:1}} color="warning" onClick={handleReset} size="medium">Reset</Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default QueryForm;