import { ipcMain } from 'electron'
import { helloHandler, statusHandler } from '../backend/handlers/hello.handler.js'

// Registers all IPC channel handlers in the Electron main process.
// Add new installer actions here as new ipcMain.handle() calls.
export function registerIpcHandlers(): void {
  ipcMain.handle('installer:hello', (_event, payload: { name: string }) => {
    return helloHandler(payload)
  })

  ipcMain.handle('installer:getStatus', () => {
    return statusHandler()
  })
}