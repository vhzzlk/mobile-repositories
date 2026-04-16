import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "./src/styles/global";
import SearchBar from "./src/components/SearchBar";
import TaskCard from "./src/components/TaskCard";
import TaskModal from "./src/components/TaskModal";

function buildTask(task, id = Date.now().toString()) {
  const startDate = (task.startDate ?? task.start ?? "").trim();
  const endDate = (task.endDate ?? task.end ?? "").trim();

  return {
    id,
    title: (task.title ?? "").trim(),
    description: (task.description ?? "").trim(),
    startDate,
    endDate,
    priority: (task.priority ?? "Média").trim() || "Média",
  };
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  function handleOpenAdd() {
    setSelectedTask(null);
    setModalVisible(true);
  }

  function handleOpenEdit(task) {
    setSelectedTask(task);
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
    setSelectedTask(null);
  }

  function handleSaveTask(form) {
    const normalizedTask = buildTask(form, selectedTask?.id ?? Date.now().toString());

    if (!normalizedTask.title) {
      return;
    }

    setTasks((currentTasks) => {
      if (selectedTask) {
        return currentTasks.map((task) =>
          task.id === selectedTask.id ? normalizedTask : task
        );
      }

      return [normalizedTask, ...currentTasks];
    });

    handleCloseModal();
  }

  function handleDeleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Tarefas</Text>

      <SearchBar value={searchText} onChangeText={setSearchText} />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onEdit={() => handleOpenEdit(item)}
            onDelete={() => handleDeleteTask(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>}
      />

      <TouchableOpacity style={styles.fab} onPress={handleOpenAdd}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <TaskModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        taskToEdit={selectedTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    paddingTop: 56,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.textMain,
    marginBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: theme.colors.textSub,
    fontSize: 15,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 26,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    lineHeight: 30,
    fontWeight: "700",
  },
});
