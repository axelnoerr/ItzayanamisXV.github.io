
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




