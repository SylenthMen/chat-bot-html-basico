document.getElementById('send-btn').addEventListener('click', sendMessage);



// Agregar manejador de eventos para el input
document.getElementById('chat-input').addEventListener('keypress', function(event) {
    // Verificar si la tecla presionada es Enter
    if (event.key === 'Enter') {
        // Prevenir la acción por defecto de la tecla Enter (nueva línea)
        event.preventDefault();
        // Llamar a la función de enviar mensaje
        sendMessage();
    }
});

// Función para simular la escritura de texto en tiempo real
function typeMessage(message, element) {
    let index = 0;
    const interval = 50; // Intervalo en milisegundos entre letras

    function type() {
        if (index < message.length) {
            element.textContent += message.charAt(index);
            index++;
            setTimeout(type, interval);
        }
    }

    type();
}

// Modificación de la función sendMessage para usar typeMessage
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (message) {
        fetch('chat-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            const chatBox = document.getElementById('chat-box');
            
            // Mensaje del usuario
            const userMessage = document.createElement('div');
            userMessage.textContent = `🤷🏼Tú: ${message}`;
            chatBox.appendChild(userMessage);
            
            // Preparar el elemento para el mensaje de la IA
            const aiMessage = document.createElement('div');
            chatBox.appendChild(aiMessage);
            
            // Simular escritura del mensaje de la IA
            typeMessage(`🤖Asistente: ${data.choices[0].message.content}`, aiMessage);

            // Limpiar el campo de entrada
            input.value = '';
        })
        .catch(error => console.error('Error al enviar mensaje:', error));

        
    }
}

