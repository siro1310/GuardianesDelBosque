/* ==========================================
   GUARDIANES DEL BOSQUE MÁGICO DELUXE
   APP.JS
========================================== */

/* ==========================================
   VARIABLES GLOBALES
========================================== */

const sonidoCorrecto =
document.getElementById("sonidoCorrecto");

const sonidoIncorrecto =
document.getElementById("sonidoIncorrecto");

const sonidoVictoria =
document.getElementById("sonidoVictoria");

const sonidoMoneda =
document.getElementById("sonidoMoneda");


let puntos = 0;
let monedas = 0;
let nivelActual = 1;

let insignias = [];

const pantallas = document.querySelectorAll(".pantalla");

const puntosTotales =
document.getElementById("puntosTotales");

const monedasTotales =
document.getElementById("monedasTotales");

const contadorInsignias =
document.getElementById("contadorInsignias");

const progresoActual =
document.getElementById("progresoActual");

/* ==========================================
   BOTONES PRINCIPALES
========================================== */

const btnComenzar =
document.getElementById("btnComenzar");

const btnNivel2 =
document.getElementById("btnNivel2");

const btnNivel3 =
document.getElementById("btnNivel3");

const btnNivel4 =
document.getElementById("btnNivel4");

const btnVolverInicio =
document.getElementById("btnVolverInicio");

/* ==========================================
   INICIO
========================================== */

btnComenzar.addEventListener(
"click",
() => {

    mostrarPantalla("nivel1");

    actualizarProgreso(25);

    iniciarNivel1();

}
);

/* ==========================================
   UTILIDADES
========================================== */

function mostrarPantalla(id){

    pantallas.forEach(
    pantalla => {

        pantalla.classList.remove("activa");

    });

    document
    .getElementById(id)
    .classList
    .add("activa");

}

function actualizarMarcadores(){

    puntosTotales.textContent =
    puntos;

    monedasTotales.textContent =
    monedas;

    contadorInsignias.textContent =
    insignias.length;

}

function actualizarProgreso(valor){

    progresoActual.style.width =
    valor + "%";

}

function agregarInsignia(nombre){

    if(
    !insignias.includes(nombre)
    ){

        insignias.push(nombre);

    }

    actualizarMarcadores();

}

function recompensaNivel(
    puntosGanados,
    monedasGanadas
){

    puntos += puntosGanados;

    monedas += monedasGanadas;

    sonidoMoneda.currentTime = 0;
    sonidoMoneda.play();

    actualizarMarcadores();

}

function mensajeCorrecto(){

    sonidoCorrecto.currentTime = 0;

    sonidoCorrecto.play();


}

function mensajeIncorrecto(){

    sonidoIncorrecto.currentTime = 0;

    sonidoIncorrecto.play();


}

/* ==========================================
   NIVEL 1
   RECICLAJE INTELIGENTE
========================================== */

function iniciarNivel1(){

    const residuos =
    document.querySelectorAll(
    ".residuo"
    );

    const contenedores =
    document.querySelectorAll(
    ".contenedor"
    );

    residuos.forEach(
    residuo => {

        residuo.addEventListener(
        "dragstart",
        dragStart
        );

    });

    contenedores.forEach(
    contenedor => {

        contenedor.addEventListener(
        "dragover",
        dragOver
        );

        contenedor.addEventListener(
        "drop",
        dropItem
        );

    });

}

function dragStart(e){

    e.dataTransfer.setData(
    "tipo",
    e.target.dataset.tipo
    );

}

function dragOver(e){

    e.preventDefault();

}

let aciertosNivel1 = 0;

function dropItem(e){

    e.preventDefault();

    const tipoResiduo =
    e.dataTransfer.getData(
    "tipo"
    );

    const tipoContenedor =
    e.target.dataset.tipo;

    if(
    tipoResiduo === tipoContenedor
    ){

        aciertosNivel1++;

        recompensaNivel(
        10,
        5
        );

        mensajeCorrecto();

        if(
        aciertosNivel1 >= 3
        ){

            agregarInsignia(
            "♻️ Reciclador Experto"
            );

            setTimeout(
            () => {

                mostrarPantalla(
                "recompensa1"
                );

            },
            1000
            );

        }

    }
    else{

        mensajeIncorrecto();

    }

}

/* ==========================================
   PASAR A NIVEL 2
========================================== */

btnNivel2.addEventListener(
"click",
() => {

    mostrarPantalla(
    "nivel2"
    );

    actualizarProgreso(
    50
    );

    iniciarNivel2();

}
);

/* ==========================================
   NIVEL 2
   SALVA EL BOSQUE
========================================== */

const accionesCorrectas = [

"🌳 Sembrar árboles",

"♻️ Reciclar residuos",

"💧 Ahorrar agua",

"🐦 Cuidar animales"

];

