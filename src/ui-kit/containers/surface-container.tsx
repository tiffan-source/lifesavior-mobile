import { Surface } from "react-native-paper";

interface SurfaceContainerProps {
  children: React.ReactNode;
}

export const SurfaceContainer = ({ children }: SurfaceContainerProps) => {
  return (
    <Surface style={{ padding: 16 }}>
      {children}
    </Surface>
  );
}