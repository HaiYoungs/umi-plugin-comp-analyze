import React from 'react';
import { Tree } from 'antd';
import { useEffect, useState } from 'react';

function getTreeData (tree) {
    return tree.map(item => ({
        ...item,
        key: item.path,
        title: item.name,
        children: item.children ? getTreeData(item.children) : null
    }));
}


const { DirectoryTree } = Tree;

const Index = () => {

    const [treeData, setTreeData] = useState([]);

    useEffect(() => {
        if (window.fileTree) {
            const tree = getTreeData(window.fileTree);
            setTreeData([...tree]);
        }
    }, [])

    const handlerSelect = (keys) => {
        console.log(keys)
    }

    return <DirectoryTree
        multiple
        treeData={treeData}
        defaultExpandAll
        onSelect={handlerSelect}
    >
    </DirectoryTree>
}

export default Index;