const accionesIncorrectas = [

"🔥 Quemar bosques",

"🗑️ Tirar basura",

"🚫 Contaminar ríos",

"✂️ Cortar árboles"

];

function iniciarNivel2(){

    const contenedor =
    document.getElementById(
    "accionesBosque"
    );

    contenedor.innerHTML = "";

    const acciones = [

    ...accionesCorrectas,

    ...accionesIncorrectas

    ];

    acciones
    .sort(
    () => Math.random() - 0.5
    )
    .forEach(
    accion => {

        const div =
        document.createElement(
        "div"
        );

        div.classList.add(
        "accion"
        );

        div.textContent =
        accion;

        div.addEventListener(
        "click",
        () => {

            div.classList.toggle(
            "seleccionada"
            );

        }
        );

        contenedor.appendChild(
        div
        );

    });

}

document
.getElementById(
"verificarNivel2"
)
.addEventListener(
"click",
verificarNivel2
);

function verificarNivel2(){

    const seleccionadas =
    document.querySelectorAll(
    ".accion.seleccionada"
    );

    let correctas = 0;

    seleccionadas.forEach(
    item => {

        if(
        accionesCorrectas.includes(
        item.textContent
        )
        ){

            correctas++;

        }

    });

    if(
    correctas >= 4
    ){

        recompensaNivel(
        30,
        15
        );

        agregarInsignia(
        "🌲 Protector del Bosque"
        );

        mensajeCorrecto();

        setTimeout(
        () => {

            mostrarPantalla(
            "recompensa2"
            );

        },
        1000
        );

    }
    else{

        mensajeIncorrecto();

    }

}

/* ==========================================
   PASAR A NIVEL 3
========================================== */

btnNivel3.addEventListener(
"click",
() => {

    actualizarProgreso(
    75
    );

    mostrarPantalla(
    "nivel3"
    );

    iniciarMemorama();

}
);

/* ==========================================
   AQUÍ CONTINUARÁ
   NIVEL 3 MEMORAMA
   NIVEL 4 CARRERA DEL AGUA
   CERTIFICADO FINAL
========================================== */

/* ==========================================
   NIVEL 3
   MEMORAMA AMBIENTAL
========================================== */

let cartasMemorama = [
    "🌳","🌳",
    "🐦","🐦",
    "💧","💧",
    "♻️","♻️",
    "🌺","🌺",
    "🐢","🐢"
];

let primeraCarta = null;
let segundaCarta = null;
let bloqueo = false;
let parejasEncontradas = 0;

let tiempo = 60;
let temporizador = null;

function iniciarMemorama(){

    parejasEncontradas = 0;

    primeraCarta = null;
    segundaCarta = null;

    cartasMemorama.sort(
        () => Math.random() - 0.5
    );

    const tablero =
    document.getElementById(
        "tableroMemorama"
    );

    tablero.innerHTML = "";

    cartasMemorama.forEach(simbolo => {

        const carta =
        document.createElement("div");

        carta.classList.add("carta");

        carta.dataset.valor =
        simbolo;

        carta.textContent = "?";

        carta.addEventListener(
            "click",
            voltearCarta
        );

        tablero.appendChild(carta);

    });

    iniciarCronometro();

}

function iniciarCronometro(){

    tiempo = 60;

    document.getElementById(
        "tiempoMemorama"
    ).textContent = tiempo;

    clearInterval(
        temporizador
    );

    temporizador =
    setInterval(() => {

        tiempo--;

        document.getElementById(
            "tiempoMemorama"
        ).textContent = tiempo;

        if(tiempo <= 0){

            clearInterval(
                temporizador
            );

            alert(
                "⏰ Se acabó el tiempo"
            );

            iniciarMemorama();

        }

    },1000);

}

function voltearCarta(){

    if(
        bloqueo ||
        this === primeraCarta
    ){
        return;
    }

    this.textContent =
    this.dataset.valor;

    this.classList.add(
        "revelada"
    );

    if(!primeraCarta){

        primeraCarta = this;

        return;

    }

    segundaCarta = this;

    bloqueo = true;

    verificarPareja();

}

function verificarPareja(){

    if(
        primeraCarta.dataset.valor ===
        segundaCarta.dataset.valor
    ){

        parejasEncontradas++;

        primeraCarta = null;
        segundaCarta = null;

        bloqueo = false;

        if(
            parejasEncontradas === 6
        ){

            clearInterval(
                temporizador
            );

            recompensaNivel(
                40,
                20
            );

            agregarInsignia(
                "🧠 Maestro de la Memoria"
            );

            setTimeout(() => {

                mostrarPantalla(
                    "recompensa3"
                );

            },1000);

        }

    }
    else{

        setTimeout(() => {

            primeraCarta.textContent =
            "?";

            segundaCarta.textContent =
            "?";

            primeraCarta.classList.remove(
                "revelada"
            );

            segundaCarta.classList.remove(
                "revelada"
            );

            primeraCarta = null;
            segundaCarta = null;

            bloqueo = false;

        },800);

    }

}

