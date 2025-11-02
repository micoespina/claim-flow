"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserAvatar } from "@/components/user-avatar"
import { CheckCircle2, AlertCircle, Clock } from "lucide-react"

interface DashboardProps {
  projects: any[]
  tasks: any[]
  onTaskClick: (task: any) => void
}

export function Dashboard({ projects, tasks, onTaskClick }: DashboardProps) {
  const tasksByStatus = {
    todo: tasks.filter((t) => t.status === "todo").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  }

  const overdueTasks = tasks.filter((t) => new Date(t.dueDate) < new Date() && t.status !== "done")
  const highPriorityTasks = tasks.filter((t) => t.priority === "high" && t.status !== "done")

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your project overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">In Progress</p>
                <p className="text-3xl font-bold text-foreground">{tasksByStatus["in-progress"]}</p>
              </div>
              <Clock className="w-12 h-12 text-primary/30" />
            </div>
          </Card>
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">To Do</p>
                <p className="text-3xl font-bold text-foreground">{tasksByStatus.todo}</p>
              </div>
              <AlertCircle className="w-12 h-12 text-orange-400/30" />
            </div>
          </Card>
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Completed</p>
                <p className="text-3xl font-bold text-foreground">{tasksByStatus.done}</p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-green-400/30" />
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-2 gap-8">
          {/* High Priority Tasks */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-bold text-foreground mb-4">High Priority</h2>
            <div className="space-y-3">
              {highPriorityTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onTaskClick(task)}
                  className="p-3 rounded-lg bg-background border border-border hover:border-primary cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground text-sm">{task.title}</h3>
                    <Badge variant="destructive" className="text-xs">
                      HIGH
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{task.projectKey}</span>
                    <UserAvatar initials={task.assignee.avatar} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Overdue Tasks */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-bold text-foreground mb-4">Overdue</h2>
            <div className="space-y-3">
              {overdueTasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">No overdue tasks!</p>
              ) : (
                overdueTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => onTaskClick(task)}
                    className="p-3 rounded-lg bg-background border border-destructive/30 hover:border-destructive cursor-pointer transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground text-sm">{task.title}</h3>
                      <span className="text-xs text-destructive font-medium">OVERDUE</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
