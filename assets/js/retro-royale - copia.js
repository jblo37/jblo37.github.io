const proxyUrl = 'https://proxy.royaleapi.dev/v1';
const clan = 'LQQR9GQR';


fetch(`${proxyUrl}/clans/%23${clan}/members`, {
        headers: {
            'Authorization': `Bearer ${key}`
        }
    })
    .then(response => response.json())
    .then(datos => {
        const jugadores = datos.items.filter(jugador => jugador.role !== 'inactive');
        const jugadorPuntosNombre = jugadores.map(jugador =>
            fetch(`${proxyUrl}/players/${encodeURIComponent(jugador.tag)}`, {
                headers: {
                    'Authorization': `Bearer ${key}`
                }
            })
            .then(response => response.json())
            .then(jugadorPuntos => ({
                nombre: jugadorPuntos.name,
                puntos: jugadorPuntos.progress.Classic.trophies,
                puntosM: jugadorPuntos.progress.Classic.bestTrophies
            }))
            .catch(error => console.error(`Error ${jugador.tag}:`, error))
        );

        return Promise.all(jugadorPuntosNombre);
    })
    .then(jugadorPuntos => {
        const jugadoresOrdenados = jugadorPuntos
            .sort((a, b) => b.puntos - a.puntos)
            .slice(0, 50);

        const listaJugadores = document.getElementById('participants-list');
        jugadoresOrdenados.forEach((jugador, i) => {
            const listaElementos = document.createElement('div');
            listaElementos.className = 'p-3 my-3 text-body-secondary bg-body rounded shadow-sm';

            if (jugador.puntos > 29) {
                listaElementos.innerHTML = `
                <div class="row justify-content-start align-items-center">
                    <div class="col-9 text-start">
                        <h6 class="my-0">${i + 1}. <span>${jugador.nombre}</span></h6>
                    </div>
                    <div class="col-1 text-end">
                        <img src="../assets/brand/retroroyalemas30.png" style="width:27px; height:auto;">
                    </div>
                    <div class="col-2 align-items-center">
                        <div class="row">
                            <span class="text-warning text-left">${jugador.puntos}</span>
                            <div>
                                <div class="row">
                                    <span class="text-body-secondary"><small>${jugador.puntosM}</small></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            } else {
                listaElementos.innerHTML = `
                <div class="row justify-content-start align-items-center">
                    <div class="col-9 text-start">
                        <h6 class="my-0">${i + 1}. <span>${jugador.nombre}</span></h6>
                    </div>
                    <div class="col-1 text-end">
                        <img src="../assets/brand/retroroyale30.png" style="width:25px; height:auto;">
                    </div>
                    <div class="col-2 align-items-center">
                        <div class="row">
                            <span class="text-warning text-left">${jugador.puntos}</span>
                            <div>
                                <div class="row">
                                    <span class="text-body-secondary"><small>${jugador.puntosM}</small></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            }

            // Aplicar textContent a todos los span dentro de h6
            listaElementos.querySelectorAll('h6 span').forEach(span => {
                span.textContent = jugador.nombre;
            });

            listaJugadores.appendChild(listaElementos);
        });

        document.getElementById('spinner').style.display = 'none'; // Ocultar el spinner
    })
    .catch(error => console.error('Error obtener datos:', error));