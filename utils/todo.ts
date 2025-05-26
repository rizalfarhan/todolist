import type { Todo, FilterType, SortType } from "@/types/todo"

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Todo":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    case "Doing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Done":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getStatusCount = (todos: Todo[], status: "Todo" | "Doing" | "Done"): number => {
  return todos.filter((todo) => todo.status === status).length
}

export const getCompletedCount = (todos: Todo[]): number => {
  return todos.filter((todo) => todo.status === "Done").length
}

export const getIncompleteCount = (todos: Todo[]): number => {
  return todos.filter((todo) => todo.status !== "Done").length
}

export const filterTodos = (todos: Todo[], filter: FilterType): Todo[] => {
  switch (filter) {
    case "all":
      return todos
    case "completed":
      return todos.filter((todo) => todo.status === "Done")
    case "incomplete":
      return todos.filter((todo) => todo.status !== "Done")
    case "Todo":
    case "Doing":
    case "Done":
      return todos.filter((todo) => todo.status === filter)
    default:
      return todos
  }
}

export const filterTodosBySubject = (todos: Todo[], subject: string): Todo[] => {
  if (subject === "all") return todos
  return todos.filter((todo) => todo.subject === subject)
}

export const filterTodosByWeek = (todos: Todo[], week: number): Todo[] => {
  if (week === 0) return todos
  return todos.filter((todo) => todo.week === week)
}

export const sortTodos = (todos: Todo[], sortBy: SortType): Todo[] => {
  return [...todos].sort((a, b) => {
    if (sortBy === "newest") {
      // Pastikan createdAt adalah Date object
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    } else if (sortBy === "oldest") {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    } else if (sortBy === "deadline") {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    } else if (sortBy === "week") {
      return a.week - b.week
    }
    return 0
  })
}
