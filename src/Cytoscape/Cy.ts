import cytoscape from "cytoscape";
import { Core } from "cytoscape";
import { MutableRefObject } from "react";

export class Cytoscape {
    cy:Core;
   
    constructor(graphRef: MutableRefObject<null>) {
        this.cy = cytoscape({
            container: graphRef.current,
            elements: [
              { data: { id: 'gryffindor'} },
              { data: { id: 'hufflepuff' } },
              { data: { id: 'ravenclaw' } },
              { data: { id: 'slytherin' } },
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
              {
                "selector": ".autorotate",
                "style": {
                    "font-size": 10,
                    "source-text-rotation": "autorotate",
                    "target-text-rotation": "autorotate",
                    "source-text-offset": 50,
                    "target-text-offset": 50,
                    "text-background-shape":"rectangle",
                    "text-background-color":"#000000",
                    "text-background-opacity":1
                }
              }
            ],
            layout: {
              name: 'breadthfirst',
            },
            // initial viewport state:
            zoom: 0,
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
    }
   
    
}