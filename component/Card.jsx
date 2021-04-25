import React from "react";
import {View, StyleSheet} from "react-native";

const Card =props=>{
    return <View style={{...styles.card,...props.style}}>{props.children}</View>
};

const styles=StyleSheet.create({
    card:{
        shadowOffset:{width:0, height:2},
        shadowRadius:6, //for IOS
        shadowColor:'black',    //for IOS
        shadowOpacity:0.26, //for IOS
        backgroundColor:'white',    //for IOS
        elevation:8, //for android
        padding:20,
        borderRadius:10
    }
});

export default Card;
