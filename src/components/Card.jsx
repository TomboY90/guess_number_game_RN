import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = (props) => {
  return (
    <View style={{...styles.card, ...props.style}}>{props.children}</View>
  )
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5, // for Android
  }
});

export default Card;
