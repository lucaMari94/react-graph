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
  expandNode: (event: EventObject) => void
}

const GraphVisualization:FC<GraphVisualizationProps> = (props:GraphVisualizationProps) => {

    // graph reference: div to graph
    const graphRef = useRef<Cytoscape>();
   
     // use Callback for init Cytoscape
     const cyContainerRef = useCallback((cyContainer:HTMLDivElement)=>{
      if(cyContainer!==null){
        graphRef.current = new Cytoscape(cyContainer, nodeClickHandler);
      }
    },[]);

    // use Effect for update graph with new nodes and edges (artist)
    useEffect( () => {
      if(graphRef.current && props.areaValue !== ""){
        // Add Artist Nodes And Edge
        graphRef.current!.addArtistNodesAndEdge(props.artistList, props.areaValue);
        graphRef.current!.cy.layout(graphRef.current!.layoutOptions).run();
      } else {
        if(graphRef.current) {
          // props.areaValue is empty remove all node (reset all)
          graphRef.current!.removeAllNodes();
          graphRef.current!.cy.layout(graphRef.current!.layoutOptions).run();
        }
      }
    }, [props.artistList]);

    // event when click to cytoscape node: expand node with 25 artist (http call)
    const nodeClickHandler = (evt:EventObject) => {
      evt.preventDefault();
      props.expandNode(evt);
    };

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