import React from "react";
import {StyleSheet,Text,View,SafeAreaView,Platform,} from "react-native";

import { Camera } from "expo-camera"; 
import { StatusBar } from "expo-status-bar";
import * as FaceDetector from "expo-face-detector";

import Filter1 from "./Filter1";

export default class Main extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            faces:[]
        }
    }

    async componentDidMount(){
        const {status} = await Camera.requestCameraPermissionsAsync();
        this.updateCameraState(status)
    }

    updateCameraState=(status)=>{
        this.setState({hasCameraPermissions:status === "granted"})
    }
     
    onFacesDetected=(faces)=>{
       this.setState({faces:faces})
    }

    render(){
        const {hasCameraPermissions} = this.state;
        if(hasCameraPermissions===null){
            return(
                <View></View>
            )
        }
        if(hasCameraPermissions===false){
            return(
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }
        console.log(this.state.faces)
        return(
            <View style={styles.container}>
               <SafeAreaView style={styles.droidSafeArea}/>
               
               {/* heading */}
               <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>LOOK ME...</Text>
               </View>
               
               {/* camera */}
               <View style={styles.cameraStyle}>
                 <Camera
                  style={{flex:1}}
                  type={Camera.Constants.Type.front}
                  faceDetectorSettings={{
                    mode:FaceDetector.FaceDetectorMode.fast,
                    detectLandmarks:FaceDetector.FaceDetectorLandmarks.all,
                    runClassifications:FaceDetector.FaceDetectorClassifications.all,
                  }}
                  onFacesDetected={this.onFacesDetected}
                 />
                 {this.state.faces.map(face=>{
                    return(
                    <Filter1 key={face.faceID} face={face}/>
                    )
                   })}
               </View>

               {/* lower container */}
               <View style={styles.lowerContainer}>
    
               </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    droidSafeArea: { 
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 
    }, 
    headingContainer: { 
        flex: 0.1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }, 
    titleText: { 
        fontSize: 30 
    }, 
    cameraStyle: { 
        flex: 0.65 
    }, 
    lowerContainer: {

    }
})