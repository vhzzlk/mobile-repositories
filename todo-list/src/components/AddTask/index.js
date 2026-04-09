import React, {useState} from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import style from "./style.js";

export default function TaskModal({ visible, onClose, onSave, taskToEdit }) {
    const [task, setTask] = useState(taskToEdit || { title: "", description: "" });

    const HandleSave = () => {
        onSave(task);
        setTask({ title: "", description: "" , priority: "", star: "", end: ""});
    };
    return (
        <Modal visible={visible} animationType="slide">
            <View style={style.modal}>
                <Text style={style.titulo}>
                    Nova tarefa
                </Text>
                <TextInput
                    placeholder="Titulo"
                    style={style.input}
                    onChangeText = {t => setTask({
                        ...task, title: t
                    })}
                />
                <TextInput
                    placeholder="Descrição"
                    style={style.input}
                    onChangeText = {d => setTask({
                        ...task, description: d
                    })}
                />
                <TextInput
                    placeholder="Prioridade baixa, média ou alta"
                    style={style.input}
                    onChangeText = {p => setTask({
                        ...task, priority: p
                    })}
                />
                <TextInput
                    placeholder="Data de início: DD/MM"
                    style={style.input} 
                    onChangeText = {s => setTask({
                        ...task, start: s
                    })}
                />
                   <TextInput
                    placeholder="Data de fim"
                    style={style.input} 
                    onChangeText = {e => setTask({
                        ...task, end: e
                    })}
                />

                <TouchableOpacity style={style.btnSalvar} onPress={HandleSave}>
                    <Text>Salvar Tarefa</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onClose}>
                    <Text style={style.txtCancelar}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
        )   ;
}
    


