"use client"

import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FilterOptions {
  search: string
  status: string[]
  priority: string[]
  assignee: string[]
}

interface TaskFiltersProps {
  onFilterChange: (filters: FilterOptions) => void
  assignees: Array<{ id: string; name: string; avatar: string }>
}

export function TaskFilters({ onFilterChange, assignees }: TaskFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    status: [],
    priority: [],
    assignee: [],
  })
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleStatusFilter = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status]
    const newFilters = { ...filters, status: newStatus }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const togglePriorityFilter = (priority: string) => {
    const newPriority = filters.priority.includes(priority)
      ? filters.priority.filter((p) => p !== priority)
      : [...filters.priority, priority]
    const newFilters = { ...filters, priority: newPriority }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleAssigneeFilter = (assigneeId: string) => {
    const newAssignee = filters.assignee.includes(assigneeId)
      ? filters.assignee.filter((a) => a !== assigneeId)
      : [...filters.assignee, assigneeId]
    const newFilters = { ...filters, assignee: newAssignee }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const resetFilters = () => {
    const emptyFilters: FilterOptions = { search: "", status: [], priority: [], assignee: [] }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  const hasActiveFilters = filters.status.length > 0 || filters.priority.length > 0 || filters.assignee.length > 0

  return (
    <div className="space-y-4 p-6 border-b border-border">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
        Filters {hasActiveFilters && `(${filters.status.length + filters.priority.length + filters.assignee.length})`}
      </button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-4 pt-4 border-t border-border">
          {/* Status Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Status</h4>
            <div className="flex flex-wrap gap-2">
              {["todo", "in-progress", "done"].map((status) => (
                <button
                  key={status}
                  onClick={() => toggleStatusFilter(status)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters.status.includes(status)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Priority</h4>
            <div className="flex flex-wrap gap-2">
              {["low", "medium", "high"].map((priority) => (
                <button
                  key={priority}
                  onClick={() => togglePriorityFilter(priority)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters.priority.includes(priority)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Assignee Filter */}
          {assignees.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Assignee</h4>
              <div className="flex flex-wrap gap-2">
                {assignees.map((assignee) => (
                  <button
                    key={assignee.id}
                    onClick={() => toggleAssigneeFilter(assignee.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      filters.assignee.includes(assignee.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {assignee.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reset Button */}
          {hasActiveFilters && (
            <Button size="sm" variant="outline" className="w-full bg-transparent" onClick={resetFilters}>
              Reset Filters
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
