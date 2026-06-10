import React from 'react'

interface TexturaButtonProps {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}

// Placeholder — replace with real @textura/react Button when available.
export function TexturaButton({ onClick, disabled, loading, children }: TexturaButtonProps) {
  return (
    <button
      className="textura-button"
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span className="spinner" aria-hidden="true" />}
      {children}
    </button>
  )
}