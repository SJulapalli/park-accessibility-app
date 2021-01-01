import React, { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Accessibility from './Accessibility';
import Editor from './Editor';
import Adder from './Adder';
import MapView from 'react-native-maps'
import { View, Button, Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler';
  
var placeName, address, place_id = "";
var latitude, longitude = 0;

function HomeScreen({ navigation }) {
  return (
    <>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails= {true}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log(data);
          console.log(details);
          placeName= details.name
          address= details.formatted_address
          place_id= details.place_id
          latitude= details.geometry.location.lat
          longitude= details.geometry.location.lng
          navigation.navigate("Accessibility Information")
          }}
          // available options: https://developers.google.com/places/web-service/autocomplete
        query={{
          key: 'YOUR GOOGLE PLACES API KEY HERE',
          language: 'en', // language of the results
        }}/>
    </>
  )
}

function InfoScreen({ navigation }) {
 
  return (
    <>
      <MapView
        style={{height: 300}}
        region= {{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: .017,
          longitudeDelta: .017}}
          showsUserLocation={true}
      />
      <Accessibility
        style= {{flex:1}}
        placeName= {placeName}
        address= {address}
        placeID= {place_id}
      />
      
      <>
        <Button title= "Edit Accessibility Info"
                onPress = { () => navigation.navigate("Edit Accessibility Info")}/>
      </>
      <Text></Text>
      {/* <TouchableOpacity
               style = {{
                  backgroundColor: '#7a42f4',
                  padding: 10,
                  paddingLeft: 115,
                  margin: 5,
                  height: 40,
                  alignContent: 'center',
                  borderRadius: 7}}
               onPress = { () => navigation.navigate("Edit Accessibility Info")}>
                   <Text style={{color: 'white'}}> Edit Accessibility Info </Text>
            </TouchableOpacity> */}
    </>
  )
}

function EditScreen({ navigation }) {
  return (
    <View>
      <Editor placeID= {place_id}
              placeName= {placeName}/>
      <Button title="Return to Info"
              onPress={() => navigation.goBack()}/>
    </View>
  )
}

// function AddScreen({ navigation }) {
//   return (
//     <View>
//       <Adder placeID= {place_id}
//              placeName= {placeName}/>
//       <Button title="Return to Info"
//               onPress={() => navigation.goBack()}/>
//     </View>
//   )
// }

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Search for a Park">
          <Stack.Screen name="Search for a Park"
                        component={HomeScreen}/>
          <Stack.Screen name="Accessibility Information"
                        component={InfoScreen}/>
          <Stack.Screen name="Edit Accessibility Info"
                        component={EditScreen}/>
          {/* <Stack.Screen name="Add Accessibility Information"
                        component={AddScreen}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;