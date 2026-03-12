import { View } from "react-native"
import { Checkbox, Text } from "react-native-paper";

export interface HomeTaskItemProps {
    task: {
        title: string;
        isCompleted: boolean;
    },
    index: number;
}

export const HomeTaskItem = ({ task, index }: HomeTaskItemProps) => {
    return (
        <View key={index} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
            <Checkbox
            status={task.isCompleted ? 'checked' : 'unchecked'}
            />
            <Text>
            {task.title}
            </Text>
        </View>
    )
}
