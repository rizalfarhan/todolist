"use client"

import { useState } from "react"
import { Plus, Edit3, Trash2, Check, X, BookOpen, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Subject } from "@/types/todo"
import { AVAILABLE_COLORS, getColorClass } from "@/data/colors"

interface SubjectManagerProps {
  subjects: Subject[]
  onAddSubject: (name: string, color: string) => Subject | null
  onUpdateSubject: (id: string, name: string, color: string) => void
  onDeleteSubject: (id: string) => void
  darkMode: boolean
  todosCount: (subjectId: string) => number
}

export function SubjectManager({
  subjects,
  onAddSubject,
  onUpdateSubject,
  onDeleteSubject,
  darkMode,
  todosCount,
}: SubjectManagerProps) {
  const [isAddingSubject, setIsAddingSubject] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState("")
  const [newSubjectColor, setNewSubjectColor] = useState("blue")
  const [editingSubject, setEditingSubject] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editColor, setEditColor] = useState("")

  const handleAddSubject = () => {
    if (newSubjectName.trim()) {
      const colorClass = getColorClass(newSubjectColor)
      const result = onAddSubject(newSubjectName, colorClass)
      if (result) {
        setNewSubjectName("")
        setNewSubjectColor("blue")
        setIsAddingSubject(false)
      }
    }
  }

  const startEdit = (subject: Subject) => {
    setEditingSubject(subject.id)
    setEditName(subject.name)
    // Extract color id from class
    const colorId = AVAILABLE_COLORS.find((c) => c.class === subject.color)?.id || "blue"
    setEditColor(colorId)
  }

  const saveEdit = () => {
    if (editName.trim() && editingSubject) {
      const colorClass = getColorClass(editColor)
      onUpdateSubject(editingSubject, editName, colorClass)
      setEditingSubject(null)
      setEditName("")
      setEditColor("")
    }
  }

  const cancelEdit = () => {
    setEditingSubject(null)
    setEditName("")
    setEditColor("")
  }

  const handleDeleteSubject = (subjectId: string) => {
    const count = todosCount(subjectId)
    if (count > 0) {
      if (confirm(`Mata kuliah ini memiliki ${count} tugas. Yakin ingin menghapus?`)) {
        onDeleteSubject(subjectId)
      }
    } else {
      onDeleteSubject(subjectId)
    }
  }

  return (
    <div
      className={`rounded-xl p-6 mb-8 shadow-lg transition-colors duration-300 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-orange-500" />
          Manage Courses
        </h2>
        <Button
          onClick={() => setIsAddingSubject(true)}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      {/* Add Subject Form */}
      {isAddingSubject && (
        <div
          className={`p-4 rounded-lg mb-4 border-2 border-dashed ${
            darkMode ? "border-gray-600 bg-gray-700" : "border-orange-200 bg-orange-50"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Course Name</label>
              <Input
                type="text"
                placeholder="Example: Web Programming"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSubject()}
                className={`border-2 transition-colors duration-200 ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 focus:border-orange-500"
                    : "border-orange-200 focus:border-orange-500"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Colors</label>
              <select
                value={newSubjectColor}
                onChange={(e) => setNewSubjectColor(e.target.value)}
                className={`w-full px-3 py-2 rounded-md border-2 transition-colors duration-200 ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 focus:border-orange-500 text-white"
                    : "border-orange-200 focus:border-orange-500 bg-white"
                }`}
              >
                {AVAILABLE_COLORS.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleAddSubject} className="bg-green-500 hover:bg-green-600 text-white">
              <Check className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={() => setIsAddingSubject(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Subject List */}
      {subjects.length === 0 ? (
        <div className="text-center py-8">
          <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 mb-2">No courses yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Add your first course to begin creating tasks
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                darkMode ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-gray-50"
              }`}
            >
              {editingSubject === subject.id ? (
                <div className="space-y-3">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                    className="text-sm"
                  />
                  <select
                    value={editColor}
                    onChange={(e) => setEditColor(e.target.value)}
                    className={`w-full px-2 py-1 rounded text-sm ${darkMode ? "bg-gray-600 text-white" : "bg-white"}`}
                  >
                    {AVAILABLE_COLORS.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveEdit} className="bg-green-500 hover:bg-green-600">
                      <Check className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEdit}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-4 h-4 rounded-full ${subject.color}`}></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{subject.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{todosCount(subject.id)} tasks</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => startEdit(subject)}>
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteSubject(subject.id)}
                      className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
