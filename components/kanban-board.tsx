"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserAvatar } from "@/components/user-avatar"
import { Plus, Calendar, GripVertical, AlertCircle } from "lucide-react"

const STATUSES = [
  { id: "todo", label: "To Do", color: "bg-slate-100 dark:bg-slate-800" },
  { id: "in-progress", label: "In Progress", color: "bg-blue-100 dark:bg-blue-900" },
  { id: "done", label: "Done", color: "bg-green-100 dark:bg-green-900" },
]

interface KanbanBoardProps {
  tasks: any[]
  onTaskClick: (task: any) => void
  onTaskUpdate: (taskId: string, updates: any) => void
}

export function KanbanBoard({ tasks, onTaskClick, onTaskUpdate }: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<any>(null)
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, task: any) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("taskId", task.id)
  }

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverColumn(columnId)
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault()
    setDragOverColumn(null)
    if (draggedTask) {
      onTaskUpdate(draggedTask.id, { status })
      setDraggedTask(null)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const isTaskOverdue = (task: any) => {
    return new Date(task.dueDate) < new Date() && task.status !== "done"
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Board</h1>
        <p className="text-muted-foreground">Manage your tasks with drag and drop</p>
      </div>

      <div className="grid grid-cols-3 gap-6 h-full">
        {STATUSES.map((status) => {
          const statusTasks = tasks.filter((t) => t.status === status.id)
          const totalTasks = statusTasks.length
          const overdueTasks = statusTasks.filter(isTaskOverdue).length

          return (
            <div key={status.id} className="flex flex-col">
              {/* Column Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-foreground text-lg">{status.label}</h2>
                  <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-primary/20 text-primary">
                    {totalTasks}
                  </span>
                  {overdueTasks > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200">
                      <AlertCircle className="w-3 h-3" />
                      {overdueTasks}
                    </div>
                  )}
                </div>
              </div>

              {/* Tasks Container */}
              <div
                onDragOver={(e) => handleDragOver(e, status.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, status.id)}
                className={`flex-1 space-y-3 min-h-96 rounded-lg p-4 transition-all ${
                  dragOverColumn === status.id
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-muted/30 border-2 border-transparent"
                }`}
              >
                {statusTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                    <p className="text-sm">No tasks</p>
                  </div>
                ) : (
                  statusTasks.map((task) => (
                    <Card
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onClick={() => onTaskClick(task)}
                      className={`p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-all bg-card border-border group ${
                        isTaskOverdue(task) ? "border-red-300 dark:border-red-700" : ""
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Drag Handle and Title */}
                        <div className="flex items-start gap-2">
                          <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                          <h3 className="font-medium text-foreground text-sm line-clamp-2 flex-1">{task.title}</h3>
                        </div>

                        {/* Priority Badge */}
                        <Badge className={getPriorityColor(task.priority)} variant="outline">
                          {task.priority}
                        </Badge>

                        {/* Footer with Date and Assignee */}
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div
                            className={`flex items-center gap-1 text-xs ${
                              isTaskOverdue(task)
                                ? "text-red-600 dark:text-red-400 font-medium"
                                : "text-muted-foreground"
                            }`}
                          >
                            <Calendar className="w-3 h-3" />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <UserAvatar initials={task.assignee.avatar} size="sm" />
                        </div>
                      </div>
                    </Card>
                  ))
                )}

                {/* Add Task Button */}
                <button className="w-full p-3 rounded-lg text-muted-foreground hover:bg-background/50 text-sm flex items-center justify-center gap-2 transition-colors border border-dashed border-muted-foreground/30 hover:border-primary/30">
                  <Plus className="w-4 h-4" />
                  Add task
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
