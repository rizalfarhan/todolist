"use client";

import { useState, useEffect } from "react";
import type { Todo } from "@/types/todo";
import { useLocalStorage } from "./use-local-storage";
import { getTodayDate } from "@/utils/date";

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("college-todos", []);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Parse tanggal saat memuat dari localStorage
    if (todos.length > 0) {
      const parsedTodos = todos.map((todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }));
      if (JSON.stringify(parsedTodos) !== JSON.stringify(todos)) {
        setTodos(parsedTodos);
      }
    }
    setIsInitialized(true);
  }, [todos, setTodos]);

  const addTodo = (
    title: string,
    subject: string,
    week: number,
    deadline: string,
    status: "Todo" | "Doing" | "Done",
    submissionPlace: string
  ) => {
    if (title.trim() && subject && week >= 1 && week <= 16) {
      const todo: Todo = {
        id: Date.now().toString(),
        title: title.trim(),
        subject,
        week,
        status,
        deadline: deadline || getTodayDate(),
        submissionPlace: submissionPlace || "",
        createdAt: new Date(),
      };
      setTodos([todo, ...todos]);
    }
  };

  const updateTodoStatus = (
    id: string,
    newStatus: "Todo" | "Doing" | "Done"
  ) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status: newStatus } : todo))
    );
  };

  // Fungsi ini tidak lagi digunakan secara langsung, diganti oleh updateTodo
  const updateTodoTitle = (id: string, newTitle: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteTodosBySubject = (subjectId: string) => {
    setTodos(todos.filter((todo) => todo.subject !== subjectId));
  };

  const reorderTodos = (draggedId: string, targetId: string) => {
    const draggedIndex = todos.findIndex((todo) => todo.id === draggedId);
    const targetIndex = todos.findIndex((todo) => todo.id === targetId);

    const newTodos = [...todos];
    const [draggedTodo] = newTodos.splice(draggedIndex, 1);
    newTodos.splice(targetIndex, 0, draggedTodo);

    setTodos(newTodos);
  };

  const updateTodo = (
    id: string,
    updates: { title?: string; deadline?: string; submissionPlace?: string }
  ) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              ...updates,
              // Pastikan deadline tetap dalam format string YYYY-MM-DD jika diupdate dari Date object
              deadline: updates.deadline || todo.deadline,
            }
          : todo
      )
    );
  };

  return {
    todos,
    addTodo,
    updateTodoStatus,
    updateTodoTitle, // Masih ada untuk kompatibilitas, tapi lebih baik gunakan updateTodo
    deleteTodo,
    deleteTodosBySubject,
    reorderTodos,
    updateTodo, // Fungsi baru untuk update multi-field
    isInitialized,
  };
}
