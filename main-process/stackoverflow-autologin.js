const { BrowserWindow, ipcMain, session } = require('electron');

ipcMain.on('stackoverflow:login', async function (event) {
    const authWindow = new BrowserWindow({
        width: 700, height: 600, show: false, alwaysOnTop: true
    })

    const showAuthWindowIfNotLoggedIn = () => {
        authWindow.show()
    }

    const unloadAndCloseAuthWindow = () => {
        authWindow.webContents.removeListener('did-finish-load', showAuthWindowIfNotLoggedIn)
        authWindow.destroy()
    }

    const loadAuthUrl = () => {
        authWindow.loadURL(
            'https://stackexchange.com/oauth/dialog?redirect_uri=https://stackexchange.com/oauth/login_success&client_id=10932&scope=write_access private_info read_inbox')
    }

    authWindow.webContents.on('did-navigate', async (_event, url) => {
        const hashPosition = url.indexOf('#') + 1
        const unixTimeStamp = Math.floor((new Date()).getTime() / 1000);
        let [token, expires] = url.substring(hashPosition).split('&')
        if (token && expires) {
            token = token.split('=')[1]
            expires = +expires.split('=')[1]
            unloadAndCloseAuthWindow()
            event.reply('stackoverflow:login', { token, expires: unixTimeStamp + expires });
        }
        return;
    })
    authWindow.webContents.on('did-finish-load', showAuthWindowIfNotLoggedIn);
    loadAuthUrl();
})

ipcMain.handle('stackoverflow:pre-login', async function (event) {
    const cookies = await session.defaultSession.cookies.get({ domain: ".stackexchange.com" });
    try {
        const { expirationDate: expires, value: token } = cookies.find(({ name }) => name === 'token');
        const now = Math.floor((new Date()).getTime() / 1000);
        if (expires >= now) {
            return { expires, token }
        }
    } catch (error) {
        return { expires: 0, token: '' };
    }
});

ipcMain.on('stackoverflow:save-session', function (event, { token, expires }) {
    session.defaultSession.cookies.set({ url: 'https://stackexchange.com/oauth', domain: ".stackexchange.com", name: 'token', value: token, expirationDate: expires })
})