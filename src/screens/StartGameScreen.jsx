import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import Card from 'components/Card';
import Input from 'components/Input';
import NumberContainer from 'components/NumberContainer';

import Colors from '../../constants/colors';

const StartGameScreen = (props) => {
  const [value, setValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const handleInput = (val) => {
    setValue(val.replace(/[^0-9]/g, '')); // 숫자가 아닌 것들을 '' 빈 스트링으로 변환하겠다
  };

  const resetButtonHandler = () => {
    setValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const parsedNumber = parseInt(value);

    if (Number.isNaN(parsedNumber) || parsedNumber <= 0 || parsedNumber > 99) {
      Alert.alert(
        'Invalid Number!',
        'Number has to be a number between 1 and 99.',
        [{text: 'Okay', style: 'destructive', onPress: resetButtonHandler}],
      );
      return;
    }

    setConfirmed(true);
    setSelectedNumber(parsedNumber);
    setValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.chosenNumber}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)} />
      </Card>
    )
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            keyboardType="number-pad"
            maxLength={2}
            value={value}
            onChangeText={handleInput}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetButtonHandler}
                color={Colors.secondary}
              />
            </View>
            <View style={styles.button}>
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
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  chosenNumber: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default StartGameScreen;
