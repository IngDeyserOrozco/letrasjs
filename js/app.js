// Modulo app.js

// Importamos el modulo interfaz.js
import * as UI from './interfaz.js';
// Importamos la clase API
import { API } from './api.js';

// Funcion que permite poner y quitar un mensaje de error
function mensajeError(mensaje) {

    // Llenamos con Texto el Div de Mensajes
    UI.divMensajes.innerHTML = mensaje;

    // Agregamos la clase de error
    UI.divMensajes.classList.add('error');

    // Agreamos el setTimeout para que solo dure a la vista 3 segundos
    setTimeout(() => {

        // Vaciamos el Texto del Div de Mensajes
        UI.divMensajes.innerHTML = '';

        // Removemos la clase de error
        UI.divMensajes.classList.remove('error');

    }, 3000)
}


// Cargamos el EventListener para el formulario
UI.formBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener los datos escritos en los inputs del Formulario

    // Input del Artista
    const artista = document.querySelector('#artista').value;

    // Input de la Cancion
    const cancion = document.querySelector('#cancion').value;

    // Evaluamos que los input no vayan vacios
    if (artista === '' || cancion === '') {
        // El Usuario dejo los campos vacios o uno de los 2

        // Llamamos a la funcion mensajeError() para poder mostrar y quitar el error en la pagina
        mensajeError('Error... Todos los campos son OBLIGATORIOS!!');

    } else {
        // El usuario llena correctamente los campos, se procede a realizar la consulta a la API

        // Instaciamos la clase
        const api = new API(artista, cancion);

        // Llamamos al Método de la clase para consultar la API, el cual devuelve los datos ya formateados en JSON
        api.consultarAPI()
            .then(datos => {

                // Evaluamos que exista la cancion
                if (datos.response.lyrics) {
                    // Si existe cancion

                    // Guardamos la Letra en una const
                    const letra = datos.response.lyrics;
                    UI.divResultado.textContent = letra;
                } else {
                    // No existe cancion

                    // Llamamos la funcion para mostrar y quitar el error en la pantalla
                    mensajeError('Error... No existe la Cancion, Intente Nuevamente!!');

                    // Reseteamos el Formulario
                    UI.formBuscar.reset();
                    UI.divResultado.textContent = '';
                }
            })
    }
})