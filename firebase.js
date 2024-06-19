// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import {
    collection,
    getFirestore,
    addDoc,
    getDocs,
    getDoc,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyCQL83Z34VA7dHP-fWFy9oluy6aWjFQuic",
    authDomain: "ovsound-c7735.firebaseapp.com",
    databaseURL: "https://ovsound-c7735-default-rtdb.firebaseio.com",
    projectId: "ovsound-c7735",
    storageBucket: "ovsound-c7735.appspot.com",
    messagingSenderId: "505925823222",
    appId: "1:505925823222:web:e75910dc613ad0c49a1ad7",
    measurementId: "G-HFF2H1Z4ND"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const obtenerUsuario = collection(db, "usuarios");
export const docsSnap = await getDocs(obtenerUsuario);

export const saveRegistro = (nombreusuario, email, contrasena, confcontrasena) => {
    addDoc(collection(db, "usuarios"), {nombreusuario, email, contrasena, confcontrasena});
}

export const obtenerCanciones = () => getDocs(collection(db, "canciones"));

export const onGetCanciones = (callback) =>
    onSnapshot(collection(db, "canciones"), callback);

export const deleteSong = (id) => deleteDoc(doc(db, "canciones", id));

export const obtenerCancion = (id) => getDoc(doc(db, "canciones", id));

export const updateSong = (id, updatedSong) => updateDoc(doc(db, "canciones", id), updatedSong);

export const saveSong = (titulo, fecha, genero, autor, album) => {
    addDoc(collection(db, "canciones"), {
        titulo, fecha, genero, autor, album});
}

