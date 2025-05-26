export const AVAILABLE_COLORS = [
  { id: "blue", name: "Biru", class: "bg-blue-500" },
  { id: "green", name: "Hijau", class: "bg-green-500" },
  { id: "purple", name: "Ungu", class: "bg-purple-500" },
  { id: "red", name: "Merah", class: "bg-red-500" },
  { id: "yellow", name: "Kuning", class: "bg-yellow-500" },
  { id: "indigo", name: "Indigo", class: "bg-indigo-500" },
  { id: "pink", name: "Pink", class: "bg-pink-500" },
  { id: "teal", name: "Teal", class: "bg-teal-500" },
  { id: "orange", name: "Orange", class: "bg-orange-500" },
  { id: "cyan", name: "Cyan", class: "bg-cyan-500" },
  { id: "emerald", name: "Emerald", class: "bg-emerald-500" },
  { id: "violet", name: "Violet", class: "bg-violet-500" },
  { id: "rose", name: "Rose", class: "bg-rose-500" },
  { id: "lime", name: "Lime", class: "bg-lime-500" }
]

export function getColorClass(colorId: string): string {
  const color = AVAILABLE_COLORS.find(c => c.id === colorId)
  return color?.class || "bg-gray-500" // fallback to gray if color not found
}
