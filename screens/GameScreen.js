import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Dimensions
} from "react-native";
import NumberConatiner from "../component/NumberContainer";
import Card from "../component/Card";
import MainButton from "../component/MainButton";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from 'expo-screen-orientation'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const renderListItem = (value, numOfRounds) => (
  <View key={value} style={styles.listIem}>
    <Text>#{numOfRounds}</Text>
    <Text>{value}</Text>
  </View>
);
const GameScreen = (props) => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuess, setPastGuess] = useState([]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [layoutHeight, setLayoutHeight] = useState(
    Dimensions.get("window").height
  );
  const { userChoice, gameOverHandler } = props;
  useEffect(() => {
    const updateLayout = () => setLayoutHeight(Dimensions.get("window").height);
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });
  useEffect(() => {
    if (currentGuess === userChoice) {
      gameOverHandler(pastGuess.length);
    }
  }, [currentGuess, userChoice, gameOverHandler]);
  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "upper" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie", "You know this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    setCurrentGuess(
      generateRandomBetween(
        currentLow.current,
        currentHigh.current,
        currentGuess
      )
    );
    // setRounds(currentRounds=>currentRounds+1)
    setPastGuess((cutPastGuess) => [currentGuess, ...cutPastGuess]);
  };

  if (layoutHeight > 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess:</Text>
        <NumberConatiner>{currentGuess}</NumberConatiner>
        <Card style={styles.buttonContainer}>
          <MainButton onPress={() => nextGuessHandler("lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <MainButton onPress={() => nextGuessHandler("upper")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </Card>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuess.map((guess, index) =>
              renderListItem(guess, pastGuess.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess:</Text>
      <View style={styles.controls}>
        <MainButton onPress={() => nextGuessHandler("lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <NumberConatiner>{currentGuess}</NumberConatiner>
        <MainButton onPress={() => nextGuessHandler("upper")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </View>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuess.map((guess, index) =>
            renderListItem(guess, pastGuess.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 300,
    maxWidth: "80%",
  },
  controls:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:'80%'
  },
  listIem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  listContainer: {
    width: Dimensions.get("window").width > 350 ? "80%" : "90%",
    flex: 1,
  },
  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default GameScreen;
