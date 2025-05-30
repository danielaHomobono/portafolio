/* ¡Me encanta que el formulario sea funcional! Quise agregar validaciones simples y ver los datos en la consola */
document.addEventListener('DOMContentLoaded', () => {
  // Selecciono el formulario y el botón
  const form = document.querySelector('form');
  const submitButton = form.querySelector('button[type="submit"]');

  // Añado un evento al enviar el formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evito que se recargue la página, ¡súper importante!

    // Obtengo los valores de los campos
    const name = form.querySelector('#name').value.trim();
    const lastname = form.querySelector('#lastname').value.trim();
    const email = form.querySelector('#email').value.trim();
    const phone = form.querySelector('#phone').value.trim();

    // Muestro los datos en la consola, ¡me encanta poder depurar así!
    console.log('Datos del formulario:', { name, lastname, email, phone });

    // Valido los campos
    if (!name || !lastname || !email || !phone) {
      showMessage('Por favor, completá todos los campos.', 'error');
      return;
    }

    // Valido el formato del email con una expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage('Ingresá un email válido, ¡como ejemplo@dominio.com!', 'error');
      return;
    }

    // Valido que el teléfono contenga solo números y tenga al menos 8 dígitos
    const phoneRegex = /^\d{8,}$/;
    if (!phoneRegex.test(phone)) {
      showMessage('El teléfono debe tener al menos 8 números, sin espacios ni letras.', 'error');
      return;
    }

    // Si todo está bien, muestro un mensaje de éxito
    showMessage(`¡Gracias, ${name}! Tu mensaje fue enviado con éxito.`, 'success');

    // Limpio el formulario
    form.reset();
  });

  // Función para mostrar mensajes, ¡quise que fuera súper clara!
  function showMessage(text, type) {
    let message = document.querySelector('.form-message');
    
    // Si no existe, lo creo
    if (!message) {
      message = document.createElement('p');
      message.className = 'form-message';
      form.insertBefore(message, submitButton);
    }

    // Estilo el mensaje según el tipo
    message.textContent = text;
    message.style.color = type === 'success' ? '#81c784' : '#e57373';
    message.style.marginBottom = '1rem';
    message.style.fontSize = '1rem';
    message.style.textAlign = 'center';

    // Lo elimino después de 3 segundos
    setTimeout(() => {
      message.remove();
    }, 3000);
  }
});