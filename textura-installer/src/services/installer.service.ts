import { IpcBridge } from './ipc.bridge'

// Single entry point for all UI-triggered installer actions.
// The UI never calls the backend directly — everything flows through here.
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
}