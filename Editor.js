import React, { Component } from 'react'
import { Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import { firebase } from './FireConfig'

class Editor extends Component {
   state = {
      wa_ramps: '',
      wa_activities: '',
      flooring: '',
      idf_activities: '',
      water_fountains: '',
      prev_wa_ramps: '',
      prev_wa_activities: '',
      prev_flooring: '',
      prev_idf_activities: '',
      prev_water_fountains: '',
   }

   constructor(props) {
     super(props);
     firebase.auth().signInWithEmailAndPassword("suhasjulapalli@gmail.com", "firebase");
     const placeRef = firebase.firestore().collection("Places").doc(this.props.place_id).get()
      .then((res) => {
         if (res.exists) {
            const user = placeRef.data();
            this.setState({
               wa_ramps: user.wa_ramps,
               wa_activities: user.wa_activities,
               flooring: user.flooring,
               idf_activities: user.idf_activities,
               water_fountains: user.water_fountains,
            });
         }
      })
   }

   handleWARamps = (text) => {
      this.setState({wa_ramps: text});
   }
   handleWAActvities = (text) => {
      this.setState({wa_activities: text});
   }
   handleFlooring = (text) => {
       this.setState({flooring: text});
   }
   handleIDFActivities = (text) => {
       this.setState({idf_activities: text});
   }
   handleFountains = (text) => {
      this.setState({water_fountains: text});
   }

   

   editPlace = (docid) => {
      var placeRef = firebase.firestore().collection("Places");
      var edittedPlace = {
         name: this.props.placeName,
         wa_ramps: this.state.wa_ramps,
         wa_activities: this.state.wa_activities,
         flooring: this.state.flooring,
         idf_activities: this.state.idf_activities,
         water_fountains: this.state.water_fountains
      }
      placeRef.doc(docid).set(edittedPlace)

      // if (!this.state.wa_ramps==="" && !this.state.wa_activities==="" &&
      // !this.state.flooring==="" && !this.state.idf_activities==="" &&
      // !this.state.water_fountains==="") {
      //    var edittedPlace = {
      //          name: this.props.placeName,
      //          wa_ramps: this.state.wa_ramps,
      //          wa_activities: this.state.wa_activities,
      //          flooring: this.state.flooring,
      //          idf_activities: this.state.idf_activities,
      //          water_fountains: this.state.water_fountains
      //    }
      //    placeRef.doc(docid).set(edittedPlace)
      // }  else {
      //       edittedPlace = {
      //          name: this.state.name,
      //          wa_ramps: this.state.prev_wa_ramps,
      //          wa_activities: this.state.prev_wa_activities,
      //          flooring: this.state.prev_flooring,
      //          idf_activities: this.state.prev_idf_activities,
      //          water_fountains: this.state.prev_water_fountains
      //       }
      // }
   }

   render() {
      firebase.firestore().collection("Places").doc(this.props.placeID).get()
         .then((res) => {
            const user = res.data()
            if(res.exists) {
               this.setState({
                  prev_wa_ramps: user.wa_ramps,
                  prev_wa_activities: user.wa_activities,
                  prev_flooring: user.flooring,
                  prev_idf_activities: user.idf_activities,
                  prev_water_fountains: user.water_fountains
               });
         }
      })
      return (
         <ScrollView style = {styles.container}>
            
            <Text style={{marginLeft: 5, marginTop: 5}}>Previous Wheelchair Accessibility Info:</Text>
            <Text style={{marginLeft: 5}}>{this.state.prev_wa_ramps}</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               //placeholder = {this.state.wa_ramps}
               placeholder = "  Enter Wheelchair Accessiblity Ramps Info Here"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleWARamps}/>
            <Text style={{marginLeft: 5}}>Previous Wheelchair Accessible Activities Info:</Text>
            <Text style={{marginLeft: 5}}>{this.state.prev_wa_activities}</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               //placeholder = {this.state.wa_activities}
               placeholder = "  Enter Wheelchair Accessible Activities Info Here"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleWAActvities}/>
            <Text style={{marginLeft: 5}}>Previous Park Flooring Info:</Text>
            <Text style={{marginLeft: 5}}>{this.state.prev_flooring}</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               //placeholder = {this.state.flooring}
               placeholder = "  Enter Park Flooring Info Here"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleFlooring}/>
            <Text style={{marginLeft: 5}}>Previous IDF Activities Info:</Text>
            <Text style={{marginLeft: 5}}>{this.state.prev_idf_activities}</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               //placeholder = {this.state.idf_activities}
               placeholder = "  Enter IDF Activities Info Here"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleIDFActivities}/>
            <Text style={{marginLeft: 5}}>Previous Enter Water Fountain Availability Info:</Text>
            <Text style={{marginLeft: 5}}>{this.state.prev_water_fountains}</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               //placeholder = {this.state.water_fountains}
               placeholder = "  Water Fountain Availability Info Here"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleFountains}/>


            <TouchableOpacity
               style = {styles.submitButton}
               onPress = { () => {
                  this.editPlace(this.props.placeID)
                      }
                  }>
                   <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </ScrollView>
      )
   }
}
export default Editor;

const styles = StyleSheet.create({
   container: {
      paddingTop: 5,
      height: 560,
   },
   input: {
      margin: 5,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      paddingLeft: 150,
      margin: 5,
      height: 40,
      borderRadius: 7
   },
   submitButtonText:{
      color: 'white'
   }
})