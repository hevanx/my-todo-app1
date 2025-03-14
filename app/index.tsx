import { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { Button, CheckBox, Card } from "@rneui/themed";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", description: "Complete React Native assignment", completed: false },
    { id: "2", description: "Do homework by 10:30", completed: false },
  ]);

  type Task = {
    id: string;
    description: string;
    completed: boolean;
  };
  const [newTask, setNewTask] = useState("");

  const toggleCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now().toString(), description: newTask, completed: false }]);
    setNewTask("");
  };

  const renderItem = ({ item }: { item: Task }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.taskContainer}>
        <CheckBox checked={item.completed} onPress={() => toggleCompletion(item.id)} />
        <Text style={[styles.taskText, item.completed && styles.completedTask]}>
          {item.description}
        </Text>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList data={tasks} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task..."
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#90EF99" },
  card: { borderRadius: 10, padding: 15, backgroundColor: "#FFF" },
  taskContainer: { flexDirection: "row", alignItems: "center" },
  taskText: { fontSize: 18, fontWeight: "500", color: "#333" },
  completedTask: { textDecorationLine: "line-through", color: "#999" },
  inputContainer: { flexDirection: "row", marginTop: 20, alignItems: "center" },
  input: { flex: 1, borderBottomWidth: 1, padding: 5, marginRight: 10, fontSize: 16 },
});
