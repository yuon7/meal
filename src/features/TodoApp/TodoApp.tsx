"use client";

import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.done} readOnly />
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
