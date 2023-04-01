import { nodeStyle, edgeStyle } from "./config";

export function getGraphData (componentData) {
    console.log(componentData)
    const nodes = componentData.map(item => ({
        id: item.id,
        label: item.id,
        description: item.id,
        ...nodeStyle
    }));

    const edges = [];
    componentData.forEach(item => {
        if (item.reasons && item.reasons.length > 0) {
            const lines = item.reasons.map(v => ({
                source: item.id,
                target: v.id,
                ...edgeStyle
            }));
            edges.push(...lines);
        }
    });

    return {
        nodes,
        edges
    }
}