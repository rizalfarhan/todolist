"use client"

import type React from "react"

import { useState } from "react"
import { Plus, BookOpen, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getTodayDate } from "@/utils/date"
import type { Subject } from "@/types/todo"

interface TodoFormProps {
  subjects: Subject[]
  onAddTodo: (title: string, subject: string, week: number, deadline: string, status: "Todo" | "Doing" | "Done") => void
  darkMode: boolean
}

export function TodoForm({ subjects, onAddTodo, darkMode }: TodoFormProps) {
  const [newTitle, setNewTitle] = useState("")
  const [newSubject, setNewSubject] = useState("")
  const [newWeek, setNewWeek] = useState(1)
  const [newDeadline, setNewDeadline] = useState(getTodayDate())
  const [newStatus, setNewStatus] = useState<"Todo" | "Doing" | "Done">("Todo")

  const handleSubmit = () => {
    if (newTitle.trim() && newSubject) {
      onAddTodo(newTitle, newSubject, newWeek, newDeadline, newStatus)
      setNewTitle("")
      setNewSubject("")
      setNewWeek(1)
      setNewDeadline(getTodayDate())
      setNewStatus("Todo")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  if (subjects.length === 0) {
    return (
      <div
        className={`rounded-xl p-6 mb-8 shadow-lg transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Belum Ada Mata Kuliah</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Anda perlu menambahkan mata kuliah terlebih dahulu sebelum membuat tugas
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Gunakan form "Kelola Mata Kuliah" di atas untuk menambahkan mata kuliah baru
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`rounded-xl p-6 mb-8 shadow-lg transition-colors duration-300 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-orange-500" />
        Tambah Tugas Kuliah Baru
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        {/* Title Input */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-2">Judul Tugas</label>
          <Input
            type="text"
            placeholder="Masukkan judul tugas..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`border-2 transition-colors duration-200 ${
              darkMode
                ? "border-gray-600 bg-gray-700 focus:border-orange-500"
                : "border-orange-200 focus:border-orange-500"
            }`}
          />
        </div>

        {/* Subject Select */}
        <div>
          <label className="block text-sm font-medium mb-2">Mata Kuliah</label>
          <select
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className={`w-full px-3 py-2 rounded-md border-2 transition-colors duration-200 ${
              darkMode
                ? "border-gray-600 bg-gray-700 focus:border-orange-500 text-white"
                : "border-orange-200 focus:border-orange-500 bg-white"
            }`}
          >
            <option value="">Pilih Mata Kuliah</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Week Select */}
        <div>
          <label className="block text-sm font-medium mb-2">Minggu Ke-</label>
          <select
            value={newWeek}
            onChange={(e) => setNewWeek(Number(e.target.value))}
            className={`w-full px-3 py-2 rounded-md border-2 transition-colors duration-200 ${
              darkMode
                ? "border-gray-600 bg-gray-700 focus:border-orange-500 text-white"
                : "border-orange-200 focus:border-orange-500 bg-white"
            }`}
          >
            {Array.from({ length: 16 }, (_, i) => i + 1).map((week) => (
              <option key={week} value={week}>
                Minggu {week}
              </option>
            ))}
          </select>
        </div>

        {/* Status Select */}
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as "Todo" | "Doing" | "Done")}
            className={`w-full px-3 py-2 rounded-md border-2 transition-colors duration-200 ${
              darkMode
                ? "border-gray-600 bg-gray-700 focus:border-orange-500 text-white"
                : "border-orange-200 focus:border-orange-500 bg-white"
            }`}
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Deadline Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Deadline</label>
          <Input
            type="date"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
            className={`border-2 transition-colors duration-200 ${
              darkMode
                ? "border-gray-600 bg-gray-700 focus:border-orange-500"
                : "border-orange-200 focus:border-orange-500"
            }`}
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <Button
            onClick={handleSubmit}
            disabled={!newTitle.trim() || !newSubject}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Tugas
          </Button>
        </div>
      </div>
    </div>
  )
}