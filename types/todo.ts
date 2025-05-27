export interface Todo {
  createdAt: string | number | Date
  id: string
  title: string
  status: "Todo" | "Doing" | "Done"
  deadline: string
  week: number
  subject: string
  submissionPlace: string // Ubah dari optional menjadi required dengan default value ""
}

export type FilterType = "all" | "Todo" | "Doing" | "Done" | "completed" | "incomplete"
export type SortType = "newest" | "oldest" | "deadline" | "week"

export interface Subject {
  id: string
  name: string
  color: string
  createdAt: Date
}