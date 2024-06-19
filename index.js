import { saveRegistro, obtenerUsuario, db, docsSnap} from "./firebase.js";
import { resetFormRegistro, validateInputsRegistro, validateInputsLogin, resetFormLogin } from "./indexVal.js";

const registroForm = document.getElementById('form');
const loginForm = document.getElementById('login');

registroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateInputsRegistro()) {

        const nombreusuario = registroForm['nombreusuario'].value.trim();
        const email = registroForm['email'].value.trim();
        const contrasena = registroForm['contrasena'].value.trim();
        const confcontrasena = registroForm['confcontrasena'].value.trim();

        saveRegistro(nombreusuario, email, contrasena, confcontrasena);

        alert("Usuario registrado con éxito");

        resetFormRegistro();
        
    } else {
        console.error("diosmio :(");
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm['emaillogin'].value.trim();
    const contrasena = loginForm['contrasenalogin'].value.trim();

    const emails = [];
    const contrasenas = [];

    docsSnap.forEach((doc) => {
        const emailDoc = doc.data().email;
        const contrasenaDoc = doc.data().contrasena;
        emails.push(emailDoc);
        contrasenas.push(contrasenaDoc);
    });

    let usuarioEncontrado = false;
    for (let i = 0; i < emails.length; i++) {
        if (emails[i] === email && contrasenas[i] === contrasena) {
            usuarioEncontrado = true;
            break;
        }
    }

    if (usuarioEncontrado) {
        alert("Usuario logueado con éxito");
        resetFormLogin();
    } else {
        alert("Usuario o contraseña incorrectos");
        resetFormLogin();
    }
});

