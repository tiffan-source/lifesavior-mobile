import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';


export const Card = () => {
  return (
    <View style={styles.card}>
      <Text>Card 1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 100,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
