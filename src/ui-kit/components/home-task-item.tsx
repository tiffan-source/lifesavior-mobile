import { View } from "react-native"
import { Text } from "react-native";
import { StyleSheet } from "react-native";

export interface HomeTaskItemProps {
    task: {
        title: string;
        isCompleted: boolean;
    },
    index: number;
}

export const HomeTaskItem = ({ task, index }: HomeTaskItemProps) => {
    return (
        <View key={index} style={styles.row}>
            <View
            style={[
                styles.checkbox,
                task.isCompleted && styles.checkboxCompleted,
            ]}
            >
            {task.isCompleted && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text
            style={[
                styles.title,
                task.isCompleted && styles.titleCompleted,
            ]}
            >
            {task.title}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
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
