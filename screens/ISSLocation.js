import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , SafeAreaView, Platform, ImageBackground, TouchableOpacity, Image,Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import axios from "axios";

export default class ISSLocation extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      location:{}
    }
  }
  componentDidMount(){
    this.getIssLocation()
  }

  getIssLocation =() =>{
    axios
            .get("https://api.wheretheiss.at/v1/satellites/25544")
            .then(response => {
                this.setState({ location: response.data })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
  }
  render(){
    if (Object.keys(this.state.location).length === 0) {
      return (
          <View
              style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
              }}>
              <Text>Loading...</Text>
          </View>
      )
  }else{
    return(
      <View style={styles.container}>
        <SafeAreaView  style ={ styles.androidView} />
        <ImageBackground source={require('../assets/iss_bg.jpg')} style={styles.bgImage}>
        <View style={styles.titleBar}>
          <Text style ={styles.titleText}> ISS Tracker App</Text>
        </View>
        <View style= {styles.mapcontainer}>
        <MapView
            style={styles.map}
              region={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                  latitudeDelta: 100,
                  longitudeDelta: 100}}>

                  <Marker
                                    coordinate={{ latitude: this.state.location.latitude, longitude: this.state.location.longitude }}
                                >
                                    <Image source={require('../assets/iss_icon.png')} style={{ height: 50, width: 50 }} />
                                </Marker>
                                
          </MapView>
        </View>
        </ImageBackground>
      </View>
  )

  }
      

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleBar:{
    flex:0.15,
    justifyContent:"center",
    alignItems: "center"

  },
  titleText:{
    fontWeight:"bold",
    fontSize:40,
    color:"white"

  },
  androidView:{
    marginTop: Platform.OS == "android"? StatusBar.currentHeight : 0
  },
  bgImage:{
    flex:1,
    resizeMode:'cover'
  },
  mapcontainer:{
    flex: 0.7
  },
  map:{
    width: "100%",
    height:"100%"
  }
});
