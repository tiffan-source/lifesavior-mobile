import { TodoDependenciesProvider } from '@/src/domains/todo/presentation/context/todo-dependencies.provider';
import { theme } from '@/theme.config';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <TodoDependenciesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </TodoDependenciesProvider>
    </PaperProvider>
  );
}
