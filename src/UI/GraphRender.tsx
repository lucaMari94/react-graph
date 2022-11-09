import { EventObject } from "cytoscape"
import { FC, Fragment, useCallback, useEffect, useRef } from "react"
import { Cytoscape } from "../Cytoscape/Cy";

interface GraphRenderProps{}

const GraphRender:FC<GraphRenderProps> = (props:GraphRenderProps) => {

    const graphRef = useRef<Cytoscape>();
   
    const nodeClickHandler = (evt:EventObject) => {
      evt.preventDefault();
      httpCall(evt.target.id())
        .then((res)=>{
          res.forEach((element: any, index: number) => {
            graphRef.current!.cy.add([
              {group: 'nodes',data: { id: element.name },}, 
              {group: 'edges', data: { 
                                      id: 'edge-' + index.toString() + "-" + element.name, 
                                      source: evt.target.id(), target: element.name }, 
                                      classes:'autorotate' 
                                    }
            ]);
            graphRef.current!.cy.layout(graphRef.current!.layoutOptions).run();
        });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const cyContainerRef = useCallback((cyContainer:HTMLDivElement)=>{
      if(cyContainer!==null){
        graphRef.current = new Cytoscape(cyContainer, nodeClickHandler);
      }
    },[]);

    const httpCall = async (house: string) => {
      const url: string = "https://hp-api.herokuapp.com/api/characters/house/"+house;
      const httpResponse: Response = await fetch(url, { mode: "cors" });
      if (httpResponse.status !== 200) {
        throw new Error( "House '" + house +"' not exist.");
      }
      return (await httpResponse.json());
    };
   
    return (
     <Fragment>
        <div ref={cyContainerRef} style={{backgroundColor: 'black', width: '100%', height: '90vh'}}></div>
     </Fragment>
    )
   }
   
   export default GraphRender;