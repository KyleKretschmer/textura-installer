import { ipcMain } from 'electron'
import { helloHandler, statusHandler } from '../backend/handlers/hello.handler.js'
import { spawn, execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function registerIpcHandlers(): void {
  ipcMain.handle('installer:hello', (_event, payload: { name: string }) => {
    return helloHandler(payload)
  })

  ipcMain.handle('installer:getStatus', () => {
    return statusHandler()
  })

  ipcMain.handle('installer:detectDotNet', () => {
    try {
      const result = execSync(
        'reg query "HKLM\\SOFTWARE\\Microsoft\\NET Framework Setup\\NDP\\v3.5" /v Install',
        { encoding: 'utf8' }
      )
      return { installed: result.includes('0x1') }
    } catch {
      return { installed: false }
    }
  })

  ipcMain.handle('installer:runDotNet', (_event, payload: { input: string }) => {
    return new Promise((resolve, reject) => {
      const exePath = path.join(__dirname, '../dotnet/TestRunner.exe')
      const proc = spawn(exePath, [payload.input])

      let output = ''
      proc.stdout.on('data', (data: Buffer) => output += data.toString())
      proc.on('close', (code) => resolve({ output: output.trim(), exitCode: code }))
      proc.on('error', reject)
    })
  })
}