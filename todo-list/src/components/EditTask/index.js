import React, { useState, useEffect } from "react-native";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import style from "./style.js";

export default function EditTask({ visible, onClose, onSave, taskData }) {
  const [currentTask, setCurrentTask] = useState(taskData);

  useEffect(() => {
    setCurrentTask(taskData);
  }, [taskData]);
  return (
    <Modal visible={visible} animationType="fade">
      <View style={style.modal}>
        <Text style={style.titulo}>Editar tarefa</Text>
        <TextInput
          value={currentTask.title}
          style={style.input}
          onChangeText={(t) => setCurrentTask({ ...currentTask, title: t })}
        ></TextInput>
        <TextInput
          value={currentTask.description}
          style={style.input}
          onChangeText={(t) =>
            setCurrentTask({ ...currentTask, description: t })
          }
        ></TextInput>
        <TouchableOpacity style={style.button} onPress={() => onSave(currentTask)}>
          <Text>Atualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.button} onPress={onClose}>
          <Text>Cancelar</Text>
        </TouchableOpacity>

      </View>
    </Modal>
  );
}
