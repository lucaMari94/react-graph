import cytoscape from "cytoscape"
import { FC, Fragment, useEffect, useRef } from "react"

interface GraphRenderProps{}

const GraphRender:FC<GraphRenderProps> = (props:GraphRenderProps) => {

    const graphRef = useRef(null)
   
    const drawGraph = () => {
    const cy = cytoscape({
     container: graphRef.current,
     elements: [
       { data: { id: 'a' } },
       { data: { id: 'b' } },
       {
         data: {
           id: 'ab',
           source: 'a',
           target: 'b'
         }
       }]
     })
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