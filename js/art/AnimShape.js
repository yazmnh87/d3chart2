import React, {useState, useEffect} from 'react'
import { LayoutAnimation} from 'react-native'
import {Shape} from '@react-native-community/art'
import * as shape from 'd3-shape'

const d3 = { shape };

const AnimationDurationMs = 250;

const AnimShape = props => {
const [state, setState] = useState({
    path: ''
})

useEffect(()=>{
    computeNextState(props)
},[])

const computeNextState = (nextProps) => {
const {d} = nextProps;

const graph = props.d();
let previousGraph;
setState({path: graph.path})

if(!previousGraph){
    previousGraph = graph;
}

if(props !== nextProps){
    const pathFrom = previousGraph.path;
    const pathTo = graph.path;


// cancelAnimationFrame(animating);
// animating = null;

LayoutAnimation.configureNext(
    LayoutAnimation.create(
        AnimationDurationMs,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
    )
);

// setState({path: Morph.tween(
//     pathFrom,
//     pathTo
// )})
// animate()

previousGraph = graph;
}
}

// const animate = (start) => {
//     animating = requestAnimationFrame((timestamp)=>{
//         if(!start){
//             start = timestamp;
//         }
//         const delta = (timestamp - start) / AnimationDurationMs;

//         if(delta > 1){
//             animating = null;
//             setState({path:previousGraph.path})
//             return;
//         }
//         state.path.tween(delta);
//         setState({...state})
//         animate(start)
//     })
// }
const path = state.path;
return (
    <Shape 
    d={path}
    stroke={props.color}
    fill={props.color}
    />
)
}

export default AnimShape;