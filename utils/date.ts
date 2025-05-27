export const getTodayDate = (): string => {
  return new Date().toISOString().split("T")[0]
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-Us", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export const isOverdue = (deadline: string): boolean => {
  return new Date(deadline) < new Date(getTodayDate())
}

export const getDaysUntilDeadline = (deadline: string): number => {
  const today = new Date(getTodayDate())
  const deadlineDate = new Date(deadline)
  const diffTime = deadlineDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
