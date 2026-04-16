import { View, Text, TouchableOpacity } from "react-native";
import { theme } from "../../styles/global";
import { styles } from "./styles";

export default function TaskCard({ task, onDelete, onEdit }) {
    const priorityColor = theme.colors.priority[task.priority] || theme.colors.textSub;
    const startDate = task.startDate ?? task.start ?? "";
    const endDate = task.endDate ?? task.end ?? "";

    return (
        <View style={[styles.card, { borderLeftColor: priorityColor }]}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={styles.desc}>{task.description}</Text>
                <Text style={[styles.badge, { color: priorityColor }]}>● {task.priority}</Text>
                <Text style={styles.date}>{startDate} - {endDate}</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit}>
                    <Text style={styles.icon}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Text style={styles.icon}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}