document.addEventListener("DOMContentLoaded", () => {
	const botaoEnviar = document.getElementById("enviar");
	const texto = document.getElementById("texto");
	const chat = document.getElementById("mensagens");
	const socket = io();

	// Função para enviar mensagem
	const enviarMensagem = () => {
		const mensagem = texto.value.trim();
		if (mensagem) {
			socket.emit("nova mensagem", mensagem);
			texto.value = "";
			texto.focus(); // Mantém o foco no campo de texto
		}
	};

	// Enviar mensagem ao clicar no botão
	botaoEnviar.addEventListener("click", enviarMensagem);

	// Enviar mensagem ao pressionar Enter
	texto.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			event.preventDefault(); // Evita quebra de linha no input
			enviarMensagem();
		}
	});

	// Evento para exibir mensagens recebidas
	socket.addEventListener("nova mensagem", (msg) => {
		const novaMensagem = document.createElement("li");
		novaMensagem.classList.add("mensagem");
		novaMensagem.textContent = msg;
		chat.appendChild(novaMensagem);

		// Rola automaticamente para a última mensagem
		chat.scrollTop = chat.scrollHeight;
	});
});
