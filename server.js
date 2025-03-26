const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const servidorHTTP = http.createServer(app);
const io = new Server(servidorHTTP); // Usando a nova forma do Socket.io

// Servindo arquivos estáticos
app.use(express.static("public"));

// WebSocket: conexão de usuários
io.on("connection", (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  // Evento de recebimento de mensagem
  socket.on("nova mensagem", (msg) => {
    console.log(`Mensagem recebida: ${msg}`);
    io.emit("nova mensagem", msg); // Enviando para todos
  });

  // Evento de desconexão
  socket.on("disconnect", () => {
    console.log(`Usuário desconectado: ${socket.id}`);
  });
});

// Iniciando o servidor
const PORTA = process.env.PORT || 3000; // Permite definir a porta via variável de ambiente
servidorHTTP.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
