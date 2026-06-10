import React, { useState } from 'react'
import { TexturaInput } from './textura/TexturaInput'
import { TexturaButton } from './textura/TexturaButton'
import { TexturaOutput } from './textura/TexturaOutput'
import { InstallerService } from '../../services/installer.service'

type OutputState = 'idle' | 'loading' | 'success' | 'error'

const service = new InstallerService()

export default function InstallerScreen() {
  const [inputValue, setInputValue] = useState('')
  const [outputMessage, setOutputMessage] = useState('Enter a name above and click the button.')
  const [outputState, setOutputState] = useState<OutputState>('idle')

  async function handleSubmit() {
    if (!inputValue.trim()) return
    setOutputState('loading')
    setOutputMessage('Calling service layer…')

    try {
      const result = await service.sayHello(inputValue.trim())
      setOutputMessage(result)
      setOutputState('success')
    } catch (err) {
      setOutputMessage(err instanceof Error ? err.message : 'Unknown error')
      setOutputState('error')
    }
  }

  const isLoading = outputState === 'loading'

  return (
    <section className="installer-screen">
      <h1>Installation Setup</h1>
      <p>Sprint 1 spike — demonstrates the UI → service → backend flow.</p>

      <TexturaInput
        value={inputValue}
        onChange={setInputValue}
        placeholder="Enter your name…"
        label="Name"
        disabled={isLoading}
      />

      <TexturaButton onClick={handleSubmit} disabled={!inputValue.trim()} loading={isLoading}>
        Run Hello Step
      </TexturaButton>

      <TexturaOutput message={outputMessage} state={outputState} />

      <div className="arch-note">
        <strong>Architecture note:</strong> This button triggers{' '}
        <code>InstallerService.sayHello()</code> → IPC bridge (Electron) or fetch mock (web) →
        backend handler → response. No direct UI-to-backend coupling.
      </div>
    </section>
  )
}