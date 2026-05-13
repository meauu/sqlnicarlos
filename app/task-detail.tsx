import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function TaskDetailScreen() {
  const { id, title, description, status } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    status: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Task Detail</Text>
      
      <Text style={styles.detailText}>ID: {id}</Text>
      <Text style={styles.detailText}>Title: {title}</Text>
      <Text style={styles.detailText}>Description: {description}</Text>
      <Text style={styles.detailText}>Status: {status}</Text>
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
  detailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
});
