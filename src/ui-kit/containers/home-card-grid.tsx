import React from 'react';
import { StyleSheet, View } from 'react-native';

interface HomeCardGridProps {
  children?: React.ReactNode;
}

export const HomeCardGrid = ({ children }: HomeCardGridProps) => {
  return (
    <View style={styles.grid}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    justifyContent: 'space-evenly',
  }
});
