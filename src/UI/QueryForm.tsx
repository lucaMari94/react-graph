import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChangeEvent, FC, FormEvent } from 'react';
import { Button, TextField } from '@mui/material';

interface QueryFormProps{
    areaValue:string
    setAreaValue: (area : string) => void
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const QueryForm:FC<QueryFormProps> = (props:QueryFormProps) => {

  const onAreaChange = (event: ChangeEvent<HTMLInputElement> )=> {
    props.setAreaValue(event.target.value);
  }

  const handleReset = () => {
    props.setAreaValue("");
  }

  return (
    <div>
      <Accordion expanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Search</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <form onSubmit={props.handleSubmit}>
                <TextField id="areaTextField" 
                        label="Area" 
                        variant="outlined"
                        size="small"
                        value={props.areaValue}
                        onChange={onAreaChange}
                />
                <Button type="submit" color="success" variant="contained">Search</Button>
                <Button color="warning" onClick={handleReset}>Reset</Button>
            </form>
        
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default QueryForm;