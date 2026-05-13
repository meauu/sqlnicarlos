import * as SQLite from "expo-sqlite";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

// Sync Method
const db = SQLite.openDatabaseSync("tasks.db");

export const initDatabase = () => {
  try {
    db.execSync(`
            CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT NOT NULL
            )
            `);
  } catch (error) {
    console.error("There was a problem initializing the database", error);
    throw error;
  }
};

export const addTask = (title: string, description: string, status: string) => {
  try {
    db.runSync(
      "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
      [title, description, status],
    );
  } catch (error) {
    console.error("There was a problem adding the task", error);
    throw error;
  }
};

export const deleteTask = (id: number) => {
  try {
    db.runSync("DELETE FROM tasks WHERE id = ?", [id]);
  } catch (error) {
    console.error("There was a problem deleting the task", error);
    throw error;
  }
};

export const getTasks = (): Task[] => {
  try {
    return db.getAllSync("SELECT * FROM tasks ORDER BY id DESC");
  } catch (error) {
    console.error("There was a problem fetching the tasks", error);
    throw error;
  }
};
