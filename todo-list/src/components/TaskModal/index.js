import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./style.js";
import { useEffect, useState } from "react";

export default function TaskModal({ visible, onClose, onSave, taskToEdit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
  });

  useEffect(() => {
    if (taskToEdit) setForm(taskToEdit);
    else
      setForm({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        priority: "",
      });
  }, [taskToEdit, visible]);

  return (
    <Modal visible={visible} animation="slide">
      <View style={styles.modalBody}>
        <Text style={styles.label}>
          {taskToEdit ? "Editar Tarefa" : "Nova Tarefa"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Título"
          value={form.title}
          onChangeText={(v) =>
            setForm({
              ...form,
              title: v,
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={form.description}
          onChangeText={(v) =>
            setForm({
              ...form,
              description: v,
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Início: DD/MM"
          value={form.startDate}
          onChangeText={(v) =>
            setForm({
              ...form,
              startDate: v,
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Data de fim: DD/MM"
          value={form.endDate}
          onChangeText={(v) =>
            setForm({
              ...form,
              endDate: v,
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Prioridade: Alta/Média/Baixa"
          value={form.priority}
          onChangeText={(v) =>
            setForm({
              ...form,
              priority: v,
            })
          }
        />

        <TouchableOpacity style={styles.btnSave} onPress={() => onSave(form)}>
          <Text style={styles.btnText}>Salvar Tarefa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.btnCancelar}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
