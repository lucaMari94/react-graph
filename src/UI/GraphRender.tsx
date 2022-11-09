import { EventObject } from "cytoscape"
import { FC, Fragment, useCallback, useEffect, useRef } from "react"
import { Cytoscape } from "../Cytoscape/Cy";

interface GraphRenderProps{}

const GraphRender:FC<GraphRenderProps> = (props:GraphRenderProps) => {

    let cytoscape:Cytoscape;

    const graphRef = useRef<Cytoscape>();
   
    const cyContainerRef = useCallback((cyContainer:HTMLDivElement)=>{
      if(cyContainer!==null){
        cytoscape = new Cytoscape(cyContainer);
        graphRef.current = cytoscape;
        cytoscape.cy.on('tap', 'node', function(evt: EventObject){
          nodeClickHandler(evt);
        });
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

    const nodeClickHandler = (evt:EventObject) => {
      evt.preventDefault();
      httpCall(evt.target.id())
        .then((res)=>{
          res.forEach((element: any, index: number) => {
            cytoscape.cy.add([
              {group: 'nodes',data: { id: element.name },}, 
              {group: 'edges', data: { 
                                      id: 'edge-' + index.toString() + "-" + element.name, 
                                      source: evt.target.id(), target: element.name }, 
                                      classes:'autorotate' 
                                    }
            ]);
            cytoscape.cy.layout(cytoscape.layoutOptions).run();
        });
        })
        .catch((error) => {
          console.error(error);
        });
    };
   
    return (
     <Fragment>
        <div ref={cyContainerRef} style={{backgroundColor: 'black', width: '100%', height: '90vh'}}></div>
     </Fragment>
    )
   }
   
   export default GraphRender;