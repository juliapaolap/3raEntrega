const app = Vue.createApp({
    data() {
        return {
            carrito: [] // Array de productos en el carrito
        };
    },
    methods: {
        cargarCarrito() {
            const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
            this.carrito = carritoGuardado.map(producto => ({
                ...producto,
                cantidad: producto.cantidad || 1 // Asegurar que siempre haya una cantidad inicial
            }));
        },
        cambiarCantidad(indice, cambio) {
            const nuevaCantidad = this.carrito[indice].cantidad + cambio;
            if (nuevaCantidad >= 1 && nuevaCantidad <= 10) {
                this.carrito[indice].cantidad = nuevaCantidad;
                localStorage.setItem("carrito", JSON.stringify(this.carrito));
            }
        },
        eliminarDelCarrito(indice) {
            this.carrito.splice(indice, 1);
            localStorage.setItem("carrito", JSON.stringify(this.carrito));
        },
        vaciarCarrito() {
            this.carrito = [];
            localStorage.removeItem("carrito");
            alert(" 🗑️ Carrito vacío");
        },
        comprarCarrito() {
            alert(" ❌ Funcionalidad aún no disponible.");
        },
        calcularTotal() {
            return this.carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0).toFixed(2);
        },
        calcularIva() {
            return (this.calcularTotal() * 0.16).toFixed(2);
        }
    },
    created() {
        this.cargarCarrito();
    }
});

app.mount("#contenedor");
