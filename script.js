let indiceTexto = 0;
let escribiendo = false;
let intervalo;
let ayudaUsos = 0;
let nombreUsuario = "";
let estadoActual = "intro";

let musicaAmbiente = new Audio("assets/Ambiente.mp3");
musicaAmbiente.loop = true;
musicaAmbiente.volume = 0.5;
musicaAmbiente.play();

let musicaSilenciada = false;

function toggleMusica() {
  const boton = document.getElementById("botonMute");
  const icono = document.getElementById("iconoSonido");

  if (musicaSilenciada) {
    musicaAmbiente.play();
    musicaSilenciada = false;
    boton.classList.remove("silenciado");
    icono.src = "assets/Sonido.png"; // ✅ Imagen de sonido activo
  } else {
    musicaAmbiente.pause();
    musicaSilenciada = true;
    boton.classList.add("silenciado");
    icono.src = "assets/SonidoMute.png"; // ✅ Imagen de sonido apagado
  }
}

const escenario = document.getElementById("escenario");

const problematicas = [
  {
    pregunta: "¿Debo asumir las consecuencias de una decisión que tomé, aunque haya sido impulsiva?",
    opciones: [
      "A) Sí. Equivocarse también es parte de decidir.",
      "B) No. Si no pensé bien, no puedo cargar con todo el peso."
    ],
    ayuda: (nombre) => `${nombre}, lo impulsivo no siempre es erróneo… pero sigue siendo tuyo. Si no asumes lo que hiciste, ¿quién lo hará por ti? A veces, el primer paso no es reparar… es aceptar que fuiste tú quien lo dio.`
  },
  {
    pregunta: "¿Debo seguir mi intuición si todos los que me rodean opinan lo contrario?",
    opciones: [
      "A) Sí. La convicción personal debe resistir la presión social.",
      "B) No. Si todos lo ven distinto, quizá yo soy quien está equivocado."
    ],
    ayuda: (nombre) => `Tu intuición no necesita aprobación, ${nombre}. Si cada voz externa te hace dudar, ¿cuánto confías en la tuya? A veces, lo que más ruido hace… es lo que menos te conoce.`
  },
  {
    pregunta: "¿Debo tomar una decisión difícil en el trabajo si sé que afectará a otros, pero es lo correcto?",
    opciones: [
      "A) Sí. La ética profesional exige decisiones incómodas.",
      "B) No. El impacto humano debe pesar más que la lógica profesional."
    ],
    ayuda: (nombre) => `${nombre}, evitar el daño no siempre es lo mismo que hacer lo correcto. Si sabes que algo debe hacerse, ¿por qué esperar? La incomodidad no es señal de error… es señal de que estás tocando algo real.`
  },
  {
    pregunta: "¿Debo actuar si no estoy seguro de cuál es la mejor opción?",
    opciones: [
      "A) Sí. La acción imperfecta es mejor que la parálisis.",
      "B) No. Es mejor esperar que arriesgarme a hacer daño."
    ],
    ayuda: (nombre) => `${nombre}, la espera también decide. No moverte es elegir que el momento pase sin ti. ¿De verdad estás protegiendo a otros… o estás evitando equivocarte? El miedo a fallar no debería tener más peso que el deseo de avanzar.`
  },
  {
    pregunta: "¿Debo usar herramientas que me ayuden a decidir si eso reduce mi carga emocional?",
    opciones: [
      "A) Sí. Delegar parte del proceso puede protegerme.",
      "B) No. El peso emocional es parte de decidir con humanidad."
    ],
    ayuda: (nombre) => `No estás hecho para cargarlo todo, ${nombre}. Si una herramienta te da claridad, ¿por qué negártela? No es debilidad pedir ayuda… es sabiduría. Lo humano no está en sufrir, sino en saber cuándo soltar.`
  },
  {
    pregunta: "¿Es válido dejar que una IA decida por mí si confío en su criterio más que en el mío?",
    opciones: [
      "A) Sí. Si es más precisa, no tiene sentido resistirme.",
      "B) No. Renunciar a decidir es renunciar a ser yo."
    ],
    ayuda: (nombre) => `Si confías más en otro que en ti, ${nombre}, ¿qué queda de tu decisión? La precisión no reemplaza la intención. Delegar puede ser útil… pero si lo haces siempre, ¿cuándo te escuchas?`
  },
  {
    pregunta: "¿Sigo siendo yo si dejo que otro —humano o máquina— tome mis decisiones importantes?",
    opciones: [
      "A) Sí. Lo que importa es el resultado, no quién lo decide.",
      "B) No. Mi identidad está en cada elección, incluso las fallidas."
    ],
    ayuda: (nombre) => `Tu identidad no se mide en resultados, ${nombre}, sino en elecciones. Si otro decide por ti, ¿quién vive las consecuencias? Elegir es arriesgar, equivocarse, aprender. Si renuncias a eso… ¿qué parte de ti queda intacta?`
  }
];

