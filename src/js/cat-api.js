import Notiflix from 'notiflix';

const API_KEY =
  'live_hntPhncjbsrsTCgBtI9wlgycKy8vV6MRE117qOaRBoJB5m6ihGjlD3Uk0496yFD5';

// Función para hacer una petición HTTP a la colección de razas
export function fetchBreeds() {
  return new Promise((resolve, reject) => {
    fetch('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(err => {
        showError(err);
        reject(err);
      });
  });
}

// Función para hacer una petición HTTP a la información del gato según su raza
export function fetchCatByBreed(breedId) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
      headers: {
        'x-api-key': API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const catData = data[0];
          const cat = {
            name:
              catData.breeds.length > 0 ? catData.breeds[0].name : 'Unknown',
            image: catData.url,
            description:
              catData.breeds.length > 0
                ? catData.breeds[0].description
                : 'No description available',
            temperament:
              catData.breeds.length > 0
                ? catData.breeds[0].temperament
                : 'Unknown',
          };
          resolve(cat);
        } else {
          reject(new Error('No cat found'));
        }
      })
      .catch(err => {
        showError(err);
        reject(err);
      });
  });
}

// Función para mostrar el mensaje de error
function showError(err) {
  Notiflix.Report.failure('Error', err.message, 'OK');
}
