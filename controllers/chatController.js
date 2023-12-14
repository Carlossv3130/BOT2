const Chat = require('../models/chatModel');

// Función para manejar mensajes
async function handleMessage(req, res) {
  const { message } = req.body;

  // Formatear el mensaje para ser insensible a mayúsculas y minúsculas y eliminar ciertos signos de puntuación
  const formattedMessage = message.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();

  // Buscar en MongoDB
  try {
    const chatEntry = await Chat.findOne({ question: { $regex: new RegExp(formattedMessage, 'i') } });

    if (chatEntry) {
      // Encontró una respuesta
      const botResponse = chatEntry.answer;

      // Enviar la respuesta al cliente
      res.json({ message: botResponse });
    } else {
      // No se encontró una respuesta, puedes manejar esto según tus necesidades
      res.json({ message: 'Lo siento, no tengo una respuesta para eso.' });
    }
  } catch (error) {
    console.error('Error al buscar en MongoDB:', error);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = {
  handleMessage,
};
