"use client";

import { useState } from "react";
import { Moon, Sun, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FilterType, SortType } from "@/types/todo";
import { useTodos } from "@/hooks/use-todos";
import { useSubjects } from "@/hooks/use-subjects";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { SubjectManager } from "./subject-manager";
import { TodoForm } from "./todo-form";
import { TodoStats } from "./todo-stats";
import { TodoFilters } from "./todo-filters";
import { TodoList } from "./todo-list";

export function TodoApp() {
  const { subjects, addSubject, updateSubject, deleteSubject } = useSubjects();
  const {
    todos,
    addTodo,
    updateTodoStatus,
    deleteTodo,
    updateTodo, // Menggunakan fungsi updateTodo yang baru
    deleteTodosBySubject, // Pastikan ini diimpor jika digunakan
    isInitialized,
  } = useTodos();
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("newest");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  const handleDeleteSubject = (subjectId: string) => {
    // Hapus semua tugas yang terkait dengan mata kuliah ini
    deleteTodosBySubject(subjectId);
    // Hapus mata kuliah
    deleteSubject(subjectId);
  };

  const getTodosCountBySubject = (subjectId: string) => {
    return todos.filter((todo) => todo.subject === subjectId).length;
  };

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
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your best friend for college tasks
              </p>
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

      {/* Konten Utama */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Manajer Mata Kuliah */}
        <SubjectManager
          subjects={subjects}
          onAddSubject={addSubject}
          onUpdateSubject={updateSubject}
          onDeleteSubject={handleDeleteSubject}
          darkMode={darkMode}
          todosCount={getTodosCountBySubject}
        />

        {/* Formulir Tambah Tugas */}
        <TodoForm subjects={subjects} onAddTodo={addTodo} darkMode={darkMode} />

        {/* Statistik dan Kontrol */}
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

        {/* Daftar Tugas */}
        <TodoList
          todos={todos}
          subjects={subjects}
          darkMode={darkMode}
          filter={filter}
          sortBy={sortBy}
          selectedSubject={selectedSubject}
          selectedWeek={selectedWeek}
          onStatusChange={updateTodoStatus}
          onUpdate={updateTodo} // Menggunakan fungsi updateTodo yang baru
          onDelete={deleteTodo}
          onTodosChange={todosUpdated => { /* handle updated todos if needed */ }} // Menambahkan prop onTodosChange
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
            Made with ❤️ to help students stay on top of their college tasks
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            💡 Tip: Choose a task status when adding to keep your tracking accurate.
          </p>
        </div>
      </footer>
    </div>
  );
}
