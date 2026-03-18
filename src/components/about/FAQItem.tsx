'use client'

import { useState } from 'react'

interface FAQItemProps {
  question: string
  answer: string
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`rounded-2xl overflow-hidden border-l-4 border-coral transition-colors ${open ? 'bg-white shadow-md' : 'bg-white/60'}`}>
      <button
        className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-gray-800 hover:bg-white/80 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <span
          className="text-xl text-coral transition-transform"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-4 text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  )
}
