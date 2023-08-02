export default class Tabs {
    constructor(idElemento) {
        // Creamos unas variables (propiedades) para usar el DOM
        this.tabs = document.getElementById(idElemento);
        this.nav = this.tabs.querySelector('.tabs');

        this.nav.addEventListener('click', (e) => {
            // Crea un Array de las clases que tienen los elementos
            // Luego comprueba si la clase 'tabs__button' está dentro de ese Array
            if ([...e.target.classList].includes('tabs__button')) {
                // Obtenemos el elemento que queremos mostrar
                const tab = e.target.dataset.tab;
                
                // Quitamos la clase active de algunas otras tabs que la tengan
                if (this.tabs.querySelector('.tab--active')) {
                    this.tabs.querySelector('.tab--active').classList.remove('tab--active');
                }
                
                // Quitamos la clase active de algunos otros botones que la tengan
                if (this.tabs.querySelector('.tabs__button--active')) {
                    this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
                }

                // Agregamos la clase active al tab
                this.tabs.querySelector(`#${tab}`).classList.add('tab--active');

                // Agregamos la clase active al botón
                e.target.classList.add('tabs__button--active');

            }
        })
    }
}
