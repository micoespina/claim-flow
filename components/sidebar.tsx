"use client"

import { LayoutDashboard, Kanban, Settings, Plus, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { TeamPanel } from "./team-panel"
import { SprintManager } from "./sprint-manager"

interface SidebarProps {
  projects: any[]
  currentView: string
  onViewChange: (view: "dashboard" | "board") => void
}

export function Sidebar({ projects, currentView, onViewChange }: SidebarProps) {
  const [showTeam, setShowTeam] = useState(false)
  const [showSprints, setShowSprints] = useState(false)

  return (
    <>
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-sidebar-primary flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center text-sidebar-primary-foreground text-sm font-bold">
              J
            </div>
            Jira
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => onViewChange("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === "dashboard"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={() => onViewChange("board")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === "board"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            }`}
          >
            <Kanban className="w-4 h-4" />
            Board
          </button>

          <button
            onClick={() => setShowTeam(true)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50"
          >
            <Users className="w-4 h-4" />
            Team
          </button>
          <button
            onClick={() => setShowSprints(true)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50"
          >
            <Calendar className="w-4 h-4" />
            Sprints
          </button>
        </nav>

        {/* Projects */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-sidebar-foreground uppercase tracking-wider">Projects</h3>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-2 px-2 py-2 rounded hover:bg-sidebar-accent/50 cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                <span className="text-sm text-sidebar-foreground truncate">{project.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="p-4 border-t border-sidebar-border">
          <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </aside>

      {showTeam && <TeamPanel onClose={() => setShowTeam(false)} />}
      {showSprints && <SprintManager onClose={() => setShowSprints(false)} />}
    </>
  )
}
