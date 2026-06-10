type OutputState = 'idle' | 'loading' | 'success' | 'error'

interface TexturaOutputProps {
  message: string
  state: OutputState
}

// Placeholder — replace with real @textura/react output component when available.
export function TexturaOutput({ message, state }: TexturaOutputProps) {
  return (
    <div className={`textura-output textura-output--${state}`} role="status" aria-live="polite">
      {state === 'loading' && <span className="spinner" aria-hidden="true" />}
      {message}
    </div>
  )
}