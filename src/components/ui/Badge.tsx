interface BadgeProps {
  color?: string
  className?: string
  children: React.ReactNode
}

export default function Badge({ color, className = '', children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold font-nunito ${className}`}
      style={color ? { backgroundColor: color } : undefined}
    >
      {children}
    </span>
  )
}
