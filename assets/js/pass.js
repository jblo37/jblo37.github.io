const tagJugadorT = '#V8VGQPVUJ';
const tagJugadorC = '#U88QLRVJU';

// Obtener nombre de jugadores pass
fetch(`https://proxy.royaleapi.dev/v1/players/${encodeURIComponent(tagJugadorT)}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${key}`
  }
})
.then(respuestaJugadorT => respuestaJugadorT.json())
.then(datos => {
  const nombreT = datos.name;
  const nombreTSinEmojis = nombreT.replace(/([\u2300-\u23FF]|[\u2600-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF])/g, '<span class="emoji">$1</span>');
  const jugadorT = document.getElementById('jugadorT');
  const actJugadorT = document.createElement('div');
  actJugadorT.innerHTML = `
    <div class="container-fluid">
      <img src="assets/brand/perfil-rey.png" class="img-fluid rounded-circle" width="140" height="140">
      <div class="d-flex justify-content-center" style="position: relative; display: inline-block;">
        <h2 class="fw-bold sombra-texto3 texto-fondo3"><span>${nombreTSinEmojis}</span></h2>
        <h2 class="fw-bold dorados texto-frontal3"><span>${nombreTSinEmojis}</span></h2>
      </div>
      <p>Top 1 de guerra de clanes temporada anterior.</p>
    </div>
  `;

  // Aplicar textContent a todos los span dentro de h2
  actJugadorT.querySelectorAll('h2 span').forEach(span => {
    span.textContent = nombreT;
  });
  jugadorT.appendChild(actJugadorT);
})
.catch(error => {
  console.error('Error al obtener los datos:', error);
});

// Obtener nombre de jugadores pass
fetch(`https://proxy.royaleapi.dev/v1/players/${encodeURIComponent(tagJugadorC)}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${key}`
  }
})
.then(respuestaJugadorC => respuestaJugadorC.json())
.then(datos => {
  const nombreC = datos.name;
  const nombreCSinEmojis = nombreC.replace(/([\u2300-\u23FF]|[\u2600-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF])/g, '<span class="emoji">$1</span>');
  const jugadorC = document.getElementById('jugadorC');
  const actJugadorC = document.createElement('div');
  actJugadorC.innerHTML = `
    <div class="container-fluid">
      <img src="assets/brand/baby_hogrider.png" class="img-fluid rounded-circle" width="140" height="140">
      <div class="d-flex justify-content-center" style="position: relative; display: inline-block;">
        <h2 class="fw-bold sombra-texto3 texto-fondo3"><span>${nombreCSinEmojis}</span></h2>
        <h2 class="fw-bold dorados texto-frontal3"><span>${nombreCSinEmojis}</span></h2>
      </div>
      <p>Campeón noveno torneo Guerreros Mayas Enero 2025.</p>
    </div>
  `;

  // Aplicar textContent a todos los span dentro de h2
  // actJugadorC.querySelectorAll('h2 span').forEach(span => {
  //     span.textContent = nombreC;
  // });

  jugadorC.appendChild(actJugadorC);
})
.catch(error => {
  console.error('Error al obtener los datos:', error);
});


				