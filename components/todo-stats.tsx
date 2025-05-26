import type { Todo, Subject } from "@/types/todo"
import { getStatusCount, getCompletedCount, getIncompleteCount } from "@/utils/todo"
import { CheckCircle, Clock, Target } from "lucide-react"

interface TodoStatsProps {
  todos: Todo[]
  subjects: Subject[]
  darkMode: boolean
}

export function TodoStats({ todos, subjects, darkMode }: TodoStatsProps) {
  const getSubjectCount = (subjectId: string) => {
    return todos.filter((todo) => todo.subject === subjectId).length
  }

  const getWeekCount = (week: number) => {
    return todos.filter((todo) => todo.week === week).length
  }

  const currentWeek = Math.ceil(new Date().getTime() / (1000 * 60 * 60 * 24 * 7)) % 16 || 1
  const completedCount = getCompletedCount(todos)
  const incompleteCount = getIncompleteCount(todos)
  const totalCount = todos.length
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="space-y-4">
      {/* Main Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Tasks */}
        <div className={`px-4 py-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Total Tugas</span>
          </div>
          <p className="text-2xl font-bold mt-1">{totalCount}</p>
        </div>

        {/* Completed Tasks */}
        <div className={`px-4 py-3 rounded-lg ${darkMode ? "bg-green-900" : "bg-green-100"}`}>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium">Selesai</span>
          </div>
          <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">{completedCount}</p>
        </div>

        {/* Incomplete Tasks */}
        <div className={`px-4 py-3 rounded-lg ${darkMode ? "bg-orange-900" : "bg-orange-100"}`}>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium">Belum Selesai</span>
          </div>
          <p className="text-2xl font-bold mt-1 text-orange-600 dark:text-orange-400">{incompleteCount}</p>
        </div>

        {/* Completion Percentage */}
        <div className={`px-4 py-3 rounded-lg ${darkMode ? "bg-blue-900" : "bg-blue-100"}`}>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium">Progress</span>
          </div>
          <p className="text-2xl font-bold mt-1 text-blue-600 dark:text-blue-400">{completionPercentage}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress Keseluruhan</span>
            <span className="text-sm text-gray-500">
              {completedCount} dari {totalCount} tugas
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Detailed Status Stats */}
      <div className="flex flex-wrap gap-3">
        <div className={`px-4 py-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
          <span className="text-sm font-medium">Todo: {getStatusCount(todos, "Todo")}</span>
        </div>
        <div className={`px-4 py-2 rounded-full ${darkMode ? "bg-blue-900" : "bg-blue-100"}`}>
          <span className="text-sm font-medium">Doing: {getStatusCount(todos, "Doing")}</span>
        </div>
        <div className={`px-4 py-2 rounded-full ${darkMode ? "bg-green-900" : "bg-green-100"}`}>
          <span className="text-sm font-medium">Done: {getStatusCount(todos, "Done")}</span>
        </div>
      </div>

      {/* Subject Stats */}
      {subjects.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {subjects
            .filter((subject) => getSubjectCount(subject.id) > 0)
            .map((subject) => {
              const subjectTodos = todos.filter((todo) => todo.subject === subject.id)
              const subjectCompleted = subjectTodos.filter((todo) => todo.status === "Done").length
              const subjectTotal = subjectTodos.length
              const subjectPercentage = subjectTotal > 0 ? Math.round((subjectCompleted / subjectTotal) * 100) : 0

              return (
                <div key={subject.id} className={`px-3 py-1 rounded-full text-white text-sm ${subject.color}`}>
                  {subject.name}: {subjectCompleted}/{subjectTotal} ({subjectPercentage}%)
                </div>
              )
            })}
        </div>
      )}

      {/* Current Week Highlight */}
      <div className={`px-4 py-2 rounded-lg ${darkMode ? "bg-orange-900" : "bg-orange-100"}`}>
        <span className="text-sm font-medium">
          Minggu Ini (Minggu {currentWeek}): {getWeekCount(currentWeek)} tugas
        </span>
      </div>
    </div>
  )
}
