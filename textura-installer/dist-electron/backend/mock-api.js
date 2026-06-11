"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hello_handler_js_1 = require("./handlers/hello.handler.js");
const dotnet_handler_js_1 = require("./handlers/dotnet.handler.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
});
app.options('*', (_req, res) => res.sendStatus(204));
app.post('/api/hello', (req, res) => {
    try {
        const result = (0, hello_handler_js_1.helloHandler)(req.body);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ error: err instanceof Error ? err.message : 'Bad request' });
    }
});
app.get('/api/status', (_req, res) => {
    res.json((0, hello_handler_js_1.statusHandler)());
});
app.get('/api/dotnet/detect', (_req, res) => {
    res.json((0, dotnet_handler_js_1.detectDotNetHandler)());
});
app.post('/api/dotnet/run', (req, res) => {
    try {
        const result = (0, dotnet_handler_js_1.runDotNetHandler)(req.body);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ error: err instanceof Error ? err.message : 'Bad request' });
    }
});
const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
    console.log(`Mock API running at http://localhost:${PORT}`);
});
