const { contextBridge, ipcRenderer} = require('electron')

function salvarLivro(titulo, autor){
    console.log("Função salvar livros")
    console.log("Titulo: ", titulo)
    console.log("Autor: ", autor)

    ipcRenderer.invoke('salvar-livros', titulo, autor)
    }

function listarLivro() {
    return ipcRenderer.invoke('listar-livros')
}

contextBridge.exposeInMainWorld('api', {
        salvarLivro,
        listarLivro,
    })