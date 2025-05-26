export interface Todo {
  id: string
  title: string
  subject: string
  week: number
  status: "Todo" | "Doing" | "Done"
  deadline: string
  createdAt: Date
}

export type FilterType = "all" | "Todo" | "Doing" | "Done" | "completed" | "incomplete"
export type SortType = "newest" | "oldest" | "deadline" | "week"

export interface Subject {
  id: string
  name: string
  color: string
  createdAt: Date
}
