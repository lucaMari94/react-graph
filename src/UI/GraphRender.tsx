import { EventObject } from "cytoscape"
import { FC, FormEvent, Fragment, useCallback, useEffect, useRef } from "react"
import { ArtistDefinition } from "../App";
import { Cytoscape } from "../Cytoscape/Cy";

interface GraphRenderProps{
  areaValue: string;
  artistList: Array<ArtistDefinition>;
}

const GraphRender:FC<GraphRenderProps> = (props:GraphRenderProps) => {

    const graphRef = useRef<Cytoscape>();
   
    useEffect( () => {
      if(props.artistList.length > 0){
        graphRef.current!.addArtistNodesAndEdge(props.artistList, props.areaValue);
        graphRef.current!.cy.layout(graphRef.current!.layoutOptions).run();
      } 
    }, [props.artistList]);

    /*const nodeClickHandler = (evt:EventObject) => {
      evt.preventDefault();
      httpCall(evt.target.id())
        .then((res)=>{
            graphRef.current!.addCharactersNodesAndEdge(res, evt.target.id());
            graphRef.current!.cy.layout(graphRef.current!.layoutOptions).run();
        })
        .catch((error) => {
          console.error(error);
        });
    };*/

    const cyContainerRef = useCallback((cyContainer:HTMLDivElement)=>{
      if(cyContainer!==null && props.areaValue !== ""){
        graphRef.current = new Cytoscape(cyContainer, props.areaValue);
      }
    },[props.artistList]);

    return (
     <Fragment>
        <div ref={cyContainerRef} style={{backgroundColor: 'black', width: '100%', height: '90vh'}}></div>
     </Fragment>
    )
   }
   
   export default GraphRender;