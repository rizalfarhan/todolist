"use client"

import { useState, useEffect } from "react"
import type { Subject } from "@/types/todo"
import { useLocalStorage } from "./use-local-storage"

export function useSubjects() {
  const [subjects, setSubjects] = useLocalStorage<Subject[]>("college-subjects", [])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Parse dates when loading from localStorage
    if (subjects.length > 0) {
      const parsedSubjects = subjects.map((subject) => ({
        ...subject,
        createdAt: new Date(subject.createdAt),
      }))
      if (JSON.stringify(parsedSubjects) !== JSON.stringify(subjects)) {
        setSubjects(parsedSubjects)
      }
    }
    setIsInitialized(true)
  }, [subjects, setSubjects])

  const addSubject = (name: string, color: string) => {
    if (name.trim()) {
      const subject: Subject = {
        id: Date.now().toString(),
        name: name.trim(),
        color,
        createdAt: new Date(),
      }
      setSubjects([...subjects, subject])
      return subject
    }
    return null
  }

  const updateSubject = (id: string, name: string, color: string) => {
    setSubjects(subjects.map((subject) => (subject.id === id ? { ...subject, name: name.trim(), color } : subject)))
  }

  const deleteSubject = (id: string) => {
    setSubjects(subjects.filter((subject) => subject.id !== id))
  }

  const getSubjectById = (id: string): Subject | undefined => {
    return subjects.find((subject) => subject.id === id)
  }

  const getSubjectColor = (subjectId: string): string => {
    const subject = getSubjectById(subjectId)
    return subject?.color || "bg-gray-500"
  }

  return {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    getSubjectById,
    getSubjectColor,
    isInitialized,
  }
}
