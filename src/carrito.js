import data from './data/baseDatos';

const botonesAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
const botonesCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]')
const ventanaCarrito = document.getElementById('carrito');
const btnAgregarCarrito = document.getElementById('agregar-al-carrito')
const producto = document.getElementById('producto');
let carrito = [];
const notificacion = document.getElementById('notificacion');
// Usamos una API para usar el formato de números en monedas
const formatearMoneda = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });


// Función que se encarga de abrir el carrito y comprobar los productos del usuario
const renderCarrito = () => {
    ventanaCarrito.classList.add('carrito--active');

    // Eliminamos todos los productos anteriores para construir el carrito desde cero
    const productosAnteriores = ventanaCarrito.querySelectorAll('.carrito__producto');
    productosAnteriores.forEach((prod) => prod.remove());

    let total = 0;

    // Comprobamos si hay productos
    if (carrito.length < 1) {
        // Ponemos la clase del carrito vacio
        ventanaCarrito.classList.add('carrito--vacio');
    } else {
        
        // Eliminamos la clase del carrito vacio
        ventanaCarrito.classList.remove('carrito--vacio');

        // Iteramos sobre cada producto del carrito y lo mostramos
        carrito.forEach((productoCarrito) => {

            // Recorremos el Array dentro de 'baseDatos' para comparar los ID con los productos del carrito
            data.productos.forEach((productoBaseDatos) => {
                if (productoBaseDatos.id == productoCarrito.id) {
                    // Creamos una nueva propiedad para 'productoCarrito' y le asignamos el valor del precio guardado en la base de datos.
                    productoCarrito.precio = productoBaseDatos.precio;

                    total += productoBaseDatos.precio * productoCarrito.cantidad;
                    console.log(total);
                }
            })


            // Establecemos la ruta de la imagen que vamos a querer mostrar
            let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;
            if (productoCarrito.color === 'rojo') {
                thumbSrc = './img/thumbs/rojo.jpg';
            } else if (productoCarrito.color === 'amarillo') {
                thumbSrc = './img/thumbs/amarillo.jpg';
            }

            // Creamos una plantilla con código HTML
            const plantillaProducto = `
        <div class="carrito__producto-info">
            <img src="${thumbSrc}" alt="" class="carrito__thumb" />
            <div>
                <p class="carrito__producto-nombre">
                    <span class="carrito__producto-cantidad">${productoCarrito.cantidad} x </span>${productoCarrito.nombre}
                </p>
                <p class="carrito__producto-propiedades">
                    Tamaño:<span>${productoCarrito.tamaño}</span> Color:<span>${productoCarrito.color}</span>
                </p>
            </div>
        </div>
        <div class="carrito__producto-contenedor-precio">
            <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                    />
                </svg>
            </button>
            <p class="carrito__producto-precio">${formatearMoneda.format(productoCarrito.precio * productoCarrito.cantidad)}</p>
        </div>
        `;

            // Crear el contenedor
            const itemCarrito = document.createElement('div');

            // Agregamos la clase de carrito__producto
            itemCarrito.classList.add('carrito__producto');

            // Insertamos la plantilla dentro del elemento DIV
            itemCarrito.innerHTML = plantillaProducto;

            // Agregamos el producto al carrito
            ventanaCarrito.querySelector('.carrito__body').appendChild(itemCarrito);
        });
    }

    // Agregamos la suma total de los productos a la ventana del carrito
    ventanaCarrito.querySelector('.carrito__total').innerText = formatearMoneda.format(total);
}

// Abrir carrito
botonesAbrirCarrito.forEach((boton) => {
    boton.addEventListener('click', (e) => {
        renderCarrito();
    });
});

// Cerrar carrito
botonesCerrarCarrito.forEach(boton => {
    boton.addEventListener('click', (e) => {
        ventanaCarrito.classList.remove('carrito--active');
    });
});

// Agregar productos al carrito
btnAgregarCarrito.addEventListener('click', (e) => {
    const id = producto.dataset.productoId;
    const nombre = producto.querySelector('.producto__nombre').textContent;
    const cantidad = parseInt(producto.querySelector('#cantidad').value);
    const color = producto.querySelector('#propiedad-color input:checked').value;
    const tamaño = producto.querySelector('#propiedad-tamaño input:checked').value;

    if (carrito.length > 0) {
        let productoEnCarrito = false;

        // Recorremos el carrito para comprobar si el producto que queremos añadir ya estaba añadido
        carrito.forEach((item) => {
            if (item.id === id && item.nombre === nombre && item.color === color && item.tamaño === tamaño) {
                item.cantidad += cantidad;
                productoEnCarrito = true;
            }
        });

        // Si después de la comprobación del carrito, el item no está en el carrito hacemos un push
        if (!productoEnCarrito) {
            carrito.push({
                id: id,
                nombre: nombre,
                cantidad: cantidad,
                color: color,
                tamaño: tamaño
            });
        }
    } else {
        
        // Este código solo se ejecuta cuando el carrito está vacío
        carrito.push({
            id: id,
            nombre: nombre,
            cantidad: cantidad,
            color: color,
            tamaño: tamaño
        });
    };

    // Establecemos la ruta de la imagen que vamos a querer mostrar
    let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;
    if (color === 'rojo') {
        thumbSrc = './img/thumbs/rojo.jpg';
    } else if (color === 'amarillo') {
        thumbSrc = './img/thumbs/amarillo.jpg';
    }

    notificacion.querySelector('img').src = thumbSrc;
    notificacion.classList.add('notificacion--active');
    
    setTimeout(() => notificacion.classList.remove('notificacion--active'), 3000);
});

// Botones eliminar productos del carrito
ventanaCarrito.addEventListener('click', (e) => {
    if (e.target.closest('button')?.dataset.accion === 'eliminar-item-carrito') {
        const producto = e.target.closest('.carrito__producto');
        const indexProducto = [...ventanaCarrito.querySelectorAll('.carrito__producto')].indexOf(producto);

        carrito = carrito.filter((item, index) => {
            if (index != indexProducto) {
                return item;
            }
        })

        renderCarrito();
    };
});

// Boton de comprar carrito
ventanaCarrito.querySelector('#carrito__btn-comprar').addEventListener('click', () => {
    console.log('Enviando petición de compra!');
    console.log(carrito);
});


