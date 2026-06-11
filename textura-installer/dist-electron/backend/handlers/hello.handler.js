"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloHandler = helloHandler;
exports.statusHandler = statusHandler;
function helloHandler(req) {
    if (!req.name || typeof req.name !== 'string') {
        throw new Error('name is required');
    }
    return { message: `Hello, ${req.name}!` };
}
function statusHandler() {
    return { status: 'mock backend running — ready for install steps' };
}
