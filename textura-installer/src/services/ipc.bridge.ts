// IPC / fetch abstraction layer.
// Electron runtime: delegates via contextBridge → ipcRenderer → main process.
// Web runtime: falls back to HTTP fetch against the mock API.
// The UI never needs to know which runtime is active.

declare global {
  interface Window {
    installerBridge?: {
      invoke: (channel: string, payload: unknown) => Promise<unknown>
    }
  }
}

const MOCK_API_BASE = 'http://localhost:3001'

export class IpcBridge {
  private isElectron = typeof window !== 'undefined' && !!window.installerBridge

  async invoke<T>(channel: string, payload: unknown): Promise<T> {
    if (this.isElectron) {
      return window.installerBridge!.invoke(channel, payload) as Promise<T>
    }
    return this.fetchFallback<T>(channel, payload)
  }

  private async fetchFallback<T>(channel: string, payload: unknown): Promise<T> {
    const endpoint = channelToEndpoint(channel)
    const res = await fetch(`${MOCK_API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`Mock API error: ${res.status} ${res.statusText}`)
    return res.json() as Promise<T>
  }
}

function channelToEndpoint(channel: string): string {
  const map: Record<string, string> = {
    'installer:hello': '/api/hello',
    'installer:getStatus': '/api/status',
    'installer:detectDotNet': '/api/dotnet/detect',
    'installer:runDotNet': '/api/dotnet/run',
  }
  return map[channel] ?? `/${channel.replace(':', '/')}`
}