const API_KEY = '9722278b683a521e3c153afd800b8caa';
const BASE_URL = 'https://api.themoviedb.org/3';

function obtenerTrailers() {
  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es&page=1`)
    .then(response => response.json())
    .then(data => {
      mostrarTrailers(data.results.slice(0, 24));
    })
    .catch(error => console.error('Error al obtener los tráilers:', error));
}

function mostrarTrailers(peliculas) {
  const contenedor = document.getElementById('contenedor-trailers');
  contenedor.innerHTML = '';

  peliculas.forEach((pelicula, index) => {
    if (index < 24) { // Limita el número de tráilers a 24
      fetch(`${BASE_URL}/movie/${pelicula.id}/videos?api_key=${API_KEY}&language=es`)
        .then(response => response.json())
        .then(data => {
          const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
          if (trailer) {
            const trailerDiv = document.createElement('div');
            trailerDiv.classList.add('trailer');
            
            trailerDiv.innerHTML = `
              <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
              <h4>${pelicula.title}</h4>
            `;
            
            contenedor.appendChild(trailerDiv);
          }
        })
        .catch(error => console.error('Error al obtener el tráiler:', error));
    }
  });
}

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', obtenerTrailers);

