import { Task, deleteTask, getTasks } from "@/lib/database";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function TaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTask = () => {
    try {
      setTasks(getTasks());
    } catch (error) {
      console.error("Error loading tasks:", error);
      Alert.alert("Error", "Failed to load tasks");
    }
  };

  const handleDelete = (id: number) => {
    try {
      deleteTask(id);
      loadTask();
    } catch (error) {
      console.error("Failed to delete task:", error);
      Alert.alert("Error", "Failed to delete task");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTask();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Task List</Text>
      
      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/add-tasks")}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </Pressable>

      <FlatList
        data={tasks}
        extraData={tasks}
        style={styles.list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <Text style={styles.cardStatus}>{item.status}</Text>
            
            <View style={styles.buttonRow}>
              <Pressable
                style={styles.viewButton}
                onPress={() =>
                  router.push({
                    pathname: "/task-detail",
                    params: {
                      id: item.id.toString(),
                      title: item.title,
                      description: item.description,
                      status: item.status,
                    },
                  })
                }
              >
                <Text style={styles.viewButtonText}>View Task Details</Text>
              </Pressable>
              
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
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
    marginBottom: 16,
    color: "#000",
  },
  addButton: {
    backgroundColor: "#111",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  cardStatus: {
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },
  viewButton: {
    backgroundColor: "#1964bc",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#c52222",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
