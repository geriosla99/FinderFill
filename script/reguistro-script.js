document.getElementById('form-registro').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Simulación de registro de usuario
    const usuario = { nombre, email, password };
    localStorage.setItem('usuario', JSON.stringify(usuario));
  
    // Mostrar mensaje de éxito
    document.getElementById('mensaje').innerText = 'Registro exitoso!';
    document.getElementById('form-registro').reset();
  });
  