const express = require('express')
const app = express();
const fetch = require('node-fetch');

app.get('', (request, response) => {
    response.send("Valid url is /download/latest/osname")
})

app.get('/download/latest/:os', (request, response) => {
    const getOS = request.params.os;
    fetch('https://api.github.com/repos/zulip/zulip-electron/releases/latest').then(res => res.json()).then(json => {
        return json.name;
    }).then((getLatestVersion) => {
        const ELECTRON_APP_VERSION = getLatestVersion.substring(1); //removed v from version
        const ELECTRON_APP_URL_LINUX = "https://github.com/zulip/zulip-electron/releases/download/v" + ELECTRON_APP_VERSION + "/Zulip-" + ELECTRON_APP_VERSION + "-x86_64.AppImage";
        const ELECTRON_APP_URL_MAC = "https://github.com/zulip/zulip-electron/releases/download/v" + ELECTRON_APP_VERSION + "/Zulip-" + ELECTRON_APP_VERSION + ".dmg";
        const ELECTRON_APP_URL_WINDOWS = "https://github.com/zulip/zulip-electron/releases/download/v" + ELECTRON_APP_VERSION + "/Zulip-Web-Setup-" + ELECTRON_APP_VERSION + ".exe";
        switch (getOS) {
            case "mac":
                downloadURL = ELECTRON_APP_URL_MAC;
                break;
            case "linux":
                downloadURL = ELECTRON_APP_URL_LINUX;
                break;
            case "windows":
                downloadURL = ELECTRON_APP_URL_WINDOWS;
                break
            default:
                break;
        }
        return response.redirect(downloadURL);
    }).catch((error) => {
        console.log("something went wrong. Error", error)
    })
})


app.listen(3000, () => console.log('This app is app listening on port 3000!'))
