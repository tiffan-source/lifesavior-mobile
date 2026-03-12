import React from 'react';

import { Button } from '@/src/ui-kit/components/button';
import { HomeTaskItem } from '@/src/ui-kit/components/home-task-item';
import { StatsCard } from '@/src/ui-kit/components/stats-card';
import { TextInput } from '@/src/ui-kit/components/text-input';
import { SectionHeader } from '../../../../ui-kit/components/section-header';
import { ShowcaseCard } from '../../../../ui-kit/components/showcase-card';
import { HomeCardGrid } from '../../../../ui-kit/containers/home-card-grid';
import { TaskList } from '../../../../ui-kit/containers/task-list';
import { ScreenLayout } from '../../../../ui-kit/layouts/screen-layout';
import { useCreateTodo } from '../hooks/use-create-todo';

/**
 * Écran d'accueil de l'application.
 * Affiche un aperçu global : titre, showcase, grille de raccourcis, formulaire de création et liste de tâches.
 */
export const HomeScreen = () => {
    const { title, setTitle, error, isSubmitting, submit } = useCreateTodo();
    const tasks = [
        { title: 'Prendre ses médicaments', isCompleted: true },
        { title: 'Faire 30 min de marche', isCompleted: false },
        { title: 'Boire 2L d\'eau', isCompleted: false },
        { title: 'Méditation 10 min', isCompleted: true },
        { title: 'Appeler le médecin', isCompleted: false },
    ]
    return (
    <ScreenLayout>
      <SectionHeader
        title="Bonjour 👋"
        subtitle="Voici un aperçu de votre journée"
      />

      <ShowcaseCard
        title="Objectif du jour"
        description="Terminer 3 tâches importantes avant ce soir. Vous êtes sur la bonne voie !"
      />

      <HomeCardGrid>
        <StatsCard />
        <StatsCard />
        <StatsCard />
        <StatsCard />
      </HomeCardGrid>

      <TextInput
        label="Nouvelle tâche"
        value={title}
        onChangeText={setTitle}
        placeholder="Ex: Faire les courses"
        errorMessage={error ?? undefined}
      />
      <Button label="Ajouter" onPress={submit} loading={isSubmitting} disabled={isSubmitting} />

      <TaskList>
        {tasks.map((task, index) => (
          <HomeTaskItem key={index} task={task} index={index} />
        ))}
      </TaskList>
    </ScreenLayout>
  );
};
