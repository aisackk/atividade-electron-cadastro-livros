const { app, BrowserWindow, ipcMain } = require("electron");
const mysql = require("mysql2/promise");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: __dirname + "/preload.js",
    },
  });

  win.loadFile("pages/index.html");
};

// 📥 Salvar livro
ipcMain.handle('salvar-livros', async (evento, titulo, autor) => {
  console.log("Salvando livros:", titulo, autor);

  const conexao = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'livros_db',
  });

  await conexao.execute("INSERT INTO livros (titulo, autor) VALUES (?, ?)", [titulo, autor]);
});

// 📤 Listar livros
ipcMain.handle('listar-livros', async (evento) => {
  const conexao = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'livros_db',
  });

  const [rows] = await conexao.execute('SELECT * FROM livros');
  return rows;
});

// 🚀 Inicializa janela
app.whenReady().then(() => {
  createWindow();
});
