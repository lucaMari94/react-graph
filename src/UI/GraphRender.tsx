import cytoscape from "cytoscape"
import { FC, Fragment, useEffect, useRef } from "react"

interface GraphRenderProps{}

const GraphRender:FC<GraphRenderProps> = (props:GraphRenderProps) => {

    const graphRef = useRef(null)
   
    // https://hp-api.herokuapp.com/
    const drawGraph = () => {
      const cy = cytoscape({
        container: graphRef.current,
        elements: [
          { data: { id: 'gryffindor'} },
          { data: { id: 'hufflepuff' } },
          { data: { id: 'ravenclaw' } },
          { data: { id: 'slytherin' } },
          /*{
            data: {
              id: 'ab',
              source: 'gryffindor',
              target: 'hufflepuff'
            }
          }*/
        ],
        style: [
          {
            selector: 'node',
            css: {
              'label': 'data(id)',
              "text-background-opacity": 0.5,
              "text-background-color": "white"
            }
          },
        ],

        layout: {
          name: 'grid',
          rows: 1
        },
        // initial viewport state:
        zoom: 1,
        pan: { x: 0, y: 0 },

        // interaction options:
        minZoom: 1e-50,
        maxZoom: 1e50,
        zoomingEnabled: true,
        userZoomingEnabled: true,
        panningEnabled: true,
        userPanningEnabled: true,
        boxSelectionEnabled: true,
        selectionType: 'single',
        touchTapThreshold: 8,
        desktopTapThreshold: 4,
        autolock: false,
        autoungrabify: false,
        autounselectify: false,
        // multiClickDebounceTime: 250,

        // rendering options:
        headless: false,
        styleEnabled: true,
        hideEdgesOnViewport: false,
        textureOnViewport: false,
        motionBlur: false,
        motionBlurOpacity: 0.2,
        wheelSensitivity: 1,
        pixelRatio: 'auto'
      })

      cy.on('tap', 'node', function(evt){
        var node = evt.target;
        console.log( 'tapped ' + node.id() );
      });
    }
   
    useEffect(() => {
     drawGraph()
    }, [])
   
    return (
     <Fragment>
        <div ref={graphRef} style={{backgroundColor: 'black', width: '100%', height: '90vh'}}></div>
     </Fragment>
    )
   }
   
   export default GraphRender;