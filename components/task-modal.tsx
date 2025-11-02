"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import { X, Calendar, User, MessageSquare, Eye, Link2 } from "lucide-react"

interface TaskModalProps {
  task: any
  onClose: () => void
  onUpdate: (taskId: string, updates: any) => void
}

export function TaskModal({ task, onClose, onUpdate }: TaskModalProps) {
  const [description, setDescription] = useState(task.description)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [comments, setComments] = useState([
    {
      id: "1",
      author: { name: "Sarah Chen", avatar: "SC" },
      text: "Started working on this",
      timestamp: "2024-11-12T10:30:00",
    },
  ])
  const [newComment, setNewComment] = useState("")
  const [tab, setTab] = useState<"details" | "activity">("details")

  const handleStatusChange = (newStatus: string) => {
    onUpdate(task.id, { status: newStatus })
  }

  const handlePriorityChange = (newPriority: string) => {
    onUpdate(task.id, { priority: newPriority })
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: String(comments.length + 1),
          author: { name: "You", avatar: "YO" },
          text: newComment,
          timestamp: new Date().toISOString(),
        },
      ])
      setNewComment("")
      setShowCommentInput(false)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
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
        return ""
    }
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-96 bg-card border-l border-border z-50 flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Task Details</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-6">
          <button
            onClick={() => setTab("details")}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              tab === "details"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setTab("activity")}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
              tab === "activity"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Activity
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {tab === "details" ? (
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{task.title}</h3>
                <p className="text-sm text-muted-foreground">{task.id}</p>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-lg bg-background border border-border text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Add a description..."
                />
              </div>

              {/* Properties */}
              <div className="space-y-4">
                {/* Status */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Status</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["todo", "in-progress", "done"].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          task.status === status
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground hover:bg-muted/80"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Priority</label>
                  <div className="flex gap-2">
                    {["low", "medium", "high"].map((priority) => (
                      <button
                        key={priority}
                        onClick={() => handlePriorityChange(priority)}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          task.priority === priority
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground hover:bg-muted/80"
                        }`}
                      >
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" />
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={task.dueDate}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Assignee */}
                <div>
                  <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    Assignee
                  </label>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border">
                    <UserAvatar initials={task.assignee.avatar} size="sm" />
                    <span className="text-sm text-foreground">{task.assignee.name}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 text-sm transition-colors">
                    <Link2 className="w-4 h-4" />
                    Link
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 text-sm transition-colors">
                    <Eye className="w-4 h-4" />
                    Watch
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <UserAvatar initials={comment.author.avatar} size="sm" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">{formatTime(comment.timestamp)}</span>
                      </div>
                      <p className="text-sm text-foreground bg-background p-3 rounded-lg">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              {showCommentInput ? (
                <div className="space-y-2 pt-4 border-t border-border">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-3 rounded-lg bg-background border border-border text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handleAddComment}
                    >
                      Comment
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setShowCommentInput(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCommentInput(true)}
                  className="w-full p-3 rounded-lg border border-dashed border-border text-muted-foreground hover:bg-background/50 text-sm transition-colors flex items-center justify-center gap-2 mt-4"
                >
                  <MessageSquare className="w-4 h-4" />
                  Add a comment
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex gap-3">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
            Close
          </Button>
          <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
        </div>
      </div>
    </>
  )
}