/* ==========================================
   PASAR A NIVEL 4
========================================== */

btnNivel4.addEventListener(
    "click",
    () => {

        mostrarPantalla(
            "nivel4"
        );

        actualizarProgreso(
            100
        );

        iniciarCarrera();

    }
);

/* ==========================================
   NIVEL 4
   CARRERA DEL AGUA
========================================== */

let posicion = 0;

let preguntaActual = 0;

const preguntasCarrera = [

{
pregunta:
"¿Qué debemos hacer para ahorrar agua?",

opciones:[
"Cerrar la llave",
"Dejarla abierta",
"Jugar con ella"
],

correcta:0
},

{
pregunta:
"¿Dónde debe ir la basura?",

opciones:[
"Caneca",
"Río",
"Calle"
],

correcta:0
},

{
pregunta:
"¿Qué debemos sembrar?",

opciones:[
"Árboles",
"Basura",
"Plástico"
],

correcta:0
},

{
pregunta:
"¿Qué debemos proteger?",

opciones:[
"Animales",
"Contaminación",
"Humo"
],

correcta:0
}

];

function iniciarCarrera(){

    posicion = 0;

    preguntaActual = 0;

    document.getElementById(
        "personaje"
    ).style.left = "0px";

    mostrarPreguntaCarrera();

}

function mostrarPreguntaCarrera(){

    const zona =
    document.getElementById(
        "preguntaCarrera"
    );

    zona.innerHTML = "";

    const p =
    preguntasCarrera[
        preguntaActual
    ];

    let html = `
        <h3>${p.pregunta}</h3>
    `;

    p.opciones.forEach(
        (op,index) => {

        html += `
        <button
        onclick="responderCarrera(${index})">
        ${op}
        </button>
        `;

    });

    zona.innerHTML = html;

}

function responderCarrera(respuesta){

    const p =
    preguntasCarrera[
        preguntaActual
    ];

    if(
        respuesta ===
        p.correcta
    ){

        posicion += 150;

        puntos += 15;

        monedas += 10;

        actualizarMarcadores();

        document.getElementById(
            "personaje"
        ).style.left =
        posicion + "px";

    }

    preguntaActual++;

    if(
        preguntaActual >=
        preguntasCarrera.length
    ){

        agregarInsignia(
            "💧 Guardián del Agua"
        );

        recompensaNivel(
            50,
            30
        );

        setTimeout(
            finalizarJuego,
            1500
        );

    }
    else{

        mostrarPreguntaCarrera();

    }

}

/* ==========================================
   FINALIZAR JUEGO
========================================== */

function finalizarJuego(){

    sonidoVictoria.play();

    mostrarPantalla(
        "pantallaFinal"
    );

    generarPanelInsignias();
    sonidoVictoria.play();

}

/* ==========================================
   PANEL DE INSIGNIAS
========================================== */

function generarPanelInsignias(){

    const panel =
    document.getElementById(
        "panelInsignias"
    );

    panel.innerHTML = "";

    insignias.forEach(
        insignia => {

        const div =
        document.createElement(
            "div"
        );

        div.classList.add(
            "insignia"
        );

        div.textContent =
        insignia;

        panel.appendChild(
            div
        );

    });

    const resumen =
    document.createElement(
        "div"
    );

    resumen.innerHTML = `
        <h2>
        ⭐ Puntaje Final:
        ${puntos}
        </h2>

        <h2>
        🪙 Monedas:
        ${monedas}
        </h2>
    `;

    panel.appendChild(
        resumen
    );

}

/* ==========================================
   CERTIFICADO
========================================== */

document
.getElementById(
    "btnDescargarCertificado"
)
.addEventListener(
    "click",
    () => {

        window.print();

    }
);

/* ==========================================
   VOLVER AL INICIO
========================================== */

btnVolverInicio.addEventListener(
    "click",
    reiniciarJuego
);

function reiniciarJuego(){

    puntos = 0;

    monedas = 0;

    nivelActual = 1;

    insignias = [];

    actualizarMarcadores();

    actualizarProgreso(0);

    mostrarPantalla(
        "pantallaInicio"
    );

}

function guardarProgreso(){

    const datos = {

        puntos,
        monedas,
        insignias

    };

    localStorage.setItem(
        "guardianesBosque",
        JSON.stringify(datos)
    );

}

function cargarProgreso(){

    const datos =
    localStorage.getItem(
        "guardianesBosque"
    );

    if(!datos) return;

    const progreso =
    JSON.parse(datos);

    puntos =
    progreso.puntos || 0;

    monedas =
    progreso.monedas || 0;

    insignias =
    progreso.insignias || [];

    actualizarMarcadores();

}

window.onload = () => {

    puntos = 0;
    monedas = 0;
    insignias = [];

    actualizarMarcadores();

};