"use client"

import { useState } from "react"
import { Users, Plus, X, Mail, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { UserAvatar } from "@/components/user-avatar"

interface TeamMember {
  id: string
  name: string
  avatar: string
  email: string
  role: "lead" | "developer" | "designer"
  tasksAssigned: number
}

interface TeamPanelProps {
  onClose: () => void
}

export function TeamPanel({ onClose }: TeamPanelProps) {
  const [team, setTeam] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "SC",
      email: "sarah@company.com",
      role: "lead",
      tasksAssigned: 5,
    },
    {
      id: "2",
      name: "Alex Rodriguez",
      avatar: "AR",
      email: "alex@company.com",
      role: "developer",
      tasksAssigned: 4,
    },
    {
      id: "3",
      name: "Jordan Liu",
      avatar: "JL",
      email: "jordan@company.com",
      role: "designer",
      tasksAssigned: 3,
    },
    {
      id: "4",
      name: "Morgan Smith",
      avatar: "MS",
      email: "morgan@company.com",
      role: "developer",
      tasksAssigned: 2,
    },
  ])

  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")

  const handleInviteTeamMember = () => {
    if (inviteEmail.trim()) {
      // In a real app, this would send an invite
      setInviteEmail("")
      setShowInviteForm(false)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "lead":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
      case "developer":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
      case "designer":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-200"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200"
    }
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
            <Users className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Team</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {/* Team Members */}
          <div className="space-y-3">
            {team.map((member) => (
              <Card key={member.id} className="p-4 bg-background border-border hover:border-primary transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <UserAvatar initials={member.avatar} size="md" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground text-sm">{member.name}</h3>
                      <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-muted rounded transition-colors flex-shrink-0">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Role and Tasks */}
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded-full font-medium ${getRoleColor(member.role)}`}>
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </span>
                  <span className="text-muted-foreground">{member.tasksAssigned} tasks</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Invite Section */}
          <div className="pt-4 border-t border-border">
            {showInviteForm ? (
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="team@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handleInviteTeamMember}
                  >
                    Send Invite
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowInviteForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowInviteForm(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Invite Team Member
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
