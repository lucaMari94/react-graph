import cytoscape, { LayoutOptions, NodeSingular, Position } from "cytoscape";
import { Core } from "cytoscape";

export class Cytoscape {
    cy:Core;
    layoutOptions: LayoutOptions;
    
    constructor(graphRef: HTMLDivElement) {

        this.layoutOptions = {
            name: 'breadthfirst',
            fit: true, // whether to fit the viewport to the graph
            directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
            padding: 30, // padding on fit
            circle: false, // put depths in concentric circles if true, put depths top down if false
            grid: false, // whether to create an even grid into which the DAG is placed (circle:false only)
            spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
            roots: undefined, // the roots of the trees
            maximal: false, // whether to shift nodes down their natural BFS depths in order to avoid upwards edges (DAGS only)
            depthSort: undefined, // a sorting function to order nodes at equal depth. e.g. function(a, b){ return a.data('weight') - b.data('weight') }
            animate: false, // whether to transition the node positions
            animationDuration: 500, // duration of animation in ms if enabled
            animationEasing: undefined, // easing of animation if enabled,
            animateFilter: function ( node: NodeSingular, i: number ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
            ready: undefined, // callback on layoutready
            stop: undefined, // callback on layoutstop
            transform: function (node: NodeSingular, position: Position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
        };

        this.cy = cytoscape({
            container: graphRef,
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
            layout: this.layoutOptions,
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