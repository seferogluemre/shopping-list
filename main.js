import { app, BrowserWindow } from "electron";
import path from "path";

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // app.isPackaged, uygulamanın paketlenip paketlenmediğini (yani production'da olup olmadığını) kontrol eder.
  // Geliştirme sırasında (pnpm run electron-dev) false döner ve localhost'a bağlanır.
  // Production'da (pnpm run electron) true döner ve build dosyasını yükler.
  if (process.env.NODE_ENV === "development" || !app.isPackaged) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools(); // Geliştirme araçlarını otomatik aç
  } else {
    win.loadFile(path.join(__dirname, "dist", "index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
