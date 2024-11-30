const API_KEY = '9722278b683a521e3c153afd800b8caa';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

function obtenerSeries() {
  fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es&page=1`)
    .then(response => response.json())
    .then(data => {
      mostrarSeries(data.results.slice(0, 30));
    })
    .catch(error => console.error('Error al obtener las series:', error));
}

function mostrarSeries(series) {
  const contenedor = document.getElementById('contenedor-series');
  contenedor.innerHTML = '';

  series.forEach(serie => {
    const serieDiv = document.createElement('div');
    serieDiv.classList.add('serie');

    const sinopsis = serie.overview ? `<p>${serie.overview}</p>` : '<p>No hay sinopsis disponible.</p>';

    serieDiv.innerHTML = `
      <img src="${IMAGE_URL}${serie.poster_path || 'ruta/por/defecto.jpg'}" alt="${serie.name}">
      <h3>${serie.name}</h3>
      ${sinopsis}
      <div id="trailer-${serie.id}" class="trailer-container"></div>
    `;

    contenedor.appendChild(serieDiv);
    obtenerTrailerSerie(serie.id, serie.name);
  });
}

function obtenerTrailerSerie(serieId, serieName) {
  fetch(`${BASE_URL}/tv/${serieId}/videos?api_key=${API_KEY}&language=es`)
    .then(response => response.json())
    .then(data => {
      const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        const trailerDiv = document.getElementById(`trailer-${serieId}`);
        trailerDiv.innerHTML = `
          <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
        `;
      } else {
        document.getElementById(`trailer-${serieId}`).innerHTML = '<p>No hay tráiler disponible.</p>';
      }
    })
    .catch(error => console.error('Error al obtener el tráiler:', error));
}

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', obtenerSeries);


