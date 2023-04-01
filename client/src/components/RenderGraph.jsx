import G6 from '@antv/g6';
import React, { useEffect } from 'react';

import { getGraphData } from '../dataTransform'

const Index = () => {
    const ref = React.useRef(null);
    let graph = null;

    useEffect(() => {
        const data = getGraphData(window.componentData || []);

        if (!graph) {
            graph = new G6.Graph({
                container: ref.current,
                width: window.innerWidth - 290,
                height: window.innerHeight,
                layout: {
                    type: 'dagre',
                    direction: 'LR'
                },
            });
        }
        graph.data(data);
        graph.render()
    }, []);

    return (<div ref={ref}></div>)
}

export default Index;