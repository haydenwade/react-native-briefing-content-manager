import React from 'react';
import { ScrollView, StyleSheet, Text, FlatList, Button } from 'react-native';
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

  renderItem = ({item})=><Button 
  style={styles.item} 
  title={item.properties.title} 
  onPress={()=>this.props.navigation.navigate('EarthquakeDetails',{earthquake:item})}/>
  
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
  items:{
    height: 20
  }
});
