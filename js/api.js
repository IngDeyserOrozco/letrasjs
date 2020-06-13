// Modulo api.js

// Creamos la clase API
export class API {

    // Creamos el Constructor con 2 parametros: Artista y Cancion
    constructor(artista, cancion) {
        this.artista = artista;
        this.cancion = cancion;
    }

    // Creamos la consulta a la API
    async consultarAPI() {

        // Creamos la constante para la URL
        const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;

        // Guardamos el resultado de la peticion a la API
        const resultado = await fetch(url);

        // Guardamos el resultado en formato JSON
        const response = await resultado.json();

        return {
            response
        }
    }

}