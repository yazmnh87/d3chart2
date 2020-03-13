import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableWithFeedback} from 'react-native'
import {Surface, Group} from '@react-native-community/art';
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import * as d3Array from 'd3-array'
import AnimShape from '../art/AnimShape'
import Theme from '../theme'

const d3 = {scale, shape};

import { scaleBand, scaleLinear} from 'd3-scale'


const Pie = props => {
const [state, setState] = useState({
    highlightedIndex: 0
})

const _value = (item) => { return item.number;}

const _label = (item) => { return item.name;}

const _color = (index) => { return Theme.colors[index];}

const _createPieChart = (index) => {
    const arcs = d3.shape.pie()
    .value(_value)
    (props.data)
    const highlightedArc = d3.shape.arc()
    .outerRadius(props.pieWidth/2 + 10)
    .padAngle(.05)
    .innerRadius(30)

    const arc = d3.shape.arc()
    .outerRadius(props.pieWidth/2)
    .padAngle(.05)
    .innerRadius(30)

    const arcData = arcs[index];
    const path = (state.highlightedIndex === index) ? highlightedArc(arcData) : arc(arcData);

    return {
        path,
        color: _color(index)
    }

}

const _onPieItemSelected = (index) => {
    setState({...state, highlightedIndex: index});
    props.onItemSelected(index);
}

const margin = styles.container.margin;
const x = props.pieWidth / 2 + margin;
const y = props.pieHeight / 2 + margin;

return (
    <>
    <View width={props.width} height={props.height}>
        <Surface width={props.width} height={props.height}>
            <Group x={x} y={y}>
                {
                    props.data.map((item, index)=>(
                        <AnimShape 
                        key={'pie_shape_' + index}
                        color={_color(index)}
                        d={()=> _createPieChart(index)}
                        />
                    ))
                }
            </Group>
        </Surface>
        {/* <View>
            {
                props.data.map((item, index) => {
                    var fontWeight = state.highlightedIndex === index ? 'bold' : 'normal'
                    return(
                        <TouchableWithFeedback key={index} onPress={()=> _onPieItemSelected(index)}>
                            <View>
                                <Text style={[styles.label, {color: _color(index), fontWeight: fontWeight}]}>
                                    {_label(item)} : {_value(item)}%
                                </Text>
                            </View>
                        </TouchableWithFeedback>
                    )
                })
            }
        </View> */}
    </View>
    </>
)
}
export default Pie;

const styles = {
    container: {
        margin: 20
    },
    label: {
        fontSize: 15,
        marginTop: 5,
        fontWeight: 'normal'
    }
}

