"use client"

import { useState } from "react"
import { Moon, Sun, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { FilterType, SortType } from "@/types/todo"
import { useTodos } from "@/hooks/use-todos"
import { useSubjects } from "@/hooks/use-subjects"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { SubjectManager } from "./subject-manager"
import { TodoForm } from "./todo-form"
import { TodoStats } from "./todo-stats"
import { TodoFilters } from "./todo-filters"
import { TodoList } from "./todo-list"

export function TodoApp() {
  const { subjects, addSubject, updateSubject, deleteSubject } = useSubjects()
  const { todos, addTodo, updateTodoStatus, updateTodoTitle, deleteTodo, deleteTodosBySubject, reorderTodos } =
    useTodos()
  const [filter, setFilter] = useState<FilterType>("all")
  const [sortBy, setSortBy] = useState<SortType>("newest")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedWeek, setSelectedWeek] = useState(0)
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false)

  const handleDeleteSubject = (subjectId: string) => {
    // Delete all todos related to this subject
    deleteTodosBySubject(subjectId)
    // Delete the subject
    deleteSubject(subjectId)
  }

  const getTodosCountBySubject = (subjectId: string) => {
    return todos.filter((todo) => todo.subject === subjectId).length
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-orange-50 to-amber-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-10 backdrop-blur-md border-b transition-colors duration-300 ${
          darkMode ? "bg-gray-900/80 border-gray-700" : "bg-white/80 border-orange-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-orange-500" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                StudyMate
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your best friend for college tasks</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="hover:bg-orange-100 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Subject Manager */}
        <SubjectManager
          subjects={subjects}
          onAddSubject={addSubject}
          onUpdateSubject={updateSubject}
          onDeleteSubject={handleDeleteSubject}
          darkMode={darkMode}
          todosCount={getTodosCountBySubject}
        />

        {/* Add Todo Form */}
        <TodoForm subjects={subjects} onAddTodo={addTodo} darkMode={darkMode} />

        {/* Stats and Controls */}
        {(subjects.length > 0 || todos.length > 0) && (
          <div
            className={`rounded-xl p-6 mb-6 shadow-lg transition-colors duration-300 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="space-y-6">
              <TodoStats todos={todos} subjects={subjects} darkMode={darkMode} />
              <TodoFilters
                subjects={subjects}
                filter={filter}
                sortBy={sortBy}
                selectedSubject={selectedSubject}
                selectedWeek={selectedWeek}
                onFilterChange={setFilter}
                onSortChange={setSortBy}
                onSubjectChange={setSelectedSubject}
                onWeekChange={setSelectedWeek}
                darkMode={darkMode}
              />
            </div>
          </div>
        )}

        {/* Todo List */}
        <TodoList
          todos={todos}
          subjects={subjects}
          filter={filter}
          sortBy={sortBy}
          selectedSubject={selectedSubject}
          selectedWeek={selectedWeek}
          darkMode={darkMode}
          onStatusChange={updateTodoStatus}
          onTitleChange={updateTodoTitle}
          onDelete={deleteTodo}
          onReorder={reorderTodos}
        />
      </main>

      {/* Footer */}
      <footer
        className={`mt-16 border-t transition-colors duration-300 ${
          darkMode ? "border-gray-700 bg-gray-800" : "border-orange-200 bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Made with ❤️ to help students stay on top of their college tasks
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            💡 Tip: Choose a task status when adding to keep your tracking accurate.
          </p>
        </div>
      </footer>
    </div>
  )
}