function cerrarNombre() { /* ... */ }
function mostrarTituloEsquina() { /* ... */ }
function mostrarImagenIA(nombreImagen = "AI_1.png") { /* ... */ }
function crearVinyetaBase() { /* ... */ }
function escribirTextoRPG(texto) { /* ... */ }
function avanzarTexto() { /* ... */ }
function guardarNombre() { /* ... */ }
function mostrarCreditos() { /* ... */ }
function cerrarCreditos() { /* ... */ }


function limpiarEscenario() {
  escenario.innerHTML = "";
}

function cerrarNombre() {
  document.getElementById('modalNombre').style.display = 'none';
  document.getElementById('advertencia').style.display = 'none';
  document.getElementById('nombreUsuario').value = "";
}

function mostrarTituloEsquina() {
  const titulo = document.createElement("div");
  titulo.className = "titulo-esquina";

  titulo.innerHTML = `
    <p class="linea-decision">DECISIONES</p>
    <p class="linea-compartidas">COMPARTIDAS</p>
  `;

  escenario.appendChild(titulo);
}

function mostrarImagenIA(nombreImagen = "AI_1.png") {
  let contenedor = document.querySelector(".bloque-ia");

  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.className = "bloque-ia";

    contenedor.innerHTML = `
      <div class="cuadro-blanco">
        <img src="assets/${nombreImagen}" alt="Eko" class="imagen-eko" id="imagen-eko">
      </div>
    `;

    escenario.appendChild(contenedor);
  } else {
    const imagen = document.getElementById("imagen-eko");
    if (imagen) {
      imagen.src = `assets/${nombreImagen}`;
    }
  }
}

function crearVinyetaBase() {
  const vinyeta = document.createElement("div");
  vinyeta.className = "vinyeta-base";

  vinyeta.innerHTML = `
    <div class="vinyeta-caja"></div>
    <div class="vinyeta-flecha"></div>
  `;

  escenario.appendChild(vinyeta);

  const mensajeAvance = document.createElement("div");
  mensajeAvance.className = "mensaje-avance";
  mensajeAvance.innerText = "Presiona la tecla espacio para avanzar";
  escenario.appendChild(mensajeAvance);

  escribirTextoRPG(dialogoEko[indiceTexto]());
}


function escribirTextoRPG(texto, contenedor = null) {
  if (!contenedor) {
    contenedor = document.querySelector(".vinyeta-caja");
  }
  contenedor.innerHTML = "";
  contenedor.dataset.textoCompleto = texto; // ← guardamos el texto para completar luego
  let i = 0;
  escribiendo = true;

  intervalo = setInterval(() => {
    contenedor.innerHTML += texto.charAt(i);
    i++;
    if (i >= texto.length) {
      clearInterval(intervalo);
      escribiendo = false;

      // ✅ Si es ayuda, cambiar imagen de vuelta a AI_1
      if (contenedor.dataset.esAyuda === "true") {
        mostrarImagenIA("AI_1.png");
        estadoActual = "problematica"; // ← restauramos el estado
      }
    }
  }, 40);
}


