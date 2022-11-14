import { EventObject } from "cytoscape"
import { FC, useCallback, useEffect, useRef } from "react"
import { ArtistDefinition } from '../utils/definations'
import { Cytoscape } from "../Cytoscape/Cy";
import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface GraphVisualizationProps{
  areaValue: string;
  artistList: Array<ArtistDefinition>;
  handleSubmit: (event: EventObject) => void
}

const GraphVisualization:FC<GraphVisualizationProps> = (props:GraphVisualizationProps) => {

    const graphRef = useRef<Cytoscape>();
   
    useEffect( () => {
      if(graphRef.current && props.areaValue !== ""){
        graphRef.current!.addArtistNodesAndEdge(props.artistList, props.areaValue);
        graphRef.current!.cy.layout(graphRef.current!.layoutOptions).run();
      } else {
        if(graphRef.current) {
          graphRef.current!.removeAllNodes();
          graphRef.current!.cy.layout(graphRef.current!.layoutOptions).run();
        }
      }
    }, [props.artistList]);

    const nodeClickHandler = (evt:EventObject) => {
      evt.preventDefault();
      props.handleSubmit(evt);
    };

    const cyContainerRef = useCallback((cyContainer:HTMLDivElement)=>{
      if(cyContainer!==null && props.areaValue !== ""){
        graphRef.current = new Cytoscape(cyContainer, props.areaValue, nodeClickHandler);
      }
    },[props.artistList]);

    return (
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
              <Typography>Graph Visualization</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div ref={cyContainerRef} style={{backgroundColor: 'black', width: '100%', height: '50vh'}}></div>
          </AccordionDetails>
        </Accordion>
    </div>
    )
   }
   
   export default GraphVisualization;