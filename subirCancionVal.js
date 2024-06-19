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

export const validateInputsCanciones = () => {
    const titulo = document.getElementById('titulo');
    const fecha = document.getElementById('fecha');
    const genero = document.getElementById('genero');
    const autor = document.getElementById('autor');
    const album = document.getElementById('album');
    const imagen = document.getElementById('imagen');

    const tituloValue = titulo.value.trim();
    const fechaValue = fecha.value.trim();
    const generoValue = genero.value.trim();
    const autorValue = autor.value.trim();
    const albumValue = album.value.trim();
    const imagenFile = imagen.files[0];

    let isValid = true;

    if (tituloValue === '') {
        defError(titulo, 'El campo de título no puede estar vacío');
        isValid = false;
    } else {
        defSuccess(titulo);
    }

    if (fechaValue === '') {
        defError(fecha, 'El campo de fecha no puede estar vacío');
        isValid = false;
    } else {
        const fechaIngresada = new Date(fechaValue);
        const fechaActual = new Date();

        if (fechaIngresada > fechaActual) {
            defError(fecha, 'La fecha no puede ser mayor que la fecha actual');
            isValid = false;
        } else {
            defSuccess(fecha);
        }
    }
    
    if (generoValue === '') {
        defError(genero, 'El campo de género no puede estar vacío');
        isValid = false;
    } else {
        defSuccess(genero);
    }

    if (autorValue === '') {
        defError(autor, 'El campo de autor no puede estar vacío');
        isValid = false;
    } else {
        defSuccess(autor);
    }

    if (albumValue === '') {
        defError(album, 'El campo de álbum no puede estar vacío');
        isValid = false;
    } else {
        defSuccess(album);
    }

    if (!imagenFile) {
        defError(imagen, 'Debes seleccionar una imagen');
        isValid = false;
    } else {
        const ext = ['png'];
        const fext = imagenFile.name.split('.').pop().toLowerCase();

        if (!ext.includes(fext)) {
            defError(imagen, 'El archivo debe ser de tipo .png');
            isValid = false;
        } else {
            defSuccess(imagen);
        }
    }

    return isValid;
}

export const resetFormCanciones = () => {
    const titulo = document.getElementById('titulo');
    const fecha = document.getElementById('fecha');
    const genero = document.getElementById('genero');
    const autor = document.getElementById('autor');
    const album = document.getElementById('album');
    const imagen = document.getElementById('imagen');

    titulo.value = '';
    fecha.value = '';
    genero.value = '';
    autor.value = '';
    album.value = '';
    imagen.value = '';

    const inputControls = document.querySelectorAll('.input-control');
    inputControls.forEach(control => {
        control.classList.remove('error', 'success');
        const errorDisplay = control.querySelector('.error');
        if (errorDisplay) {
            errorDisplay.innerText = '';
        }
    });
}


