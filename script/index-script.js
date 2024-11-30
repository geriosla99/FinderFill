const API_KEY = '9722278b683a521e3c153afd800b8caa';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// Función para obtener películas populares
function obtenerPeliculasIndex() {
  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es&page=1`)
    .then(response => response.json())
    .then(data => {
      mostrarPeliculaDestacada(data.results[0]);
      mostrarMiniaturas(data.results.slice(1, 6));
    })
    .catch(error => console.error('Error al obtener las películas:', error));
}

// Función para mostrar la película destacada
function mostrarPeliculaDestacada(pelicula) {
  const contenedor = document.getElementById('pelicula-destacada');
  contenedor.innerHTML = `
    <img src="${IMAGE_URL}${pelicula.poster_path || 'ruta/por/defecto.jpg'}" alt="${pelicula.title}">
    <h2 class="detailsPelis">${pelicula.title}</h2>
    <button onclick="mostrarDetalle(${pelicula.id})">Ver Detalles</button>
  `;
}

// Función para mostrar miniaturas de películas
function mostrarMiniaturas(peliculas) {
  const contenedor = document.getElementById('miniaturas');
  contenedor.innerHTML = '';

  peliculas.forEach(pelicula => {
    const miniaturaDiv = document.createElement('div');
    miniaturaDiv.classList.add('pelicula-miniatura');
    miniaturaDiv.onclick = () => mostrarDetalle(pelicula.id);

    miniaturaDiv.innerHTML = `
      <img src="${IMAGE_URL}${pelicula.poster_path || 'ruta/por/defecto.jpg'}" alt="${pelicula.title}">
      <h4>${pelicula.title}</h4>
    `;

    contenedor.appendChild(miniaturaDiv);
  });
}

// Función para mostrar detalles de una película
function mostrarDetalle(id) {
  fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es`)
    .then(response => response.json())
    .then(data => {
      const detallesSection = document.getElementById('detalles');
      detallesSection.innerHTML = `
        <h2>${data.title}</h2>
        <p><strong>Sinopsis:</strong> ${data.overview}</p>
        <p><strong>Fecha de estreno:</strong> ${data.release_date}</p>
        <p><strong>Calificación:</strong> ${data.vote_average}</p>
      `;
    })
    .catch(error => console.error('Error al obtener detalles:', error));
}

// Función para buscar películas
function buscarPeliculas(query) {
  fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=es&query=${query}`)
    .then(response => response.json())
    .then(data => {
      mostrarResultadosBusqueda(data.results);
    })
    .catch(error => console.error('Error al buscar películas:', error));
}

// Función para mostrar resultados de búsqueda
function mostrarResultadosBusqueda(peliculas) {
  const contenedor = document.getElementById('miniaturas');
  contenedor.innerHTML = '';

  peliculas.forEach(pelicula => {
    const miniaturaDiv = document.createElement('div');
    miniaturaDiv.classList.add('pelicula-miniatura');
    miniaturaDiv.onclick = () => mostrarDetalle(pelicula.id);

    miniaturaDiv.innerHTML = `
      <img src="${IMAGE_URL}${pelicula.poster_path || 'ruta/por/defecto.jpg'}" alt="${pelicula.title}">
      <h4>${pelicula.title}</h4>
    `;

    contenedor.appendChild(miniaturaDiv);
  });
}

// Evento para detectar entrada en el campo de búsqueda
document.querySelector('.search-input').addEventListener('input', (event) => {
  const query = event.target.value;
  if (query) {
    buscarPeliculas(query);
  } else {
    obtenerPeliculasIndex();
  }
});
document.addEventListener('click', (event) => {
  const searchContainer = document.querySelector('.search-container');
  const searchInput = document.querySelector('.search-input');

  if (!searchContainer.contains(event.target)) {
      searchInput.style.width = '0';
      searchInput.style.opacity = '0';
      searchInput.style.zIndex = '-1';
  }
});

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', obtenerPeliculasIndex);
