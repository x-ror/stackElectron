window.electron = require('electron');
const { ipcRenderer } = require('electron');
async function start() {
    const { expires, token } = await ipcRenderer.invoke('stackoverflow:pre-login');
    if (expires === 0 || token === '') {
        return ipcRenderer.send('stackoverflow:login');
    }
}

start();