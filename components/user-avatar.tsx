interface UserAvatarProps {
  initials: string
  size?: "sm" | "md" | "lg"
}

export function UserAvatar({ initials, size = "md" }: UserAvatarProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  }

  const colors = ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-green-500", "bg-orange-500"]

  const colorIndex = initials.charCodeAt(0) % colors.length

  return (
    <div
      className={`${sizeClasses[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center font-bold text-white`}
    >
      {initials}
    </div>
  )
}
