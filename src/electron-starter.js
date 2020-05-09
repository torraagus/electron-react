// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

app.allowRendererProcessReuse = true;

const port = process.env.PORT ? process.env.PORT - 100 : 3000;
const inDevelopment = process.env.NODE_ENV === "development" ? true : false;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			//preload: path.join(__dirname, "preload.js"),
		},
	});

	// and load the index.html of the app.
	//mainWindow.loadFile("index.html");
	if (inDevelopment) {
		mainWindow.loadURL(process.env.ELECTRON_START_URL);
		// Open the DevTools.
		mainWindow.webContents.openDevTools();
	} else {
		const startUrl =
		url.format({
			pathname: path.join(__dirname, "/../build/index.html"),
			protocol: "file:",
			slashes: true,
		});
		console.log(startUrl);
		mainWindow.loadURL(startUrl);
	}

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
