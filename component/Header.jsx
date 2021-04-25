import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/color";
import TitleText from "./TitleText";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIOS: {
    backgroundColor: Colors.primary,
  },
  headerAndroid: {
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 18,
    color: Platform.OS === "android" ? Colors.primary : "white",
  },
});

export default Header;
