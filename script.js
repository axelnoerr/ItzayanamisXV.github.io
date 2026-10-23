
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

/* ========================================
   CUENTA REGRESIVA DE LOS XV AÑOS
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const fechaEvento = new Date("2026-12-26T18:00:00-06:00").getTime();

    const dias = document.getElementById("dias");
    const horas = document.getElementById("horas");
    const minutos = document.getElementById("minutos");
    const segundos = document.getElementById("segundos");

    if (!dias || !horas || !minutos || !segundos) return;

    function actualizarContador() {
        const ahora = Date.now();
        const diferencia = fechaEvento - ahora;

        if (diferencia <= 0) {
            dias.textContent = "00";
            horas.textContent = "00";
            minutos.textContent = "00";
            segundos.textContent = "00";
            return;
        }

        dias.textContent = Math.floor(diferencia / 86400000)
            .toString().padStart(2, "0");

        horas.textContent = Math.floor((diferencia % 86400000) / 3600000)
            .toString().padStart(2, "0");

        minutos.textContent = Math.floor((diferencia % 3600000) / 60000)
            .toString().padStart(2, "0");

        segundos.textContent = Math.floor((diferencia % 60000) / 1000)
            .toString().padStart(2, "0");
    }

    actualizarContador();
    setInterval(actualizarContador, 1000);
});

/* ========================================
   FIREBASE - LIBRO DE DEDICATORIAS
======================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCH9R8fZfevLD9bTgNdv1A9bw3n85UeeZM",
    authDomain: "xv-itzayana-81670.firebaseapp.com",
    projectId: "xv-itzayana-81670",
    storageBucket: "xv-itzayana-81670.firebasestorage.app",
    messagingSenderId: "77123548697",
    appId: "1:77123548697:web:49c704c3c8ca743f8c9c88",
    measurementId: "G-R8HH2DN8E8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ========================================
   ENVÍO Y LECTURA DE DEDICATORIAS
======================================== */

import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("form-dedicatoria");
    const campoNombre = document.getElementById("nombre-dedicatoria");
    const campoMensaje = document.getElementById("mensaje-dedicatoria");
    const estado = document.getElementById("estado-dedicatoria");
    const lista = document.getElementById("lista-dedicatorias");

    if (!formulario || !campoNombre || !campoMensaje || !estado || !lista) return;

    const dedicatoriasRef = collection(db, "dedicatorias");

    async function mostrarDedicatorias() {
        try {
            const consulta = query(dedicatoriasRef, orderBy("fecha", "desc"));
            const resultados = await getDocs(consulta);

            lista.replaceChildren();

            const titulo = document.createElement("h3");
            titulo.textContent = "Palabras llenas de cariño";
            lista.appendChild(titulo);

            resultados.forEach((documento) => {
                const datos = documento.data();

                const tarjeta = document.createElement("article");
                tarjeta.className = "tarjeta-dedicatoria";

                const nombre = document.createElement("h4");
                nombre.textContent = datos.nombre;

                const mensaje = document.createElement("p");
                mensaje.textContent = datos.mensaje;

                tarjeta.append(nombre, mensaje);
                lista.appendChild(tarjeta);
            });

            if (resultados.empty) {
                const texto = document.createElement("p");
                texto.textContent = "Sé la primera persona en dejarle unas palabras bonitas a Itzayana.";
                lista.appendChild(texto);
            }
        } catch (error) {
            console.error("Error al cargar dedicatorias:", error);
            estado.textContent = "No pudimos cargar las dedicatorias por ahora.";
        }
    }

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const nombre = campoNombre.value.trim();
        const mensaje = campoMensaje.value.trim();

        if (nombre.length < 2 || nombre.length > 50) {
            estado.textContent = "Tu nombre debe tener entre 2 y 50 caracteres.";
            return;
        }

        if (mensaje.length < 2 || mensaje.length > 500) {
            estado.textContent = "Tu mensaje debe tener entre 2 y 500 caracteres.";
            return;
        }

        const boton = formulario.querySelector('button[type="submit"]');
        boton.disabled = true;
        estado.textContent = "Guardando tu dedicatoria... 💙";

        try {
            await addDoc(dedicatoriasRef, {
                nombre,
                mensaje,
                fecha: serverTimestamp()
            });

            formulario.reset();
            estado.textContent = "¡Tu dedicatoria quedó guardada! ✨";
            await mostrarDedicatorias();
        } catch (error) {
            console.error("Error al guardar dedicatoria:", error);
            estado.textContent = "No se pudo guardar. Inténtalo de nuevo en un momento.";
        } finally {
            boton.disabled = false;
        }
    });

    mostrarDedicatorias();
});





