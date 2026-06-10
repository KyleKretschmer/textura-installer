import React from 'react'

interface TexturaInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  label?: string
}

// Placeholder — replace with real @textura/react Input when available.
export function TexturaInput({ value, onChange, placeholder, disabled, label }: TexturaInputProps) {
  return (
    <div className="field-group">
      {label && <label>{label}</label>}
      <input
        className="textura-input"
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  )
}