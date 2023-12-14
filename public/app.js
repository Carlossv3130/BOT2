document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('chat-form');
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const user = 'User'; // Puedes reemplazarlo con la autenticación de usuario real si es necesario
      const message = messageInput.value;
  
      // Enviar mensaje al servidor
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, message }),
      });
  
      const data = await response.json();
  
      // Mostrar el mensaje del usuario
      appendMessage(user, message);
      // Mostrar la respuesta del bot
      appendMessage('Bot', data.message);
  
      // Limpiar el campo de entrada
      messageInput.value = '';
  
      // Hacer scroll hacia abajo para mostrar el último mensaje
      chatBox.scrollTop = chatBox.scrollHeight;
    });
  
    // Función para agregar un mensaje al chat
    function appendMessage(user, message) {
      const messageElement = document.createElement('div');
      messageElement.className = 'message';
      messageElement.innerHTML = `<strong>${user}:</strong> ${message}`;
      chatBox.appendChild(messageElement);
    }
  
    // Cargar historial de mensajes al cargar la página
    async function loadChatHistory() {
      const response = await fetch('/api/messages/history');
      const data = await response.json();
  
      // Mostrar el historial de mensajes
      data.forEach((entry) => {
        appendMessage(entry.user, entry.message);
        appendMessage('Bot', entry.botResponse);
      });
  
      // Hacer scroll hacia abajo para mostrar el último mensaje
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  
    // Llamar a la función para cargar el historial de mensajes
    loadChatHistory();
  });
  