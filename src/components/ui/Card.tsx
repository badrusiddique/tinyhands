interface CardProps {
  className?: string
  children: React.ReactNode
}

export default function Card({ className = '', children }: CardProps) {
  return (
    <div className={`rounded-2xl bg-white shadow-md p-6 ${className}`}>
      {children}
    </div>
  )
}
