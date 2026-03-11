import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TaskListProps {
  children?: React.ReactNode;
}


/**
 * Liste verticale de tâches avec indicateur visuel de complétion.
 */
export const TaskList = ({ children }: TaskListProps) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 14,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#0a7ea4',
    borderColor: '#0a7ea4',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    fontSize: 15,
    color: '#11181C',
    flex: 1,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
});