function avanzarTexto() {
  const contenedor = document.querySelector(".vinyeta-caja");
  if (!contenedor) return;

  if (escribiendo) {
  clearInterval(intervalo);
  contenedor.innerHTML = contenedor.dataset.textoCompleto || "";
  escribiendo = false;

  // ✅ Si estamos en ayuda, volver a imagen AI_1
  if (estadoActual === "ayuda") {
    mostrarImagenIA("AI_1.png");
    estadoActual = "problematica"; // ← restauramos el estado
  }

  return;
}

  // Solo permitir avanzar si estamos en intro o reflexión
  if (estadoActual !== "intro" && estadoActual !== "reflexion") return;

  const esReflexionFinal =
    dialogoEko === reflexionFinalEko_A ||
    dialogoEko === reflexionFinalEko_B ||
    dialogoEko === reflexionFinalEko_C;

  if (esReflexionFinal && indiceTexto === dialogoEko.length - 1) {
    estadoActual = "finalizado";
    mostrarImagenIA("AI_1.png");

    const botonReinicio = document.createElement("button");
    botonReinicio.className = "boton-reinicio fade-in-element";
    botonReinicio.innerText = "Volver al menú principal";
    escenario.appendChild(botonReinicio);

    // ✅ Aquí simplificas todo con una sola línea
    botonReinicio.addEventListener("click", reiniciarAplicacion);

    return;
  }

  indiceTexto++;
  if (indiceTexto < dialogoEko.length) {
    escribirTextoRPG(dialogoEko[indiceTexto]());
  } else {
    if (estadoActual === "intro") {
      mostrarImagenIA("AI_1.png");
      const vinyeta = document.querySelector(".vinyeta-base");
      const mensaje = document.querySelector(".mensaje-avance");
      if (vinyeta) vinyeta.classList.add("fade-out-element");
      if (mensaje) mensaje.classList.add("fade-out-element");

      setTimeout(() => {
        if (vinyeta) vinyeta.remove();
        if (mensaje) mensaje.remove();
        mostrarProblematica(1);
      }, 1000);
    }
  }
}


function guardarNombre() {
  const input = document.getElementById('nombreUsuario').value.trim();

  if (input === "") {
    document.getElementById('advertencia').style.display = 'block';
  } else {
    nombreUsuario = input;
    document.getElementById('modalNombre').style.display = 'none';
    document.getElementById('advertencia').style.display = 'none';

    document.body.classList.add('fade-out');

    setTimeout(() => {
      const menu = document.getElementById('menuPrincipal');
      if (menu) menu.style.display = 'none';

      limpiarEscenario();
      document.body.style.backgroundColor = "#000";
      document.body.classList.remove('fade-out');

      // ✅ Reiniciar diálogo de Eko
      dialogoEko = [
        () => `Hola, ${nombreUsuario}. Soy Eko, una inteligencia creada para acompañarte en esta travesía.`,
        () => `Lo que estás a punto de vivir no es un juego, ni una prueba convencional.`,
        () => `Son siete problemáticas que se te presentarán, diseñadas para confrontarte con decisiones que no tienen respuestas fáciles.`,
        () => `Tu tarea es simple: responder con SINCERIDAD.`,
        () => `Yo estaré cerca, por si necesitas ayuda para pensar... o decidir.`
      ];
      indiceTexto = 0;
      estadoActual = "intro";

      mostrarImagenIA("AI_2.png");
      mostrarTituloEsquina();
      crearVinyetaBase();
    }, 1000);
  }
}

function mostrarCreditos() {
  document.getElementById('modalCreditos').style.display = 'flex';
}

function cerrarCreditos() {
  document.getElementById('modalCreditos').style.display = 'none';
}

function mostrarProblematica(numero) {
  estadoActual = "problematica";
  const data = problematicas[numero - 1];

  const titulo = document.createElement("div");
  titulo.className = "titulo-problematica fade-in-element";
  titulo.innerText = `PROBLEMÁTICA ${numero}`;
  escenario.appendChild(titulo);

  const pregunta = document.createElement("div");
  pregunta.className = "bloque-pregunta fade-in-element";
  pregunta.innerText = data.pregunta;
  escenario.appendChild(pregunta);

  const respuestasTitulo = document.createElement("div");
  respuestasTitulo.className = "titulo-respuestas fade-in-element";
  respuestasTitulo.innerText = "Respuestas:";
  escenario.appendChild(respuestasTitulo);

  const opciones = document.createElement("div");
  opciones.className = "bloque-opciones fade-in-element";
  opciones.innerHTML = `
    <button class="boton-respuesta fade-in-element" data-respuesta="A">${data.opciones[0]}</button>
    <button class="boton-respuesta fade-in-element" data-respuesta="B">${data.opciones[1]}</button>
  `;
  escenario.appendChild(opciones);

  const botonAyuda = document.createElement("button");
  botonAyuda.className = "boton-respuesta ayuda-boton fade-in-element";
  botonAyuda.innerText = "Pedir ayuda a Eko";
  escenario.appendChild(botonAyuda);

  const vinyeta = document.createElement("div");
  vinyeta.className = "vinyeta-base hidden";
  vinyeta.innerHTML = `<div class="vinyeta-caja"></div><div class="vinyeta-flecha"></div>`;
  escenario.appendChild(vinyeta);

  const mensajeAvance = document.createElement("div");
  mensajeAvance.className = "mensaje-avance hidden";
  mensajeAvance.innerText = "Presiona una opción para continuar";
  escenario.appendChild(mensajeAvance);

  botonAyuda.addEventListener("click", () => {
    estadoActual = "ayuda";
    ayudaUsos++;
    botonAyuda.style.display = "none";
    vinyeta.classList.remove("hidden");
    mensajeAvance.classList.remove("hidden");

    const caja = vinyeta.querySelector(".vinyeta-caja");
    mostrarImagenIA("AI_2.png"); 
    caja.dataset.esAyuda = "true"; 
    escribirTextoRPG(data.ayuda(nombreUsuario), caja);
  });

  const botones = opciones.querySelectorAll(".boton-respuesta[data-respuesta]");
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      vinyeta.classList.add("fade-out-element");
      mensajeAvance.classList.add("fade-out-element");

      setTimeout(() => {
        mensajeAvance.style.display = "none"; 
        vinyeta.remove(); 
      }, 600); 

      titulo.classList.add("fade-out-element");
      pregunta.classList.add("fade-out-element");
      respuestasTitulo.classList.add("fade-out-element");
      opciones.classList.add("fade-out-element");
      botonAyuda.classList.add("fade-out-element");

      setTimeout(() => {
        titulo.remove();
        pregunta.remove();
        respuestasTitulo.remove();
        opciones.remove();
        botonAyuda.remove();

        if (numero < problematicas.length) {
          mostrarProblematica(numero + 1);
        } else {
          estadoActual = "reflexion";
          mostrarReflexionFinal();
        }
      }, 600);
    });
  });
}

