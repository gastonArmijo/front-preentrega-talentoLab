import { agregarAlCarrito } from "./funcionesCarrito.js";

export const carousel = (carouselSelector, prevSelector, nextSelector, step = 220, visible = 4) => {
    const carousel = document.querySelector(carouselSelector);
    const prev = document.querySelector(prevSelector);
    const next = document.querySelector(nextSelector);

    if (!carousel || !prev || !next) return;

    // ancho de cada tarjeta (según tu CSS)
    const cardWidth = step; 
    const tarjetas = Array.from(carousel.querySelectorAll(".card"));
    const total = tarjetas.length;
    if (total === 0) return;

    let index = 0;
    let transitioning = false;

    const moverCarousel = (instant = false) => {
        carousel.style.transition = instant ? "none" : "transform 0.4s ease";
        carousel.style.transform = `translateX(-${index * cardWidth}px)`;
    };

    const avanzar = () => {
        if (transitioning) return;
        transitioning = true;

        index++;
        if (index > total - visible) index = 0; // reinicia al inicio

        moverCarousel();

        setTimeout(() => (transitioning = false), 400);
    };

    const retroceder = () => {
        if (transitioning) return;
        transitioning = true;

        index--;
        if (index < 0) index = total - visible; // vuelve al final

        moverCarousel();

        setTimeout(() => (transitioning = false), 400);
    };

    next.addEventListener("click", avanzar);
    prev.addEventListener("click", retroceder);

    // Desplazamiento con scroll del mouse
    const viewport = carousel.parentElement;
    viewport.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (e.deltaY > 0 || e.deltaX > 0) avanzar();
        else retroceder();
    }, { passive: false });
};

    




export const renderProductos = (productos, contenedorSelector) => {
    const contenedor = document.querySelector(contenedorSelector);
    if (!contenedor) return;

    productos.forEach((p) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card");

        const img = document.createElement("img");
        img.src = `./${p.img}`;
        img.alt = p.nombre;

        const titulo = document.createElement("p");
        titulo.textContent = p.nombre;

        const precio = document.createElement("h3");
        precio.textContent = `$${p.precio}`;

        const boton = document.createElement("button");
        boton.classList.add("btn-carrito");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
            agregarAlCarrito(p);
        })

        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);
        contenedor.appendChild(tarjeta);
    });
};
