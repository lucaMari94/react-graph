import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { FC } from 'react';

interface ChartVisualizationProps{}

const ChartVisualization:FC<ChartVisualizationProps> = (props:ChartVisualizationProps) => {

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>Chart Visualization</Typography>
        </AccordionSummary>
        <AccordionDetails>
        
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ChartVisualization;