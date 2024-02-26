module.exports = (req, res) => {
    if (req.method === 'POST') {
        // Aquí puedes procesar la solicitud POST
        // Por ejemplo, enviar una respuesta de prueba:
        res.status(200).json({ message: 'Respuesta exitosa desde chat-message' });
    } else {
        // Método no permitido
        res.status(405).send('Método no permitido');
    }
};
