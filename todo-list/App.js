import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "./styles/global";
import SearchBar from "./components/SearchBar";
import TaskCard from "./components/TaskCard";
import EditTask from "./components/EditTask";
import TaskModal from "./components/TaskModal";
import AddTask from "./src/components/AddTask";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
}