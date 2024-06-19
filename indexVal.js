const defError = (elemento, mensaje) => {
    const inputControl = elemento.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    if (inputControl && errorDisplay) {
        errorDisplay.innerText = mensaje;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }
}

const defSuccess = (elemento) => {
    const inputControl = elemento.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    if (inputControl && errorDisplay) {
        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validateInputsRegistro = () => {
    const nombreusuario = document.getElementById('nombreusuario');
    const email = document.getElementById('email');
    const contrasena = document.getElementById('contrasena');
    const confcontrasena = document.getElementById('confcontrasena');

    const nombreusuarioValue = nombreusuario.value.trim();
    const emailValue = email.value.trim();
    const contrasenaValue = contrasena.value.trim();
    const confcontrasenaValue = confcontrasena.value.trim();

    let isValid = true;

    if (nombreusuarioValue === '') {
        defError(nombreusuario, 'El campo de nombre de usuario no puede estar vacío');
        isValid = false;
    } else {
        defSuccess(nombreusuario);
    }

    if (emailValue === '') {
        defError(email, 'El campo de email no puede estar vacío');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        defError(email, 'El email ingresado no es válido');
        isValid = false;
    } else {
        defSuccess(email);
    }

    if (contrasenaValue === '') {
        defError(contrasena, 'El campo de contraseña no puede estar vacío');
        isValid = false;
    } else if (contrasenaValue.length < 6) {
        defError(contrasena, 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    } else {
        defSuccess(contrasena);
    }

    if (confcontrasenaValue === '') {
        defError(confcontrasena, 'El campo de confirmar contraseña no puede estar vacío');
        isValid = false;
    } else if (contrasenaValue !== confcontrasenaValue) {
        defError(confcontrasena, 'Las contraseñas no coinciden');
        isValid = false;
    } else {
        defSuccess(confcontrasena);
    }

    return isValid;
}

export const resetFormRegistro = () => {
    const nombreusuario = document.getElementById('nombreusuario');
    const email = document.getElementById('email');
    const contrasena = document.getElementById('contrasena');
    const confcontrasena = document.getElementById('confcontrasena');

    nombreusuario.value = '';
    email.value = '';
    contrasena.value = '';
    confcontrasena.value = '';

    const inputs = document.querySelectorAll('.input-control');

    inputs.forEach(input => {
        input.classList.remove('success');
        input.classList.remove('error');
    });
}

export const validateInputsLogin = () => {
    const email = document.getElementById('emaillogin');
    const contrasena = document.getElementById('contrasenalogin');

    const emailValue = email.value.trim();
    const contrasenaValue = contrasena.value.trim();

    let isValid = true;

    if (emailValue === '') {
        defError(email, 'El campo de email no puede estar vacío');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        defError(email, 'El email ingresado no es válido');
        isValid = false;
    } else {
        defSuccess(email);
    }

    if (contrasenaValue === '') {
        defError(contrasena, 'El campo de contraseña no puede estar vacío');
        isValid = false;
    } else if (contrasenaValue.length < 6) {
        defError(contrasena, 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    } else {
        defSuccess(contrasena);
    }

    return isValid;
}

export const resetFormLogin = () => {
    const email = document.getElementById('emaillogin');
    const contrasena = document.getElementById('contrasenalogin');

    email.value = '';
    contrasena.value = '';

    const inputs = document.querySelectorAll('.input-control');

    inputs.forEach(input => {
        input.classList.remove('success');
        input.classList.remove('error');
    });
}
