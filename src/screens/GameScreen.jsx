import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';

import NumberContainer from 'components/NumberContainer';
import Card from 'components/Card';

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const ranNum = Math.floor(Math.random() * (max - min)) + min;

  if (ranNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return ranNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumber(1, 100, props.userChoice),
  );

  const currentLow = useRef(1);  // 찾아보기. state처럼 값을 갖고 있지만, 변화할 때 마다 render를 일으키진 않는다
  const currentHigh = useRef(100);

  const nextGuessHandler = (direction) => {
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'grater' && currentGuess > props.userChoice)) {
      Alert.alert('솔직하게 하세요', '거짓말하면 손모가지 날라가붕게', [{ text: '알았어', style: 'cancel' }]);
      return;
    } if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess
    }

    const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});

export default GameScreen;
