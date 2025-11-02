"use client"

import { useState, useMemo } from "react"
import { Dashboard } from "@/components/dashboard"
import { KanbanBoard } from "@/components/kanban-board"
import { TaskModal } from "@/components/task-modal"
import { TaskFilters } from "@/components/task-filters"
import { Sidebar } from "@/components/sidebar"

export default function Home() {
  const [currentView, setCurrentView] = useState<"dashboard" | "board">("dashboard")
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [filters, setFilters] = useState({
    search: "",
    status: [] as string[],
    priority: [] as string[],
    assignee: [] as string[],
  })

  const [projects] = useState([
    {
      id: "1",
      name: "Mobile App Redesign",
      key: "MAR",
      color: "#3B82F6",
    },
    {
      id: "2",
      name: "API Backend",
      key: "API",
      color: "#10B981",
    },
  ])

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Design homepage mockups",
      description: "Create initial design mockups for the new homepage",
      projectId: "1",
      status: "todo",
      priority: "high",
      assignee: { name: "Sarah Chen", avatar: "SC", id: "1" },
      dueDate: "2024-11-15",
    },
    {
      id: "2",
      title: "Review API authentication",
      description: "Review and implement OAuth2 authentication",
      projectId: "2",
      status: "in-progress",
      priority: "high",
      assignee: { name: "Alex Rodriguez", avatar: "AR", id: "2" },
      dueDate: "2024-11-12",
    },
    {
      id: "3",
      title: "Fix header layout issues",
      description: "Resolve responsive design issues on mobile",
      projectId: "1",
      status: "in-progress",
      priority: "medium",
      assignee: { name: "Jordan Liu", avatar: "JL", id: "3" },
      dueDate: "2024-11-10",
    },
    {
      id: "4",
      title: "Database optimization",
      description: "Index frequently queried columns for better performance",
      projectId: "2",
      status: "done",
      priority: "low",
      assignee: { name: "Morgan Smith", avatar: "MS", id: "4" },
      dueDate: "2024-11-08",
    },
  ])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        if (!task.title.toLowerCase().includes(searchLower) && !task.description.toLowerCase().includes(searchLower)) {
          return false
        }
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(task.status)) {
        return false
      }

      // Priority filter
      if (filters.priority.length > 0 && !filters.priority.includes(task.priority)) {
        return false
      }

      // Assignee filter
      if (filters.assignee.length > 0 && !filters.assignee.includes(task.assignee.id)) {
        return false
      }

      return true
    })
  }, [tasks, filters])

  const handleUpdateTask = (taskId: string, updates: any) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task)))
  }

  const uniqueAssignees = Array.from(new Map(tasks.map((task) => [task.assignee.id, task.assignee])).values())

  return (
    <div className="flex h-screen bg-background">
      <Sidebar projects={projects} currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TaskFilters onFilterChange={setFilters} assignees={uniqueAssignees} />
        {currentView === "dashboard" ? (
          <Dashboard projects={projects} tasks={filteredTasks} onTaskClick={setSelectedTask} />
        ) : (
          <KanbanBoard tasks={filteredTasks} onTaskClick={setSelectedTask} onTaskUpdate={handleUpdateTask} />
        )}
      </main>
      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} onUpdate={handleUpdateTask} />
      )}
    </div>
  )
}
