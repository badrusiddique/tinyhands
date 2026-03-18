import Link from 'next/link'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

export default function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-full font-bold font-nunito transition-colors px-8 py-3 text-lg'

  const styles = {
    primary: 'bg-coral text-white hover:bg-[#e55a5a]',
    secondary: 'bg-white text-coral border-2 border-coral hover:bg-coral hover:text-white',
  }

  const combined = `${base} ${styles[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={combined}>
      {children}
    </button>
  )
}
