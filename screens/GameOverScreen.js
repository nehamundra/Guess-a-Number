import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import Colors from "../constants/color";
import BodyText from "../component/BodyText";
import TitleText from "../component/TitleText";
import MainButton from "../component/MainButton";

const GameOverScreen = (props) => {
  return (
      <ScrollView>
        <View style={styles.screen}>
          <TitleText>The Game is Over!</TitleText>
          {/* <BodyText>Number of rounds taken: {props.guessRounds}</BodyText>
      <BodyText>Number was: {props.userNumber}</BodyText> */}
          <View style={styles.imageContainer}>
            <Image
              //   source={require("../assets/Images/success.png")}
              source={{
                uri:
                  "https://image.shutterstock.com/image-photo/evening-view-ama-dablam-on-260nw-258841592.jpg",
              }}
              style={styles.image}
              resize="cover"
              fa
            />
          </View>
          <View style={styles.resultContainer}>
            <BodyText>
              Your Phone took{" "}
              <Text style={styles.highlight}>{props.guessRounds}</Text> rounds
              to guess <Text style={styles.highlight}>{props.userNumber}</Text>
            </BodyText>
          </View>
          <MainButton onPress={props.configureNewGameHandler}>
            NEW GAME
          </MainButton>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  highlight: {
    color: Colors.accent,
    fontSize: 20,
  },
  resultContainer: {
    width: "80%",
    alignItems: "center",
    marginVertical: Dimensions.get("window").height / 60,
  },
});

export default GameOverScreen;
