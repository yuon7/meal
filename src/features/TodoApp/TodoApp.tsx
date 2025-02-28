"use client";

import { useEffect, useState } from "react";
import styles from "./TodoApp.module.css";

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodoTitle.trim()) {
      setError("Please enter a todo");
      return;
    }

    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodoTitle }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
        setNewTodoTitle("");
        setError(null);
      })
      .catch((error) => console.error("Error creating todo:", error));
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" })
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const handleToggleDone = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);

    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        done: !todos.find((todo) => todo.id === id)?.done,
      }),
    }).catch((error) => console.error("Error updating todo:", error));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Todo List</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Add Todo
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}

      <h2 className={styles.subheading}>Todos</h2>
      <ul className={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.listItem}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggleDone(todo.id)}
            />
            <span>{todo.title}</span>
            <button
              onClick={() => handleDelete(todo.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
