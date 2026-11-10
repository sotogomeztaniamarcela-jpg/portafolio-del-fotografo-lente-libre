/* ======================================
   LENTELIBRE - FUNCIONES DEL PORTAFOLIO
====================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ================================
    // CAMBIO DE TEMA CLARO Y OSCURO
    // ================================
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("tema");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("tema", "dark");
            themeToggle.textContent = "☀️";
        } else {
            localStorage.setItem("tema", "light");
            themeToggle.textContent = "🌙";
        }
    });


    // ================================
    // FILTROS DE LA GALERÍA
    // ================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            const categoria = button.getAttribute("data-filter");

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });
            button.classList.add("active");

            galleryItems.forEach(function (item) {
                const categoriaImagen = item.getAttribute("data-category");

                if (categoria === "todos" || categoriaImagen === categoria) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });


    // ================================
    // LIGHTBOX
    // ================================
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");
    const prevImage = document.getElementById("prevImage");
    const nextImage = document.getElementById("nextImage");

    let currentIndex = 0;

    function getVisibleImages() {
        return Array.from(galleryItems).filter(function (item) {
            return item.style.display !== "none";
        });
    }

    function closeBox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    function openLightbox(index) {
        currentIndex = index;
        const images = getVisibleImages();
        lightboxImage.src = images[currentIndex].querySelector("img").src;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function showImage(direction) {
        const images = getVisibleImages();

        currentIndex += direction;

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }

        lightboxImage.src = images[currentIndex].querySelector("img").src;
    }

    galleryItems.forEach(function (item) {
        item.addEventListener("click", function () {
            const images = getVisibleImages();
            openLightbox(images.indexOf(item));
        });
    });

    closeLightbox.addEventListener("click", closeBox);
    nextImage.addEventListener("click", function () { showImage(1); });
    prevImage.addEventListener("click", function () { showImage(-1); });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeBox();
        }

        if (lightbox.classList.contains("active")) {
            if (event.key === "ArrowRight") {
                showImage(1);
            }
            if (event.key === "ArrowLeft") {
                showImage(-1);
            }
        }
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeBox();
        }
    });


    // ================================
    // MENÚ MÓVIL
    // ================================
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    menuToggle.addEventListener("click", function () {
        navbar.classList.toggle("active");
        menuToggle.textContent =
            navbar.classList.contains("active") ? "✕" : "☰";
    });

    document.querySelectorAll(".navbar a").forEach(function (link) {
        link.addEventListener("click", function () {
            navbar.classList.remove("active");
            menuToggle.textContent = "☰";
        });
    });


    // ================================
    // FORMULARIO DE CONTACTO
    // ================================
    const whatsappNumber = "573205359482";
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const servicio = document.getElementById("servicio").value;
        const fecha = document.getElementById("fecha").value;
        const mensaje = document.getElementById("mensaje").value;

        const texto =
            "Hola, quiero solicitar una sesión fotográfica.\n\n" +
            "Nombre: " + nombre + "\n" +
            "Correo: " + correo + "\n" +
            "Servicio: " + servicio + "\n" +
            "Fecha: " + fecha + "\n" +
            "Detalles: " + mensaje;

        const enlace =
            "https://wa.me/" + whatsappNumber +
            "?text=" + encodeURIComponent(texto);

        window.open(enlace, "_blank");
    });

});