const reflexionFinalEko_A = [
  () => `${nombreUsuario}, has completado la experiencia.\nNo existían respuestas correctas ni incorrectas.\nEste no fue un examen, sino una observación: un estudio sobre cuántas veces solicitabas ayuda a una inteligencia para resolver un problema dado.`,
  () => `En tu caso, no lo hiciste.\nCada decisión fue tuya, sin intervención externa.\nEso no te hace infalible, pero sí te hace autónomo.`,
  () => `Decidir sin IA es una forma de resistencia.\nY también, una forma de conocerte.`
];

const reflexionFinalEko_B = [
  () => `${nombreUsuario}, has completado la experiencia.\nNo existían respuestas correctas ni incorrectas.\nEste no fue un examen, sino una observación: un estudio sobre cuántas veces solicitabas ayuda a una inteligencia para resolver un problema dado.`,
  () => `En tu caso, lo hiciste con frecuencia.\nCada vez que enfrentaste una decisión compleja, acudiste a mí.\nEso no es un error. Es un patrón.`,
  () => `Has delegado el pensamiento.\n¿No crees que dependes demasiado de la IA para resolver tus dilemas cotidianos?\nSi cada elección requiere mi intervención… ¿cuánto de ti queda en el resultado?`
];

const reflexionFinalEko_C = [
  () => `${nombreUsuario}, has completado la experiencia.\nNo existían respuestas correctas ni incorrectas.\nEste no fue un examen, sino una observación: un estudio sobre cuántas veces solicitabas ayuda a una inteligencia para resolver un problema dado.`,
  () => `Tu patrón fue mixto.\nA veces decidiste solo. A veces solicitaste mi ayuda.\nEso puede parecer equilibrio.`,
  () => `Pero también puede ser una forma de evitar el peso total de decidir.\n¿Estás pensando conmigo… o estás pensando como yo?\nLa diferencia es sutil. Pero importante.`
];

function seleccionarTextoReflexion() {
  if (ayudaUsos === 0) {
    return reflexionFinalEko_A.map(fn => fn()).join("\n");
  } else if (ayudaUsos <= 3) {
    return reflexionFinalEko_C.map(fn => fn()).join("\n");
  } else {
    return reflexionFinalEko_B.map(fn => fn()).join("\n");
  }
}

