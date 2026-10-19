
/* ========================================
   ESTRELLAS MÁGICAS EN LA PORTADA
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const cielo = document.getElementById("cielo-magico");

    if (!cielo) return;

    // Más estrellas en computadora, menos en celular
    const cantidad = window.innerWidth < 600 ? 35 : 65;

    for (let i = 0; i < cantidad; i++) {
        const estrella = document.createElement("span");
        estrella.className = "estrella";

        // Tamaño, velocidad y tiempo de aparición aleatorios
        const tamano = Math.random() * 2.8 + 1;
        const duracion = (Math.random() * 3 + 1.5).toFixed(2);
        const retraso = (Math.random() * 4).toFixed(2);

        // Posición aleatoria por toda la portada
        estrella.style.left = `${Math.random() * 100}%`;
        estrella.style.top = `${Math.random() * 100}%`;

        estrella.style.width = `${tamano}px`;
        estrella.style.height = `${tamano}px`;

        estrella.style.setProperty("--duracion", `${duracion}s`);
        estrella.style.setProperty("--retraso", `${retraso}s`);

        cielo.appendChild(estrella);
    }
});

