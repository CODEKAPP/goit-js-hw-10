import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

// Seleccionar elementos del DOM
const breedSelect = document.querySelector('#breedSelect');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Cargar razas al cargar la página
window.addEventListener('DOMContentLoaded', async () => {
  try {
    showLoader(); // Mostrar el cargador

    // Agregar la opción de placeholder seleccionada
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.text = 'Selecciona una raza';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    breedSelect.appendChild(placeholderOption);

    const breeds = await fetchBreeds(); // Obtener la lista de razas desde la API
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });
    new SlimSelect({
      select: '#single',
    }); // Inicializar SlimSelect para el elemento select
    hideLoader(); // Ocultar el cargador
  } catch (err) {
    showError(err); // Mostrar mensaje de error
    console.error(err);
  }
});

// Mostrar información del gato al seleccionar una raza
breedSelect.addEventListener('change', async event => {
  try {
    showLoader(); // Mostrar el cargador
    const breedId = event.target.value;
    const cat = await fetchCatByBreed(breedId); // Obtener información del gato desde la API
    displayCatInfo(cat); // Mostrar la información del gato en la interfaz
    hideLoader(); // Ocultar el cargador
  } catch (err) {
    showError(err); // Mostrar mensaje de error
    console.error(err);
  }
});

// Función para mostrar el cargador
function showLoader() {
  loader.style.display = 'flex';

}

// Función para ocultar el cargador
function hideLoader() {
  loader.style.display = 'none';
  // Notiflix.Notify.success(``);
}

// Función para mostrar el mensaje de error
function showError(err) {
  error.style.display = 'block'; // Mostrar el elemento de error
  loader.style.display = 'none'; // Ocultar el cargador
  Notiflix.Report.failure('Error', err.message, 'OK');
}

// Función para mostrar la información del gato
function displayCatInfo(cat) {
  catInfo.innerHTML = `
  <img src="${cat.image}" alt="Cat Image" style="max-width: 300px; height: auto; border-radius: 20px;
  cursor: pointer;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s, background-color 0.3s, color 0.3s, cursor 0.3s;" />
  <div  class="description"   style="margin-left: 10px; ">
  <h3>${cat.name}</h3>
  <p><strong>Description:</strong> ${cat.description}</p>
    <p><strong>Temperament:</strong> ${cat.temperament}</p>
    </div>
  `;
}
