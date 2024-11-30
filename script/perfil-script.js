document.addEventListener('DOMContentLoaded', function() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      const perfilInfo = `
        <p><strong>Nombre:</strong> ${usuario.nombre}</p>
        <p><strong>Correo Electrónico:</strong> ${usuario.email}</p>
      `;
      document.getElementById('perfil-info').innerHTML = perfilInfo;
    } else {
      document.getElementById('perfil-info').innerHTML = '<p>No hay información de usuario. Por favor, regístrese.</p>';
    }
  });
  