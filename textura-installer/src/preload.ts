import { contextBridge, ipcRenderer } from 'electron'

// This is the ONLY channel through which the UI may communicate with the main process.
contextBridge.exposeInMainWorld('installerBridge', {
  invoke: (channel: string, payload: unknown): Promise<unknown> => {
    const allowedChannels = ['installer:hello', 'installer:getStatus']
    if (!allowedChannels.includes(channel)) {
      return Promise.reject(new Error(`Channel "${channel}" is not permitted`))
    }
    return ipcRenderer.invoke(channel, payload)
  },
})