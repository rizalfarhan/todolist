"use client"

import { ArrowUpDown, Filter, BookOpen, Hash, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { FilterType, SortType, Subject } from "@/types/todo"

interface TodoFiltersProps {
  subjects: Subject[]
  filter: FilterType
  sortBy: SortType
  selectedSubject: string
  selectedWeek: number
  onFilterChange: (filter: FilterType) => void
  onSortChange: (sort: SortType) => void
  onSubjectChange: (subject: string) => void
  onWeekChange: (week: number) => void
  darkMode: boolean
}

export function TodoFilters({
  subjects,
  filter,
  sortBy,
  selectedSubject,
  selectedWeek,
  onFilterChange,
  onSortChange,
  onSubjectChange,
  onWeekChange,
  darkMode,
}: TodoFiltersProps) {
  const handleSortClick = () => {
    const sortOrder: SortType[] = ["newest", "oldest", "deadline", "week"]
    const currentIndex = sortOrder.indexOf(sortBy)
    const nextSort = sortOrder[(currentIndex + 1) % sortOrder.length]
    onSortChange(nextSort)
  }

  const getSortLabel = () => {
    switch (sortBy) {
      case "newest":
        return "Terbaru"
      case "oldest":
        return "Terlama"
      case "deadline":
        return "Deadline"
      case "week":
        return "Minggu"
      default:
        return "Terbaru"
    }
  }

  const getFilterLabel = (filterType: FilterType) => {
    switch (filterType) {
      case "all":
        return "Semua"
      case "completed":
        return "Selesai"
      case "incomplete":
        return "Belum Selesai"
      case "Todo":
        return "Todo"
      case "Doing":
        return "Doing"
      case "Done":
        return "Done"
      default:
        return filterType
    }
  }

  const getFilterIcon = (filterType: FilterType) => {
    switch (filterType) {
      case "completed":
        return <CheckCircle className="h-3 w-3" />
      case "incomplete":
        return <Clock className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {/* Main Status Filter */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Status:</span>
        </div>
        <div className="flex rounded-lg overflow-hidden border border-orange-200 dark:border-gray-600">
          {(["all", "completed", "incomplete"] as FilterType[]).map((filterType) => (
            <button
              key={filterType}
              onClick={() => onFilterChange(filterType)}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                filter === filterType
                  ? "bg-orange-500 text-white"
                  : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-white text-gray-700 hover:bg-orange-50"
              }`}
            >
              {getFilterIcon(filterType)}
              {getFilterLabel(filterType)}
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Status Filter */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Detail:</span>
        </div>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
          {(["all", "Todo", "Doing", "Done"] as FilterType[]).map((filterType) => (
            <button
              key={filterType}
              onClick={() => onFilterChange(filterType)}
              className={`px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                filter === filterType
                  ? "bg-gray-500 text-white"
                  : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {getFilterLabel(filterType)}
            </button>
          ))}
        </div>
      </div>

      {/* Subject and Week Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Subject Filter */}
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Mata Kuliah:</span>
          <select
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className={`px-3 py-1 rounded-md border text-sm ${
              darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"
            }`}
          >
            <option value="all">Semua</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Week Filter */}
        <div className="flex items-center gap-2">
          <Hash className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Minggu:</span>
          <select
            value={selectedWeek}
            onChange={(e) => onWeekChange(Number(e.target.value))}
            className={`px-3 py-1 rounded-md border text-sm ${
              darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"
            }`}
          >
            <option value={0}>Semua</option>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((week) => (
              <option key={week} value={week}>
                Minggu {week}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <Button variant="outline" onClick={handleSortClick} className="border-orange-200 dark:border-gray-600">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          {getSortLabel()}
        </Button>
      </div>
    </div>
  )
}
