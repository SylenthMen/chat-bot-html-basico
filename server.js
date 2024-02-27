const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();


// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Middleware para parsear el cuerpo de las solicitudes POST
app.use(express.json());

// Endpoint para procesar las solicitudes a la API de ChatGPT
app.post('/chat-message', async (req, res) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo", // Cambia al modelo que prefieras
                messages: [{
                    role: "user",
                    content: req.body.message
                }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Envía la respuesta de la API de OpenAI de vuelta al cliente
        res.json(response.data);
    } catch (error) {
        console.error('Error al llamar a la API de OpenAI:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
