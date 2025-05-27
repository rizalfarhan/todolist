"use client"

import type React from "react"
import { useState } from "react"
import type { Todo, FilterType, SortType, Subject } from "@/types/todo"
import { TodoItem } from "./todo-item"
import { filterTodos, filterTodosBySubject, filterTodosByWeek, sortTodos } from "@/utils/todo"

interface TodoListProps {
  todos: Todo[]
  subjects: Subject[]
  filter: FilterType
  sortBy: SortType
  selectedSubject: string
  selectedWeek: number
  darkMode: boolean
  onStatusChange: (id: string, status: "Todo" | "Doing" | "Done") => void
  onTitleChange: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export function TodoList({
  todos,
  subjects,
  filter,
  sortBy,
  selectedSubject,
  selectedWeek,
  darkMode,
  onStatusChange,
  onTitleChange,
  onDelete,
}: TodoListProps) {
  // Apply all filters
  let filteredTodos = filterTodos(todos, filter)
  filteredTodos = filterTodosBySubject(filteredTodos, selectedSubject)
  filteredTodos = filterTodosByWeek(filteredTodos, selectedWeek)

  const sortedTodos = sortTodos(filteredTodos, sortBy)

  const getEmptyMessage = () => {
  if (filter === "completed") {
    return "No completed tasks yet"
  } else if (filter === "incomplete") {
    return "All tasks are done! 🎉"
  } else if (filter === "all" && selectedSubject === "all" && selectedWeek === 0) {
    return "No assignments available"
  } else {
    return "No tasks match the selected filter"
  }
}

const getEmptyDescription = () => {
  if (filter === "completed") {
    return "Complete some tasks to see them here"
  } else if (filter === "incomplete") {
    return "Great job! All tasks are completed"
  } else {
    return "Add new tasks or change the filters to see more"
  }
}

  if (sortedTodos.length === 0) {
    return (
      <div className={`text-center py-12 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <div className="text-6xl mb-4">{filter === "completed" ? "🎯" : filter === "incomplete" ? "🎉" : "📚"}</div>
        <p className="text-lg text-gray-500 dark:text-gray-400">{getEmptyMessage()}</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{getEmptyDescription()}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filter Summary */}
      <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"} border-l-4 border-orange-500`}>
        <p className="text-sm text-gray-600 dark:text-gray-400">
  Displaying <span className="font-semibold text-orange-600 dark:text-orange-400">{sortedTodos.length}</span> tasks
  {filter !== "all" && (
    <span>
      {" "}with status{" "}
      <span className="font-semibold">
        {filter === "completed" ? "Completed" : filter === "incomplete" ? "Incomplete" : filter}
      </span>
    </span>
  )}
  {selectedSubject !== "all" && (
    <span>
      {" "}for subject{" "}
      <span className="font-semibold">{subjects.find((s) => s.id === selectedSubject)?.name || "Unknown"}</span>
    </span>
  )}
  {selectedWeek !== 0 && (
    <span>
      {" "}in <span className="font-semibold">Week {selectedWeek}</span>
    </span>
  )}
</p>

      </div>

      {/* Todo Items */}
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          subjects={subjects}
          darkMode={darkMode}
          onStatusChange={onStatusChange}
          onTitleChange={onTitleChange}
          onDelete={onDelete} draggedItem={null}        />
      ))}
    </div>
  )
}
