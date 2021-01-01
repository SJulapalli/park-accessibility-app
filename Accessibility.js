import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import {firebase} from './FireConfig'

class Accessibility extends Component {
    state = {
        wa_ramps: '',
        wa_activities: '',
        flooring: '',
        idf_activities: '',
        water_fountains: '', 
        isFound:false
    };

    constructor(props) {
        super(props);
        firebase.auth().signInWithEmailAndPassword("suhasjulapalli@gmail.com", "firebase");
    }

    // addPlace(docid, placeName, ramps) {
    //     var placeRef = firebase.firestore().collection("Places");
    //     var res = placeRef.doc(docid).set({
    //           name: placeName,
    //           wa_ramps: ramps
    //         });
    //     console.log("Document " + docid +  " added to firestore");
    // }

     getPlace(docid) {
        if(this.state.placeID === docid) {
            // Place is already present in state so return it
            var place = {
                name: this.state.name,
                wa_ramps: this.state.wa_ramps,
                wa_activities: this.state.wa_activities,
                flooring: this.state.flooring,
                idf_activities:this.state.idf_activities,
                water_fountains: this.state.water_fountains
            };

            return place;
        }
        else { 
            var placeRef = firebase.firestore().collection("Places");
            placeRef.doc(docid).get()
            .then((res) => {
                if (res.exists) {
                const user = res.data();
                this.setState({
                    placeID: docid,
                    name: user.name,
                    wa_ramps: user.wa_ramps,
                    wa_activities: user.wa_activities,
                    flooring: user.flooring,
                    idf_activities: user.idf_activities,
                    water_fountains: user.water_fountains,
                    isFound: true
                });
                console.log("Found "+ docid + " Name is " + user.name);
                } else {
                    console.log("Document " + docid +  " does not exist!");
                    this.setState({
                        placeID : docid,
                        name: "",
                        wa_ramps: "",
                        wa_activities: "",
                        flooring: "",
                        idf_activities: "",
                        water_fountains: "",
                        isFound: false
                    });
                }
            });

            place = {
                name: this.state.name,
                wa_ramps: this.state.wa_ramps,
                wa_activities: this.state.wa_activities,
                flooring: this.state.flooring,
                idf_activities:this.state.idf_activities,
                water_fountains: this.state.water_fountains
            };
            return place;
        }
    }

    render() {
        // this.addPlace(this.props.placeID, this.props.placeName, "Ramps are present");
        var place = this.getPlace(this.props.placeID);
       
       return (
        <ScrollView>
            <Text style={{marginTop: 5, marginLeft: 5}}>Place Name: {this.props.placeName}</Text>
            <Text style={{marginBottom: 10, marginLeft: 5}}>Address: {this.props.address}</Text>
            <Text style={{margin: 5}}>Wheelchair Accessiblity Ramps: {place.wa_ramps}</Text>
            <Text style={{margin: 5}}>Wheelchair Accessible Activities: {place.wa_activities}</Text>
            <Text style={{margin: 5}}>Park Flooring Materials: {place.flooring}</Text>
            <Text style={{margin: 5}}>Intellectually-Disabled-Friendly Activities: {place.idf_activities}</Text>
            <Text style={{margin: 5}}>Water Fountain Availability: {place.water_fountains}</Text>
        </ScrollView>
    );
    }
}

export default Accessibility;