import React from 'react';
import { SurfaceContainer } from './surface-container';

interface TaskListProps {
  children?: React.ReactNode;
}


/**
 * Liste verticale de tâches avec indicateur visuel de complétion.
 */
export const TaskList = ({ children }: TaskListProps) => {
  return (
    <SurfaceContainer>
        {children}
    </SurfaceContainer>
  );
};
