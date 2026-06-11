import React, { useState } from 'react'
import { TexturaInput } from './textura/TexturaInput'
import { TexturaButton } from './textura/TexturaButton'
import { TexturaOutput } from './textura/TexturaOutput'
import { InstallerService } from '../../services/installer.service'

type OutputState = 'idle' | 'loading' | 'success' | 'error'

const service = new InstallerService()

export default function InstallerScreen() {
  const [inputValue, setInputValue] = useState('')
  const [outputMessage, setOutputMessage] = useState('Enter a name above and click a button.')
  const [outputState, setOutputState] = useState<OutputState>('idle')

  async function handleHello() {
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

  async function handleDetectDotNet() {
    setOutputState('loading')
    setOutputMessage('Checking for .NET Framework 3.5…')
    try {
      const installed = await service.detectDotNet()
      setOutputMessage(
        installed
          ? '.NET Framework 3.5 is installed on this machine.'
          : '.NET Framework 3.5 was NOT detected.'
      )
      setOutputState(installed ? 'success' : 'error')
    } catch (err) {
      setOutputMessage(err instanceof Error ? err.message : 'Unknown error')
      setOutputState('error')
    }
  }

  async function handleRunDotNet() {
    if (!inputValue.trim()) return
    setOutputState('loading')
    setOutputMessage('Invoking .NET 3.5 process…')
    try {
      const result = await service.runDotNetTest(inputValue.trim())
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

      <div className="button-group">
        <TexturaButton onClick={handleHello} disabled={!inputValue.trim()} loading={isLoading}>
          Run Hello Step
        </TexturaButton>

        <TexturaButton onClick={handleDetectDotNet} disabled={isLoading} loading={isLoading}>
          Detect .NET 3.5
        </TexturaButton>

        <TexturaButton onClick={handleRunDotNet} disabled={!inputValue.trim()} loading={isLoading}>
          Run .NET 3.5 Test
        </TexturaButton>
      </div>

      <TexturaOutput message={outputMessage} state={outputState} />

      <div className="arch-note">
        <strong>Architecture note:</strong> Each button routes through{' '}
        <code>InstallerService</code> → IPC bridge → Electron main process → handler.
        No direct UI-to-backend coupling.
      </div>
    </section>
  )
}