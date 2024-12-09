const app = Vue.createApp({
    data() {
        return {
            producto: {} // Objeto del producto seleccionado
        };
    },
    methods: {
        cargarProducto() {
            const urlParams = new URLSearchParams(window.location.search);
            const productoId = urlParams.get("id");

            if (productoId) {
                axios.get(`https://api.sampleapis.com/coffee/hot/${productoId}`)
                    .then(response => {
                        const productoData = response.data;
                        productoData.precio = Math.floor(Math.random() * 41) + 40; // Precio aleatorio entre $40 y $80
                        this.producto = productoData;
                    })
                    .catch(error => {
                        console.error("Error al cargar el producto:", error);
                    });
            }
        },
        agregarAlCarrito() {
            // Obtener el carrito actual del localStorage
            const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
            carritoGuardado.push(this.producto);
            localStorage.setItem("carrito", JSON.stringify(carritoGuardado));
            alert(" ✅ Producto añadido al carrito");
        },
        comprarCafe() {
            alert(" ❌ Funcionalidad aún no disponible.");
        },
    },
    created() {
        this.cargarProducto();
    }
});

app.mount("#app");