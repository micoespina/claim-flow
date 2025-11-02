"use client"

import { useState } from "react"
import { Calendar, Plus, X, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Sprint {
  id: string
  name: string
  startDate: string
  endDate: string
  status: "active" | "upcoming" | "completed"
  tasksCount: number
  completedTasks: number
}

interface SprintManagerProps {
  onClose: () => void
  onSelectSprint?: (sprint: Sprint) => void
}

export function SprintManager({ onClose, onSelectSprint }: SprintManagerProps) {
  const [sprints, setSprints] = useState<Sprint[]>([
    {
      id: "1",
      name: "Sprint 1 - Q4 Launch Prep",
      startDate: "2024-11-04",
      endDate: "2024-11-18",
      status: "active",
      tasksCount: 15,
      completedTasks: 7,
    },
    {
      id: "2",
      name: "Sprint 2 - Feature Polish",
      startDate: "2024-11-19",
      endDate: "2024-12-02",
      status: "upcoming",
      tasksCount: 12,
      completedTasks: 0,
    },
    {
      id: "3",
      name: "Sprint 0 - Foundation",
      startDate: "2024-10-21",
      endDate: "2024-11-03",
      status: "completed",
      tasksCount: 10,
      completedTasks: 10,
    },
  ])

  const [showNewSprintForm, setShowNewSprintForm] = useState(false)
  const [newSprint, setNewSprint] = useState({
    name: "",
    startDate: "",
    endDate: "",
  })

  const handleCreateSprint = () => {
    if (newSprint.name && newSprint.startDate && newSprint.endDate) {
      setSprints([
        ...sprints,
        {
          id: String(sprints.length + 1),
          name: newSprint.name,
          startDate: newSprint.startDate,
          endDate: newSprint.endDate,
          status: "upcoming",
          tasksCount: 0,
          completedTasks: 0,
        },
      ])
      setNewSprint({ name: "", startDate: "", endDate: "" })
      setShowNewSprintForm(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
      case "upcoming":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
      case "completed":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200"
      default:
        return ""
    }
  }

  const getProgressPercentage = (sprint: Sprint) => {
    return sprint.tasksCount > 0 ? Math.round((sprint.completedTasks / sprint.tasksCount) * 100) : 0
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-card border-l border-border z-50 flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Sprints</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {/* Sprints List */}
          {sprints.map((sprint) => {
            const progress = getProgressPercentage(sprint)
            return (
              <Card
                key={sprint.id}
                className="p-4 bg-background border-border hover:border-primary cursor-pointer transition-colors"
                onClick={() => onSelectSprint?.(sprint)}
              >
                <div className="space-y-3">
                  {/* Sprint Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground text-sm line-clamp-2">{sprint.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(sprint.status)}`}>
                          {sprint.status.charAt(0).toUpperCase() + sprint.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    {sprint.status === "completed" && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                  </div>

                  {/* Dates */}
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Start: {new Date(sprint.startDate).toLocaleDateString()}</div>
                    <div>End: {new Date(sprint.endDate).toLocaleDateString()}</div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">
                        {sprint.completedTasks}/{sprint.tasksCount}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}

          {/* New Sprint Form */}
          {showNewSprintForm ? (
            <Card className="p-4 bg-background border-border space-y-3">
              <input
                type="text"
                placeholder="Sprint name"
                value={newSprint.name}
                onChange={(e) => setNewSprint({ ...newSprint, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={newSprint.startDate}
                  onChange={(e) => setNewSprint({ ...newSprint, startDate: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="date"
                  value={newSprint.endDate}
                  onChange={(e) => setNewSprint({ ...newSprint, endDate: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleCreateSprint}
                >
                  Create
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowNewSprintForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          ) : (
            <button
              onClick={() => setShowNewSprintForm(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              New Sprint
            </button>
          )}
        </div>
      </div>
    </>
  )
}
