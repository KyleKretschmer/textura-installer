import { IpcBridge } from './ipc.bridge'

export class InstallerService {
  private bridge = new IpcBridge()

  async sayHello(name: string): Promise<string> {
    const response = await this.bridge.invoke<{ message: string }>('installer:hello', { name })
    return response.message
  }

  async getStatus(): Promise<string> {
    const response = await this.bridge.invoke<{ status: string }>('installer:getStatus', {})
    return response.status
  }

  async detectDotNet(): Promise<boolean> {
    const response = await this.bridge.invoke<{ installed: boolean }>('installer:detectDotNet', {})
    return response.installed
  }

  async runDotNetTest(input: string): Promise<string> {
    const response = await this.bridge.invoke<{ output: string; exitCode: number }>('installer:runDotNet', { input })
    return response.output
  }
}