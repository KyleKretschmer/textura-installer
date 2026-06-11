export function detectDotNetHandler(): { installed: boolean } {
  // Mock response for web mode — always returns true in browser
  return { installed: true }
}

export function runDotNetHandler(req: { input: string }): { output: string; exitCode: number } {
  // Mock response for web mode — simulates what the real EXE would return
  return {
    output: `[mock] Hello from .NET 3.5: ${req.input}`,
    exitCode: 0,
  }
}