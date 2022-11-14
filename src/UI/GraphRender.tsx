import { EventObject } from "cytoscape"
import { FC, Fragment, useCallback, useEffect, useRef } from "react"
import { ArtistDefinition } from "../App";
import { Cytoscape } from "../Cytoscape/Cy";
import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface GraphRenderProps{
  areaValue: string;
  artistList: Array<ArtistDefinition>;
  handleSubmit: (event: EventObject) => void
}

const GraphRender:FC<GraphRenderProps> = (props:GraphRenderProps) => {

    const graphRef = useRef<Cytoscape>();
   
    useEffect( () => {
      if(props.artistList.length > 0){
        graphRef.current!.addArtistNodesAndEdge(props.artistList, props.areaValue);
        graphRef.current!.cy.layout(graphRef.current!.layoutOptions).run();
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
          id="panel1a-header"
        >
          <Typography>Graph visualization</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div ref={cyContainerRef} style={{backgroundColor: 'black', width: '100%', height: '50vh'}}></div>
        </AccordionDetails>
      </Accordion>
    </div>
    )
   }
   
   export default GraphRender;