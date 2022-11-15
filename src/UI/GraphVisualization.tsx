import { FC, useCallback, useEffect, useRef } from "react"
import { Cytoscape } from "../Cytoscape/Cy";
import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { EventObject } from "cytoscape";
import { add, setTotal } from "../store/artistSlice";
import { get25ArtistByCountry } from "../utils/http";

interface GraphVisualizationProps{
  areaValue: string;
}

const GraphVisualization:FC<GraphVisualizationProps> = (props:GraphVisualizationProps) => {
    const artistList = useSelector((state: RootState) => state.artist.artistList);
    
    const dispatch = useDispatch();
    
    // graph reference: div to graph
    const graphRef = useRef<Cytoscape>();

    // use Callback for init Cytoscape
    const cyContainerRef = useCallback((cyContainer:HTMLDivElement)=>{
      if(cyContainer!==null){
        graphRef.current = new Cytoscape(cyContainer);
      }
    },[]);

   const clickNodeHandler = useCallback((event: EventObject) => {
      event.preventDefault();
      if(props.areaValue !== ""){
        get25ArtistByCountry(props.areaValue, artistList.length).then((res: any)=>{
          dispatch(setTotal(res.count));
          dispatch(add(res.artists));
        }).catch((error: Error) => {
          console.error(error);
        });
      }
    }, [artistList.length, props.areaValue, dispatch]);

  
    // use Effect for update graph with new nodes and edges (artist)
    useEffect( () => {
      if(graphRef.current && props.areaValue !== ""){
        graphRef.current!.cy.removeAllListeners();
        graphRef.current!.removeAllNodes();
        // Add Artist Nodes And Edge
        graphRef.current!.addArtistNodesAndEdge(artistList, props.areaValue);
        graphRef.current!.cy.on('tap', 'node', function(event: EventObject){
          clickNodeHandler(event);
        });
        graphRef.current!.cy.layout(graphRef.current!.layoutOptions).run();
      } else {
        if(graphRef.current) {
          graphRef.current!.removeAllNodes();
          graphRef.current!.cy.layout(graphRef.current!.layoutOptions).run();
        }
      }
    }, [artistList, props.areaValue, clickNodeHandler]);

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