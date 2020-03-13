import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import Pie  from './js/charts/Pie'
import Theme from './js/theme/index'
import data from './resources/data'

const App = () => {
  const [state, setState] = useState({
    activeIndex: 0,
    spendingsPerYear: data.spendingsPerYear
  })

  const _onPieItemSelected = newIndex => {
    setState({...state, activeIndex: newIndex, spendingsPerYear: _shuffle(data.spendingsPerYear)})
  }

  const _shuffle = a => {
    for(let i = a.length; i; i-- ){
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i-1]];
    }
    return a;
  }

  const height = 200;
  const width = 500;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.chart_title}>Distribution pf spending this month</Text>
        <Pie 
        pieWidth={150}
        pieHeight={150}
        onItemSelected={_onPieItemSelected}
        colors={Theme.colors}
        width={width}
        height={height}
        data={data.spendingsLastMonth}
        />
      </View>
    </ScrollView>
    
  );
};

const styles = {
  container:{
    backgroundColor: 'whitesmoke',
    marginTop: 21
  },
  chart_title:{
    paddingTop: 15,
    textAlign: 'center',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    backgroundColor: 'white',
    color: 'grey',
    fontWeight: 'bold'
  }
};

export default App;
