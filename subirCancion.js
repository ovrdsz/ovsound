import { saveSong } from './firebase.js';
import {resetFormCanciones, validateInputsCanciones } from './subirCancionValEdit.js';

const songForm = document.getElementById('form');

songForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateInputsCanciones()) {

        const titulo = songForm['titulo'].value.trim();
        const fecha = songForm['fecha'].value.trim();
        const genero = songForm['genero'].value.trim();
        const autor = songForm['autor'].value.trim();
        const album = songForm['album'].value.trim();


        saveSong(titulo, fecha, genero, autor, album);
        resetFormCanciones();
        alert("Registro guardado exitosamente")
        
    } else {
        console.error("diosmio =( ");
    }
});

