import React from 'react';
import { ScrollView, StyleSheet, Text, FlatList, View } from 'react-native';
import api from '../apis/usgs';

export default class EarthquakeDetailScreen extends React.Component {
  state = {
    earthquake:{},
    loading: true,
  };
  componentDidMount(){
    const { navigation } = this.props;
    const eq = navigation.getParam('earthquake', 'no-id');
    api.getEarthquake(eq.properties.detail).then((res)=>{
      this.setState({loading:false, earthquake:res});
    });
  }

  renderItem = ({item})=><Text style={styles.item}>{item.name} - {item.distance} mi {item.direction}</Text>


  render(){
    return (
      <ScrollView style={styles.container}>
        { 
          this.state.loading ? <Text>Loading...</Text> :
          <ScrollView>
            <Text style={styles.labels}>Magnitude:</Text>
            <Text style={styles.item}>{this.state.earthquake.magnitude}</Text>
            <Text style={styles.labels}>Time:</Text>
            <Text style={styles.item}>{this.state.earthquake.time}</Text>
            <Text style={styles.labels}>Location:</Text>
            <Text style={styles.item}>{this.state.earthquake.place}</Text>
            <Text style={styles.labels}>Nearby Cities:</Text>
            <FlatList data={this.state.earthquake.nearbyCities} renderItem={this.renderItem}/>
          </ScrollView>
        }
      </ScrollView>
    );
  }
}

EarthquakeDetailScreen.navigationOptions = {
  title: '',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  item:{
    fontSize: 18,
    paddingLeft: 20
  },
  labels:{
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 10
  }
});
