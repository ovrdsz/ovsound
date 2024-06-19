import { 
    onGetCanciones,
    deleteSong,
    obtenerCancion,
    saveSong,
    updateSong} from "./firebase.js";
import {resetFormCanciones, validateInputsCanciones } from './subirCancionValEdit.js';


const contenedorCanciones = document.getElementById('contenedor-canciones');
const songForm = document.getElementById('form');

let editStatus = false;
let id = '';
const hola = () =>{
//window.addEventListener('DOMContentLoaded', () => {
    onGetCanciones((querySnapshot) => {
        let html = "";
        querySnapshot.forEach((doc) => {
            const task = doc.data();
            html += `
            <li class="fila-tabla" id="fila-tabla">
                <div class="col col-1" data-label="PORTADA"></div>
                <div class="col col-2" data-label="TÍTULO">${task.titulo}</div>
                <div class="col col-3" data-label="AUTOR">${task.autor}</div>
                <div class="col col-4" data-label="FECHA">${task.fecha}</div>
                <div class="col col-5" data-label="GÉNERO">${task.genero}</div>
                <div class="col col-6" data-label="ÁLBUM">${task.album}</div>
                <div class="col col-7" data-label="OPCIONES">
                    <button class="btnEditar" data-id="${doc.id}" >Editar</button>
                    <button class="btnEliminar" data-id="${doc.id}">Eliminar</button>
                </div>
            </li>`;
        });
        console.log("aaaaaaaa")
        contenedorCanciones.innerHTML = html;

        const btnsEliminar = contenedorCanciones.querySelectorAll('.btnEliminar');
        btnsEliminar.forEach(btn => {
            btn.addEventListener('click', ({target: {dataset}}) => {
                const confirmacion = confirm('¿Estás seguro de eliminar esta canción?');
                if(confirmacion){
                    deleteSong(dataset.id);
                }
            });
        });

        const btnsEditar = contenedorCanciones.querySelectorAll('.btnEditar');
        btnsEditar.forEach((btn) => {
            btn.addEventListener('click', async (e) =>{
                const doc = await obtenerCancion(e.target.dataset.id);
                const song = doc.data();
                console.log(song);

                songForm['titulo'].value = song.titulo;
                songForm['autor'].value = song.autor;
                songForm['fecha'].value = song.fecha;
                songForm['genero'].value = song.genero;
                songForm['album'].value = song.album;

                editStatus = true;
                id = doc.id;
            });
        });
    });
//});
}

hola()
songForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateInputsCanciones()) {

        const titulo = songForm['titulo'].value.trim();
        const fecha = songForm['fecha'].value.trim();
        const genero = songForm['genero'].value.trim();
        const autor = songForm['autor'].value.trim();
        const album = songForm['album'].value.trim();

        if (!editStatus){
            saveSong(titulo.value, fecha.value, genero.value, autor.value, album.value);
            hola()
        } else {
            updateSong(id, {
                titulo: titulo,
                fecha: fecha,
                genero: genero,
                autor: autor,
                album: album
            });
            hola()

            editStatus = false;
        }

        resetFormCanciones();
        
    } else {
        console.error("diosmio =( ");
    }
});