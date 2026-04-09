import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import TaskModal from './src/components/TaskModal';
import { theme } from './src/styles/global';

const defaultTask = {
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  priority: 'Média',
};

function buildTask(task, id = Date.now().toString()) {
  return {
    id,
    title: task.title.trim(),
    description: task.description.trim(),
    startDate: task.startDate.trim(),
    endDate: task.endDate.trim(),
    start: task.startDate.trim(),
    end: task.endDate.trim(),
    priority: task.priority.trim() || 'Média',
  };
}

export default function App() {
  const [tasks, setTasks] = useState([
    buildTask(
      {
        title: 'Revisar layout',
        description: 'Conferir a tela inicial do projeto.',
        startDate: '09/04',
        endDate: '10/04',
        priority: 'Alta',
      },
      '1'
    ),
    buildTask(
      {
        title: 'Ajustar componentes',
        description: 'Padronizar modal e card da lista.',
        startDate: '10/04',
        endDate: '11/04',
        priority: 'Média',
      },
      '2'
    ),
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  function handleOpenNewTask() {
    setTaskToEdit(null);
    setModalVisible(true);
  }

  function handleOpenEditTask(task) {
    setTaskToEdit(task);
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
    setTaskToEdit(null);
  }

  function handleSaveTask(form) {
    const normalizedTask = buildTask(form, taskToEdit?.id ?? Date.now().toString());

    setTasks((currentTasks) => {
      if (taskToEdit) {
        return currentTasks.map((task) =>
          task.id === taskToEdit.id ? normalizedTask : task
        );
      }

      return [normalizedTask, ...currentTasks];
    });

    handleCloseModal();
  }

  function handleDeleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  function renderTask({ item }) {
    const priorityColor = theme.colors.priority[item.priority] || theme.colors.textSub;

    return (
      <View style={[styles.card, { borderLeftColor: priorityColor }]}>
        <View style={styles.cardContent}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
          <Text style={[styles.priority, { color: priorityColor }]}>
            {item.priority}
          </Text>
          <Text style={styles.taskDates}>
            {item.startDate} - {item.endDate}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleOpenEditTask(item)}>
            <Text style={styles.actionButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => handleDeleteTask(item.id)}>
            <Text style={styles.actionButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="dark" />
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <Text style={styles.kicker}>Organize o dia</Text>
        <Text style={styles.title}>Todo List</Text>
        <Text style={styles.subtitle}>
          Crie, edite e acompanhe suas tarefas em um só lugar.
        </Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{tasks.length}</Text>
            <Text style={styles.summaryLabel}>tarefas</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{tasks.filter((task) => task.priority === 'Alta').length}</Text>
            <Text style={styles.summaryLabel}>altas</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={tasks.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nenhuma tarefa cadastrada</Text>
            <Text style={styles.emptyText}>Toque no botão + para adicionar a primeira tarefa.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab} onPress={handleOpenNewTask}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <TaskModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
  },
  kicker: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: theme.colors.textSub,
    marginBottom: 6,
    fontWeight: '700',
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    color: theme.colors.textMain,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.textSub,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.textMain,
  },
  summaryLabel: {
    marginTop: 4,
    fontSize: 13,
    color: theme.colors.textSub,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyList: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textMain,
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: theme.colors.textSub,
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    gap: 12,
  },
  cardContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.textMain,
  },
  taskDescription: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.textSub,
  },
  priority: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
  },
  taskDates: {
    marginTop: 4,
    fontSize: 12,
    color: '#94A3B8',
  },
  actions: {
    justifyContent: 'center',
    gap: 8,
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: theme.colors.danger,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '700',
    marginTop: -2,
  },
});
