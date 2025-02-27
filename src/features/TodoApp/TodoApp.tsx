"use client";

import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>(""); // 新しい状態を追加
  const [error, setError] = useState<string | null>(null);

  // 初期データを取得
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  // フォーム送信時の処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodoTitle.trim()) {
      // 空白チェック
      setError("Please enter a todo");
      return;
    }

    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodoTitle }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]); // 新しいタスクをリストに追加
        setNewTodoTitle(""); // 入力フィールドをリセット
        setError(null);
      })
      .catch((error) => console.error("Error creating todo:", error));
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodoTitle} // 入力フィールドはnewTodoTitleと連動
          onChange={(e) => setNewTodoTitle(e.target.value)} // 入力値を更新
        />
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.done} readOnly />
            {todo.title}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
