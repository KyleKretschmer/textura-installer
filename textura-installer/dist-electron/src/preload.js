"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('installerBridge', {
    invoke: (channel, payload) => {
        const allowedChannels = [
            'installer:hello',
            'installer:getStatus',
            'installer:detectDotNet',
            'installer:runDotNet',
        ];
        if (!allowedChannels.includes(channel)) {
            return Promise.reject(new Error(`Channel "${channel}" is not permitted`));
        }
        return electron_1.ipcRenderer.invoke(channel, payload);
    },
});