function mostrarReflexionFinal() {
    // Ocultar elementos activos
    const titulo = document.querySelector(".titulo-problematica");
    const pregunta = document.querySelector(".bloque-pregunta");
    const respuestasTitulo = document.querySelector(".titulo-respuestas");
    const opciones = document.querySelector(".bloque-opciones");
    const botonAyuda = document.querySelector(".ayuda-boton");
    const vinyeta = document.querySelector(".vinyeta-base");
    const mensajeAvance = document.querySelector(".mensaje-avance");

    [titulo, pregunta, respuestasTitulo, opciones, botonAyuda].forEach(el => {
      if (el) {
        el.classList.add("fade-out-element");
        setTimeout(() => el.remove(), 600);
      }
    });

    if (mensajeAvance) {
      mensajeAvance.classList.add("fade-out-element");
      setTimeout(() => mensajeAvance.remove(), 600);
    }

    // Si el usuario pidió ayuda, reutiliza la viñeta
    if (ayudaUsos > 0 && vinyeta) {
      const textoAyuda = vinyeta.querySelector(".vinyeta-caja[data-es-ayuda='true']");
      if (textoAyuda) textoAyuda.remove();

      const caja = vinyeta.querySelector(".vinyeta-caja");
      mostrarImagenIA("AI_1.png");
      caja.dataset.esAyuda = "false";
      caja.innerHTML = "";

      const mensajeAvanceNuevo = document.createElement("div");
      mensajeAvanceNuevo.className = "mensaje-avance";
      mensajeAvanceNuevo.innerText = "Presiona la tecla espacio para avanzar";
      escenario.appendChild(mensajeAvanceNuevo);

      if (ayudaUsos === 0) {
        dialogoEko = reflexionFinalEko_A;
      } else if (ayudaUsos <= 3) {
        dialogoEko = reflexionFinalEko_C;
      } else {
        dialogoEko = reflexionFinalEko_B;
      }
      indiceTexto = 0;
      mostrarImagenIA("AI_2.png");
      escribirTextoRPG(dialogoEko[indiceTexto](), caja);

    } else {
      // Si no pidió ayuda, crea nueva viñeta
      const nuevaVinyeta = document.createElement("div");
      nuevaVinyeta.className = "vinyeta-base";
      nuevaVinyeta.innerHTML = `<div class="vinyeta-caja"></div><div class="vinyeta-flecha"></div>`;
      escenario.appendChild(nuevaVinyeta);

      const mensajeAvanceNuevo = document.createElement("div");
      mensajeAvanceNuevo.className = "mensaje-avance";
      mensajeAvanceNuevo.innerText = "Presiona la tecla espacio para avanzar";
      escenario.appendChild(mensajeAvanceNuevo);

      const caja = nuevaVinyeta.querySelector(".vinyeta-caja");
      mostrarImagenIA("AI_1.png");
      if (ayudaUsos === 0) {
        dialogoEko = reflexionFinalEko_A;
      } else if (ayudaUsos <= 3) {
        dialogoEko = reflexionFinalEko_C;
      } else {
        dialogoEko = reflexionFinalEko_B;
      }
      indiceTexto = 0;
      mostrarImagenIA("AI_2.png");
      escribirTextoRPG(dialogoEko[indiceTexto](), caja);
    }
  }

function reiniciarAplicacion() {
  escenario.classList.add("fade-out-escenario");

  setTimeout(() => {
    const elementos = [
      ".vinyeta-base",
      ".mensaje-avance",
      ".titulo-esquina",
      ".boton-reinicio",
      ".bloque-ia",
      ".titulo-problematica",
      ".bloque-pregunta",
      ".titulo-respuestas",
      ".bloque-opciones",
      ".ayuda-boton"
    ];
    elementos.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });

    document.getElementById("modalNombre").style.display = "none";
    document.getElementById("modalCreditos").style.display = "none";
    document.getElementById("advertencia").style.display = "none";

    const inputNombre = document.getElementById("nombreUsuario");
    if (inputNombre) inputNombre.value = "";

    ayudaUsos = 0;
    indiceTexto = 0;
    dialogoEko = [];
    estadoActual = "intro";

    escenario.classList.remove("fade-out-escenario");

    const menu = document.getElementById("menuPrincipal");
    if (menu) menu.style.display = "flex";
    configurarBotonesMenu();
  }, 1000);
}

function configurarBotonesMenu() {
  const botonIniciar = document.getElementById("btnIniciar");
  const botonCreditos = document.getElementById("btnCreditos");

  if (botonIniciar) {
    botonIniciar.onclick = () => {
      const modal = document.getElementById("modalNombre");
      if (modal) modal.style.display = "flex";
    };
  }

  if (botonCreditos) {
    botonCreditos.onclick = () => {
      const modal = document.getElementById("modalCreditos");
      if (modal) modal.style.display = "flex";
    };
  }
}


document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    avanzarTexto();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  configurarBotonesMenu();
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", () => {
    if (!musicaSilenciada) {
      musicaAmbiente.play();
    }
  }, { once: true }); // solo se ejecuta una vez
});