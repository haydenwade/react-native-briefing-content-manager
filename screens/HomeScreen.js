import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Earthquaker!</Text>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',

  },
  title:{
    fontSize: 30,
    fontWeight:'bold'
  }
});
