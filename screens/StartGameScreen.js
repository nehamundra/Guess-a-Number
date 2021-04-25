import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../component/Card";
import Colors from "../constants/color";
import Input from "../component/Input";
import NumberContainer from "../component/NumberContainer";
import BodyText from "../component/BodyText";
import TitleText from "../component/TitleText";
import MainButton from "../component/MainButton";

const StartGameScreen = (props) => {
  const [enteredVlaue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [LayoutWidth, setLayoutWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const updateLayout = () => setLayoutWidth(Dimensions.get("window").width);
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });
  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, "")); //removes ',' and '.' from the entered text
  };
  const confirmInputHandler = () => {
    const chosenValue = parseInt(enteredVlaue);
    if (isNaN(chosenValue) || chosenValue <= 0 || chosenValue > 99) {
      Alert.alert(
        "Invalid Number!", //heading
        "The number has to be between 1 and 99", // message
        [{ text: "okay", style: "", onPress: resetInputHandler }] // button specifications
      );
      return;
    }
    setConfirmed(true);
    setEnteredValue("");
    setSelectedNumber(chosenValue);
    Keyboard.dismiss();
  };
  const resetInputHandler = () => {
    setSelectedNumber("");
    setEnteredValue("");
    setConfirmed(false);
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.startGameHandler(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }
  return (
    // Press anywhere on the screen to dismiss the keyborad
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={styles.title}>The Game Screen!</Text>
            <Card style={styles.inputContainer}>
              <TitleText style={styles.textNumber}>Select a Number</TitleText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad" //sets soft keyboard to numbers only
                maxLength={2}
                onChangeText={(text) => numberInputHandler(text)}
                value={enteredVlaue}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: LayoutWidth / 4 }}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={Colors.accent}
                  />
                </View>
                <View style={{ width: LayoutWidth / 4 }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    alignItems: "center",
    fontFamily: "open-sans-bold",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  textNumber: {
    fontFamily: "open-sans-bold",
  },
});

export default StartGameScreen;
