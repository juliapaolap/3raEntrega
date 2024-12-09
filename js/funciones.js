const app = Vue.createApp({
    data() {
        return {
            productos: [],
            busqueda: '',
            categoriaSeleccionada: 'todos',
        };
    },

    computed: {
        productosFiltrados() {
            let productosFiltrados = this.productos;

            if (this.categoriaSeleccionada !== 'todos') {
                productosFiltrados = productosFiltrados.filter(cafe => {
                    if (this.categoriaSeleccionada === 'calientes' && cafe.id <= 12) return true;
                    if (this.categoriaSeleccionada === 'frias' && cafe.id >= 13) return true;
                });
            }

            if (this.busqueda) {
                productosFiltrados = productosFiltrados.filter(cafe => cafe.title.toLowerCase().includes(this.busqueda.toLowerCase()));
            }

            return productosFiltrados;
        },

        porcentajeProductos() {
            return this.productosFiltrados.length > 0 
                ? Math.round((this.productosFiltrados.length / this.productos.length) * 100) : 0;
        }
    },

    methods: {
        cargarCafeCaliente() {
            axios.get("https://api.sampleapis.com/coffee/hot").then(respuesta => {
                this.productos = respuesta.data.map(producto => ({
                    ...producto,
                    precio: Math.floor(Math.random() * 41) + 40 // Precios entre $40 y $80
                }));
            });
        },

        filtrarProductos() {
            // Este método ya está cubierto por los computed
        }
    },

    created() {
        this.cargarCafeCaliente();
    }
});

app.mount("#contenedor");
