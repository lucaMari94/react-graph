import cytoscape, { EventObject, LayoutOptions, NodeSingular, Position } from "cytoscape";
import { Core } from "cytoscape";
import { ArtistDefinition } from '../utils/definations';
import { concetricLayout } from "./Layout";
import { cytoscapeStyle } from "./Style";

export class Cytoscape {
    cy:Core;
    layoutOptions: LayoutOptions;

    constructor(graphRef: HTMLDivElement, clickHandler:(e:EventObject) => void) {
        this.layoutOptions = concetricLayout;
        this.cy = cytoscape({
            container: graphRef,
            layout: this.layoutOptions,
            elements: [],
            zoom: 0,
            pan: { x: 0, y: 0 },
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
            headless: false,
            styleEnabled: true,
            hideEdgesOnViewport: false,
            textureOnViewport: false,
            motionBlur: false,
            motionBlurOpacity: 0.2,
            // wheelSensitivity: 0,
            pixelRatio: 'auto',
            style: cytoscapeStyle,
          })

          this.cy.on('tap', 'node', function(evt: EventObject){
            // console.log(evt.target.id())
            clickHandler(evt);
          });
    }

    addArtistNodesAndEdge = (artistList: Array<ArtistDefinition>, initNodeId: string) => {
      // const nodes: Array<NodeSingular> = [];
      // const edges: Array<EdgeSingular> = [];
      this.cy.add([{data: { id: initNodeId}}]);
      artistList.forEach((artist: ArtistDefinition) => {
        this.cy.add([
          {group: 'nodes', data: { id: artist.name }}, 
          {group: 'edges', data: {
            id: 'edge-' + artist.id + "-" + artist.name, 
            source: initNodeId, target: artist.name,
            label: 'FROM_AREA' }, 
            classes:'autorotate',
          }
        ]);
      });
    }

    removeAllNodes = () => {
      this.cy.elements().remove();
    }
   
    
}