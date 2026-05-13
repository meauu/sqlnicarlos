import { addTask } from "@/lib/database";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddTaskScreen() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");

  const handleAddTask = () => {
    try {
      addTask(taskTitle, taskDescription, taskStatus);
      router.back();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Add Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter task description"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        value={taskDescription}
        onChangeText={setTaskDescription}
      />

      <Text style={styles.label}>Task Status</Text>

      <View style={styles.statusRow}>
        {["Pending", "Ongoing", "Completed"].map((status) => (
          <Pressable
            key={status}
            style={[
              styles.statusButton,
              taskStatus === status && styles.statusButtonActive,
            ]}
            onPress={() => setTaskStatus(status)}
          >
            <Text
              style={[
                styles.statusButtonText,
                taskStatus === status && styles.statusButtonTextActive,
              ]}
            >
              {status}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.submitButton} onPress={handleAddTask}>
        <Text style={styles.submitButtonText}>Add Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
  },
  statusButtonActive: {
    backgroundColor: "#111",
  },
  statusButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
  },
  statusButtonTextActive: {
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#111",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
