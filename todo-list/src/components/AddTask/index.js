import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./style.js";

export default function AddTask({ visible, onClose, onSave, taskToEdit }) {
  const [task, setTask] = useState(
    taskToEdit || { title: "", description: "", priority: "", startDate: "", endDate: "" },
  );

  const handleSave = () => {
    onSave(task);
    setTask({ title: "", description: "", priority: "", startDate: "", endDate: "" });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <Text style={styles.titulo}>Nova tarefa</Text>
        <TextInput
          placeholder="Titulo"
          value={task.title}
          style={styles.input}
          onChangeText={(t) =>
            setTask({
              ...task,
              title: t,
            })
          }
        />
        <TextInput
          placeholder="Descrição"
          value={task.description}
          style={styles.input}
          onChangeText={(d) =>
            setTask({
              ...task,
              description: d,
            })
          }
        />
        <TextInput
          placeholder="Prioridade baixa, média ou alta"
          value={task.priority}
          style={styles.input}
          onChangeText={(p) =>
            setTask({
              ...task,
              priority: p,
            })
          }
        />
        <TextInput
          placeholder="Data de início: DD/MM"
          value={task.startDate}
          style={styles.input}
          onChangeText={(s) =>
            setTask({
              ...task,
              startDate: s,
            })
          }
        />
        <TextInput
          placeholder="Data de fim"
          value={task.endDate}
          style={styles.input}
          onChangeText={(e) =>
            setTask({
              ...task,
              endDate: e,
            })
          }
        />

        <TouchableOpacity style={styles.btnSalvar} onPress={handleSave}>
          <Text>Salvar Tarefa</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose}>
          <Text style={styles.txtCancelar}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
