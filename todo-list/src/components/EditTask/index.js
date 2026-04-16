import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./style.js";

export default function EditTask({ visible, onClose, onSave, taskData }) {
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    priority: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setCurrentTask(
      taskData || {
        title: "",
        description: "",
        priority: "",
        startDate: "",
        endDate: "",
      }
    );
  }, [taskData]);

  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.modal}>
        <Text style={styles.titulo}>Editar tarefa</Text>
        <TextInput
          value={currentTask.title}
          style={styles.input}
          onChangeText={(t) => setCurrentTask({ ...currentTask, title: t })}
        />
        <TextInput
          value={currentTask.description}
          style={styles.input}
          onChangeText={(t) =>
            setCurrentTask({ ...currentTask, description: t })
          }
        />
        <TouchableOpacity style={styles.button} onPress={() => onSave(currentTask)}>
          <Text>Atualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
