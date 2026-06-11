"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectDotNetHandler = detectDotNetHandler;
exports.runDotNetHandler = runDotNetHandler;
function detectDotNetHandler() {
    // Mock response for web mode — always returns true in browser
    return { installed: true };
}
function runDotNetHandler(req) {
    // Mock response for web mode — simulates what the real EXE would return
    return {
        output: `[mock] Hello from .NET 3.5: ${req.input}`,
        exitCode: 0,
    };
}
