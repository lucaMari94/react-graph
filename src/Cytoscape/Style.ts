import { Stylesheet } from "cytoscape";

export const cytoscapeStyle: Stylesheet[] = [
    {
        selector: 'node',
        css: {
        'label': 'data(id)',
        "text-background-opacity": 0.5,
        "text-background-color": "white",
        'background-color': '#1ec8ff',
        }
    },
    {
        selector: 'edge',
        css: {
        'label': 'data(label)',
        'color': "white"
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
];