const producto = document.getElementById('producto');
const productoImagen = producto.querySelector('.producto__imagen');
const thumbs = producto.querySelector('.producto__thumbs');

// Color
const propiedadColor = producto.querySelector('#propiedad-color');

// Cantidad
const btnDisminuirCantidad = producto.querySelector('#disminuir-cantidad')
const btnIncrementarCantidad = producto.querySelector('#incrementar-cantidad')
const inputCantidad = producto.querySelector('#cantidad');


// Funcionalidad de thumbnails
thumbs.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        const imagenSrc = e.target.src;
        
        // Obtenemos la posición del último '/'
        const lastIndex = imagenSrc.lastIndexOf('/');

        // Cortamos la cadena de texto para obtener solamente una parte
        const nombreImagen = (imagenSrc.substring(lastIndex + 1));

        // Cambiamos la ruta de la imagen del producto.
        productoImagen.src = `./img/tennis/${nombreImagen}`;
    }
});

// Funcionalidad de propiedad de colores
propiedadColor.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') {

        // Guardamos el 'value' y lo usamos para cambiar la ruta de la imagen
        const color = e.target.value;
        productoImagen.src = `./img/tennis/${color}.jpg`; 
    }
})


// Funcionalidad incrementar y disminuir cantidades
btnIncrementarCantidad.addEventListener('click', (e) => {
    inputCantidad.value = parseInt(inputCantidad.value) + 1;
})

btnDisminuirCantidad.addEventListener('click', (e) => {
    if (parseInt(inputCantidad.value) > 1) {
        inputCantidad.value = parseInt(inputCantidad.value) - 1;
    }
})