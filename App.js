import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Header from "./component/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };
  const fetchFonts =  () => {
    return Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
  };
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };
  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  // setGuessRounds(2);
  // setUserNumber(25)
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number" />
      {userNumber ? (
        guessRounds <= 0 ? (
          <GameScreen
            userChoice={userNumber}
            gameOverHandler={gameOverHandler}
          />
        ) : (
          <GameOverScreen
            guessRounds={guessRounds}
            userNumber={userNumber}
            configureNewGameHandler={configureNewGameHandler}
          />
        )
      ) : (
        <StartGameScreen startGameHandler={startGameHandler} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
