"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerIpcHandlers = registerIpcHandlers;
const electron_1 = require("electron");
const hello_handler_js_1 = require("../backend/handlers/hello.handler.js");
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const __dirname = path_1.default.dirname((0, url_1.fileURLToPath)(import.meta.url));
function registerIpcHandlers() {
    electron_1.ipcMain.handle('installer:hello', (_event, payload) => {
        return (0, hello_handler_js_1.helloHandler)(payload);
    });
    electron_1.ipcMain.handle('installer:getStatus', () => {
        return (0, hello_handler_js_1.statusHandler)();
    });
    electron_1.ipcMain.handle('installer:detectDotNet', () => {
        try {
            const result = (0, child_process_1.execSync)('reg query "HKLM\\SOFTWARE\\Microsoft\\NET Framework Setup\\NDP\\v3.5" /v Install', { encoding: 'utf8' });
            return { installed: result.includes('0x1') };
        }
        catch {
            return { installed: false };
        }
    });
    electron_1.ipcMain.handle('installer:runDotNet', (_event, payload) => {
        return new Promise((resolve, reject) => {
            const exePath = path_1.default.join(__dirname, '../dotnet/dotnetWithElectron.exe');
            const proc = (0, child_process_1.spawn)(exePath, [payload.input]);
            let output = '';
            proc.stdout.on('data', (data) => output += data.toString());
            proc.on('close', (code) => resolve({ output: output.trim(), exitCode: code }));
            proc.on('error', reject);
        });
    });
}
