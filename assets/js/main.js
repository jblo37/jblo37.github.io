if (window.location.pathname === "/assets/js/main.js") {
  window.location.href = "/404.html";
}

// Función para cargar un archivo JavaScript
function cargarScript(rutaScript) {
  const script = document.createElement("script");
  script.src = rutaScript;
  document.head.appendChild(script);
}

// Detectar la ruta actual
const paginaActual = window.location.pathname;

// Cargar scripts según la página
if (paginaActual.includes("index.html")) {
  cargarScript("assets/dist/js/bootstrap.bundle.min.js");
  cargarScript("assets/js/insignia.js");
  cargarScript("assets/js/pass.js");
  cargarScript("assets/js/footer.js");
} else if (paginaActual.includes("estadisticas/estadisticas-guerra-de-clanes")) {
  cargarScript("../assets/js/insignia.js"); 
  cargarScript("../assets/dist/js/bootstrap.bundle.min.js");   
  cargarScript("../assets/js/guerra-de-clanes.js");
  cargarScript("../assets/js/footer.js");
} else if (paginaActual.includes("estadisticas/estadisticas-retro-royale")) {
  cargarScript("../assets/js/insignia.js");
  cargarScript("../assets/dist/js/bootstrap.bundle.min.js");
  cargarScript("../assets/js/retro-royale.js");  
  cargarScript("../assets/js/footer.js");
} else if (paginaActual.includes("estadisticas/estadisticas-2v2-nov-2024")) {
  cargarScript("../assets/dist/js/bootstrap.bundle.min.js");
  cargarScript("../assets/js/insignia.js");
  cargarScript("../assets/js/estadisticas-2v2-nov-2024.js");
  cargarScript("../assets/js/footer.js");
} else if (paginaActual.includes("estadisticas/estadisticas-2v2-ene-2025")) {
  cargarScript("../assets/dist/js/bootstrap.bundle.min.js");
  cargarScript("../assets/js/insignia.js");
  cargarScript("../assets/js/estadisticas-2v2-ene-2025.js");
  cargarScript("../assets/js/footer.js");
} else if (paginaActual.includes("modo-juego/modo-juego-brujas-magos-y-dragones")) {
  cargarScript("../assets/dist/js/bootstrap.bundle.min.js");
  cargarScript("../assets/js/insignia.js");
  cargarScript("../assets/js/footer.js");
} else if (paginaActual.includes("modo-juego/modo-juego-companeros-y-rivales")) {
  cargarScript("../assets/dist/js/bootstrap.bundle.min.js");
  cargarScript("../assets/js/insignia.js");
  cargarScript("../assets/js/footer.js");
} else if (paginaActual.includes("modo-juego/modo-juego-ruletas-y-comodines")) {
  cargarScript("../assets/dist/js/bootstrap.bundle.min.js");
  cargarScript("../assets/js/insignia.js");
  cargarScript("../assets/js/footer.js");
} else if (paginaActual.includes("modo-juego/modo-juego-brackets")) {
cargarScript("../assets/dist/js/bootstrap.bundle.min.js");
cargarScript("../assets/js/insignia.js");
cargarScript("../assets/js/footer.js");  
} else if (paginaActual.includes("reglamento/reglamento-guerreros-mayas")) {
  cargarScript("../assets/dist/js/bootstrap.bundle.min.js");
  cargarScript("../assets/js/insignia.js");
  cargarScript("../assets/js/footer.js");
} else if (paginaActual.includes("tutoriales/turorial-mazo-duelo")) {
  cargarScript("../assets/dist/js/bootstrap.bundle.min.js");
  cargarScript("../assets/js/insignia.js");
  cargarScript("../assets/js/footer.js");
}
