import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('installerBridge', {
  invoke: (channel: string, payload: unknown): Promise<unknown> => {
    const allowedChannels = [
      'installer:hello',
      'installer:getStatus',
      'installer:detectDotNet',
      'installer:runDotNet',
    ]
    if (!allowedChannels.includes(channel)) {
      return Promise.reject(new Error(`Channel "${channel}" is not permitted`))
    }
    return ipcRenderer.invoke(channel, payload)
  },
})