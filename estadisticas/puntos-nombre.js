// Obtener los registros de la carrera del río
fetch(`https://proxy.royaleapi.dev/v1/clans/${encodeURIComponent(tagClan)}/riverracelog`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${key}`
  }
})
.then(response => response.json())
.then(riverRaceData => {
  const jugadorPuntos = {};

  // Iterar a través de las últimas 10 semanas
  for (let i = 0; i < 10; i++) {
    const semana = riverRaceData.items[i];
    if (semana) {
      semana.standings.forEach(standing => {
        if (standing.clan.tag === tagClan) { // Verificar que el clan es el correcto
          standing.clan.participants.forEach(jugador => {
            if (!jugadorPuntos[jugador.tag]) {
              jugadorPuntos[jugador.tag] = { name: jugador.name, totalFame: 0, puntosPorSemana: [] };
            }
            jugadorPuntos[jugador.tag].totalFame += jugador.fame;
            jugadorPuntos[jugador.tag].puntosPorSemana[i] = jugador.fame; // Almacenar los puntos por semana
          });
        }
      });
    }
  }

  // Obtener la lista actual de miembros del clan
  return fetch(`https://proxy.royaleapi.dev/v1/clans/${encodeURIComponent(tagClan)}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${key}`
    }
  })
  .then(response => response.json())
  .then(clanData => {
    // Código para mostrar la información del clan y los jugadores, como antes...

    // Añade el evento de clic a cada jugador
    juagadoresOrdenados.slice(3, 50).forEach((jugador, index) => {
      const listaElementos = document.createElement('div');
      listaElementos.className = 'p-3 my-3 text-body-secondary bg-body rounded shadow-sm';
      listaElementos.innerHTML = `
        <div class="row justify-content-start align-items-center ">
          <div class="col-9 text-start player-name" data-tag="${jugador.tag}">            
            <h6 class="my-0">${index + 4}. <span>${jugador.name}</span></h6>          
          </div>
          <div class="col-1  text-end">
            <img src="../assets/brand/cw-fame.png" style="width:25px; height: auto;">            
          </div>
          <div class="col-2 align-items-center">          
            <span class="text-warning text-small h6">${jugador.totalFame}</span>
          </div>              
        </div>
      `;

      listaElementos.querySelector('.player-name').addEventListener('click', () => {
        mostrarDetallesJugador(jugador.tag, jugador.name);
      });

      listaJugadores.appendChild(listaElementos);
    });

    // Función para mostrar los detalles del jugador en el modal
    function mostrarDetallesJugador(tag, name) {
      const jugador = jugadorPuntos[tag];
      const modalPlayerName = document.getElementById('modalPlayerName');
      const modalPlayerTag = document.getElementById('modalPlayerTag');
      const modalPlayerPoints = document.getElementById('modalPlayerPoints');

      modalPlayerName.textContent = name;
      modalPlayerTag.textContent = tag;
      modalPlayerPoints.innerHTML = '';

      // Mostrar los puntos por semana en el modal
      if (jugador && jugador.puntosPorSemana) {
        jugador.puntosPorSemana.forEach((puntos, semana) => {
          const li = document.createElement('li');
          li.textContent = `Semana ${semana + 1}: ${puntos} puntos`;
          modalPlayerPoints.appendChild(li);
        });
      }

      // Mostrar el modal
      const playerModal = new bootstrap.Modal(document.getElementById('playerModal'));
      playerModal.show();
    }

  });
  
})
.catch(error => {
  console.error('Error:', error);
});
