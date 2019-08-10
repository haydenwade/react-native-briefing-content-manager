import React from 'react';
import { ScrollView, StyleSheet, Text, FlatList, Button, View } from 'react-native';
import api from '../apis/usgs';

export default class EarthquakesScreen extends React.Component {
  state = {
    earthquakes:[],
    loading: true
  };
  componentDidMount(){
    api.getEarthquakes().then((res)=>{
      this.setState({loading:false, earthquakes:res})
    });
  }

  renderItem = ({item})=><View style={styles.item}>
      <Text style={styles.headings}
            onPress={()=>this.props.navigation.navigate('EarthquakeDetails',{earthquake:item})}>{item.properties.title}
      </Text>
    </View>
  
  render(){
    return (
      <ScrollView style={styles.container}>
        { 
          this.state.loading ? <Text>Loading...</Text> :
          <FlatList data={this.state.earthquakes} renderItem={this.renderItem}/>
        }
      </ScrollView>
    );
  }
}

EarthquakesScreen.navigationOptions = {
  title: 'Earthquakes',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  item:{
    height: 50,
    borderStyle:'solid',
    borderWidth: 1,
    borderColor:'#c6c8ca',
    backgroundColor: '#6c757d',
    justifyContent: 'center'
  },
  headings:{
    fontSize: 18,
  }
});
