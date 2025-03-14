import React, { useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, TextInput, View, Text, Platform } from "react-native";
import { Button, CheckBox, Card } from "@rneui/themed";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: "1", description: "Complete React Native assignment", completed: false },
    { id: "2", description: "Review UX case study", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const toggleCompletion = (id) => {
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

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.taskContainer}>
        <CheckBox
          checked={item.completed}
          onPress={() => toggleCompletion(item.id)}
        />
        <Text style={[styles.taskText, item.completed && styles.completedTask]}>
          {item.description}
        </Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8F9FA", paddingTop: Platform.OS === 'android' ? 25 : 0 },
  card: { borderRadius: 10, padding: 15, backgroundColor: "#FFF" },
  taskContainer: { flexDirection: "row", alignItems: "center" },
  taskText: { fontSize: 18, fontWeight: "500", color: "#333" },
  completedTask: { textDecorationLine: "line-through", color: "#999" },
  inputContainer: { flexDirection: "row", marginTop: 20, alignItems: "center" },
  input: { flex: 1, borderBottomWidth: 1, padding: 5, marginRight: 10, fontSize: 16 },
});
