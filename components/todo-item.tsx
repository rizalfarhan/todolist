"use client";

import type React from "react";
import { useState } from "react";
import {
  Trash2,
  Edit3,
  Check,
  X,
  Calendar,
  Clock,
  BookOpen,
  Hash,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Todo, Subject } from "@/types/todo";
import { getStatusColor } from "@/utils/todo";
import { formatDate, isOverdue, getDaysUntilDeadline } from "@/utils/date";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { enUS } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("en-US", enUS);

interface TodoItemProps {
  todo: Todo;
  subjects: Subject[];
  darkMode: boolean;
  draggedItem: string | null;
  onStatusChange: (id: string, status: "Todo" | "Doing" | "Done") => void;
  onUpdate: (
    id: string,
    updates: { title?: string; deadline?: string; submissionPlace?: string }
  ) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({
  todo,
  subjects,
  darkMode,
  draggedItem,
  onStatusChange,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDeadline, setEditDeadline] = useState<Date | null>(null);
  const [editSubmissionPlace, setEditSubmissionPlace] = useState("");

  const startEdit = () => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDeadline(todo.deadline ? new Date(todo.deadline) : null); // Convert string to Date
    setEditSubmissionPlace(todo.submissionPlace);
  };

  const saveEdit = () => {
    if (editTitle.trim()) {
      const updates: {
        title?: string;
        deadline?: string;
        submissionPlace?: string;
      } = {
        title: editTitle.trim(),
      };
      if (editDeadline) {
        updates.deadline = editDeadline.toISOString().split("T")[0];
      }
      if (editSubmissionPlace.trim()) {
        updates.submissionPlace = editSubmissionPlace.trim();
      }
      onUpdate(todo.id, updates);
      setEditingId(null);
      setEditTitle("");
      setEditDeadline(null);
      setEditSubmissionPlace("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDeadline(null);
    setEditSubmissionPlace("");
  };

  const isEditing = editingId === todo.id;
  const isOverdueTask = isOverdue(todo.deadline) && todo.status !== "Done";
  const daysUntil = getDaysUntilDeadline(todo.deadline);
  const subject = subjects.find((s) => s.id === todo.subject);

  // Ensure submissionPlace always has a value
  const submissionPlace = todo.submissionPlace || "Not specified";
  console.log("TodoItem submissionPlace:", submissionPlace); // Debugging

  return (
    <div
      className={`group rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl cursor-move ${
        darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"
      } ${draggedItem === todo.id ? "opacity-50 scale-95" : ""} ${
        isOverdueTask ? "border-l-4 border-red-500" : ""
      }`}
    >
      <div className="space-y-3">
        {/* Header with Subject and Week */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {subject ? (
              <div
                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${subject.color}`}
              >
                <BookOpen className="h-3 w-3 inline mr-1" />
                {subject.name}
              </div>
            ) : (
              <div className="px-3 py-1 rounded-full bg-gray-500 text-white text-sm font-medium">
                <BookOpen className="h-3 w-3 inline mr-1" />
                Course Deleted
              </div>
            )}
            <div
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}
            >
              <Hash className="h-3 w-3 inline mr-1" />
              Week {todo.week}
            </div>
          </div>

          {/* Status Selector */}
          <select
            value={todo.status}
            onChange={(e) =>
              onStatusChange(todo.id, e.target.value as "Todo" | "Doing" | "Done")
            }
            className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer transition-all duration-200 ${getStatusColor(
              todo.status
            )}`}
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Title */}
        <div className="flex items-center gap-4">
          {isEditing ? (
            <div className="flex-1 flex flex-col gap-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Assignment Title"
              />
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-500 z-10 pointer-events-none" />
                <ReactDatePicker
                  selected={editDeadline}
                  onChange={(date: Date | null) => setEditDeadline(date)}
                  locale={enUS}
                  dateFormat="MMMM d, yyyy"
                  className="w-full pl-10 py-2 border rounded"
                  placeholderText="Select Deadline"
                />
              </div>
              <Input
                value={editSubmissionPlace}
                onChange={(e) => setEditSubmissionPlace(e.target.value)}
                placeholder="Submission Place"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={saveEdit}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Check className="h-4 w-4" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={cancelEdit}>
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <h3
              className={`flex-1 text-lg font-medium transition-all duration-200 ${
                todo.status === "Done" ? "line-through text-gray-500 dark:text-gray-400" : ""
              }`}
            >
              {todo.title}
            </h3>
          )}
        </div>

        {/* Footer with Deadline, Submission Place, and Actions */}
        {!isEditing && (
          <div className="flex flex-col gap-2">
            {/* Deadline Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    isOverdueTask
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      : daysUntil <= 3 && todo.status !== "Done"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      : darkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(todo.deadline)}</span>
                  {isOverdueTask && <AlertTriangle className="h-3 w-3" />}
                  {daysUntil <= 3 &&
                    daysUntil > 0 &&
                    todo.status !== "Done" && <Clock className="h-3 w-3" />}
                </div>

                {/* Days until deadline */}
                {todo.status !== "Done" && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {isOverdueTask
                      ? `Overdue by ${Math.abs(daysUntil)} day${
                          Math.abs(daysUntil) > 1 ? "s" : ""
                        }`
                      : daysUntil === 0
                      ? "Deadline today!"
                      : daysUntil === 1
                      ? "Deadline tomorrow"
                      : `${daysUntil} day${daysUntil > 1 ? "s" : ""} left`}
                  </div>
                )}
              </div>
            </div>

            {/* Submission Place and Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Submission Place:</span>
                <span
                  className={
                    submissionPlace === "Not specified" ? "italic text-gray-400" : ""
                  }
                >
                  {submissionPlace}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={startEdit}
                  className="hover:bg-blue-100 dark:hover:bg-blue-900"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(todo.id)}
                  className="hover:bg-red-100 dark:hover:bg-red-900 text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
