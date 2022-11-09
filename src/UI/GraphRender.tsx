import { EventObject } from "cytoscape"
import { FC, Fragment, useCallback, useEffect, useRef } from "react"
import { Cytoscape } from "../Cytoscape/Cy";

interface GraphRenderProps{}

const GraphRender:FC<GraphRenderProps> = (props:GraphRenderProps) => {

    let cytoscape:any;

    const graphRef = useRef<Cytoscape>();
   
    const cyContainerRef = useCallback((cyContainer:HTMLDivElement)=>{
      if(cyContainer!==null){
        graphRef.current = new Cytoscape(cyContainer);
      }
    },[])

    const drawGraph = () => {
      // cytoscape.cy.layout({name: 'grid'}).run();
      /*cytoscape.on('tap', 'node', function(evt: EventObject){
          // var node = evt.target;
          // console.log( 'tapped ' + node.id() );
          nodeClickHandler(evt);
      });*/
    }
    
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
      console.log(evt.target.id());
      httpCall(evt.target.id())
        .then((res)=>{
          console.log(res);
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
    
    useEffect(() => {
      drawGraph()
    }, [])
   
    return (
     <Fragment>
        <div ref={cyContainerRef} style={{backgroundColor: 'black', width: '100%', height: '90vh'}}></div>
     </Fragment>
    )
   }
   
   export default GraphRender;