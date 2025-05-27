"use client";

import { useState } from "react";
import { Plus, BookOpen, AlertCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Subject } from "@/types/todo";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { enUS } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("en-US", enUS);

interface TodoFormProps {
  subjects: Subject[];
  onAddTodo: (
    title: string,
    subject: string,
    week: number,
    deadline: string,
    status: "Todo" | "Doing" | "Done",
    submissionPlace: string
  ) => void;
  darkMode: boolean;
}

export function TodoForm({ subjects, onAddTodo, darkMode }: TodoFormProps) {
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newWeek, setNewWeek] = useState(1);
  const [newDeadline, setNewDeadline] = useState<Date>(new Date());
  const [newStatus, setNewStatus] = useState<"Todo" | "Doing" | "Done">("Todo");
  const [newSubmissionPlace, setNewSubmissionPlace] = useState("");

  const handleSubmit = () => {
    console.log({ newTitle, newDeadline, newSubmissionPlace }); // Debugging
    if (newTitle.trim() && newDeadline.toISOString().split("T")[0].trim()) {
      onAddTodo(
        newTitle,
        newSubject,
        newWeek,
        newDeadline.toISOString().split("T")[0],
        newStatus,
        newSubmissionPlace || "" // Pastikan tidak undefined
      );
      setNewTitle("");
      setNewSubject("");
      setNewWeek(1);
      setNewDeadline(new Date());
      setNewStatus("Todo");
      setNewSubmissionPlace("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  if (subjects.length === 0) {
    return (
      <div
        className={`rounded-xl p-6 mb-8 shadow-lg transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Course Yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            You need to add a course first before creating an assignment
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Use the "Manage Courses" form above to add a new course.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl p-6 mb-8 shadow-lg transition-colors duration-300 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-orange-500" />
        Add a new course assignment
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        {/* Assignment Title */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Assignment Title
          </label>
          <Input
            type="text"
            placeholder="Enter assignment title..."
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

        {/* Course */}
        <div>
          <label className="block text-sm font-medium mb-2">Course</label>
          <select
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className={`w-full px-3 py-2 rounded-md border-2 transition-colors duration-200 ${
              darkMode
                ? "border-gray-600 bg-gray-700 focus:border-orange-500 text-white"
                : "border-orange-200 focus:border-orange-500 bg-white"
            }`}
          >
            <option value="">Select Course</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Week */}
        <div>
          <label className="block text-sm font-medium mb-2">Week</label>
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
                Week {week}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={newStatus}
            onChange={(e) =>
              setNewStatus(e.target.value as "Todo" | "Doing" | "Done")
            }
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

      {/* Submission Place, Deadline and Submit */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        {/* Submission Place */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Submission Place
          </label>
          <Input
            type="text"
            placeholder="Enter submission link or location..."
            value={newSubmissionPlace}
            onChange={(e) => setNewSubmissionPlace(e.target.value)}
            className={`border-2 transition-colors duration-200 ${
              darkMode
                ? "border-gray-600 bg-gray-700 focus:border-orange-500 text-white"
                : "border-orange-200 focus:border-orange-500 bg-white"
            }`}
          />
        </div>

        {/* Deadline */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Deadline</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-500 z-10 pointer-events-none" />
            <ReactDatePicker
              selected={newDeadline}
              onChange={(date: Date | null) => date && setNewDeadline(date)}
              locale={enUS}
              dateFormat="MMMM d, yyyy"
              popperPlacement="bottom-start"
              className={`w-full pl-10 py-2 rounded-md border-2 transition-colors duration-200 z-0 ${
                darkMode
                  ? "border-gray-600 bg-gray-700 focus:border-orange-500 text-white"
                  : "border-orange-200 focus:border-orange-500 bg-white"
              }`}
            />
          </div>
        </div>

        {/* Button */}
        <div>
          <Button
            onClick={handleSubmit}
            disabled={!newTitle.trim() || !newSubject}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-5 w-4 mr-2" />
            Add Assignment
          </Button>
        </div>
      </div>
    </div>
  );
}
