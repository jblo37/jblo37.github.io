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

        // Buscar a través de las últimas 10 semanas y acumular los puntos de fama por jugador
        for (let i = 0; i < 10; i++) {
            const semana = riverRaceData.items[i];
            if (semana) {
                semana.standings.forEach(standing => {
                    // Verificar que el clan sea el correcto
                    if (standing.clan.tag === tagClan) {
                        standing.clan.participants.forEach(jugador => {
                            // Inicializar el jugador si no existe
                            if (!jugadorPuntos[jugador.tag]) {
                                jugadorPuntos[jugador.tag] = { name: jugador.name, totalFame: 0 };
                            }
                            // Acumular la fama del jugador
                            jugadorPuntos[jugador.tag].totalFame += jugador.fame;
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

                const juadorActivo = clanData.memberList;

                // Filtrar y ordenar los resultados de los participantes activos por total de fama
                const juagadoresOrdenados = juadorActivo.map(member => {
                    const jugador = jugadorPuntos[member.tag];
                    return {
                        name: member.name,
                        totalFame: jugador ? jugador.totalFame : 0,
                        tagJugador: member.tag
                    };
                }).sort((a, b) => b.totalFame - a.totalFame);

                // Incluir el script de trofeos.js y pasarle datos del clan
                const script = Object.assign(document.createElement('script'), {
                    src: '../assets/js/trofeos.js',
                    onload: () => typeof trofeosDatos === 'function' ? trofeosDatos(clanData) : console.error('Función trofeosDatos no encontrada.'),
                    onerror: () => console.error('Error al cargar el script.')
                });
                document.body.appendChild(script);

                // Cargar el script rankGuerra.js y pasar datos de clasificación de guerras
                fetch(`https://proxy.royaleapi.dev/v1/locations/57000153/rankings/clanwars?limit=100`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${key}`
                        }
                    })
                    .then(respuestaRankGuerra => respuestaRankGuerra.json())
                    .then(datos => {
                        const script = Object.assign(document.createElement('script'), {
                            src: '../assets/js/rankGuerra.js',
                            onload: () => typeof rankGuerra === 'function' ? rankGuerra(datos) : console.error('Función rankGuerra no encontrada.'),
                            onerror: () => console.error('Error al cargar el script.')
                        });
                        document.body.appendChild(script);
                    })
                    .catch(error => console.error('Error al obtener clasificación de guerras:', error));

                // Cargar el script rankLadder.js y pasar datos de clasificación general
                fetch(`https://proxy.royaleapi.dev/v1/locations/57000153/rankings/clans?limit=500`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${key}`
                        }
                    })
                    .then(respuestaRankLadder => respuestaRankLadder.json())
                    .then(datos => {
                        const script = Object.assign(document.createElement('script'), {
                            src: '../assets/js/rankLadder.js',
                            onload: () => typeof rankLadder === 'function' ? rankLadder(datos) : console.error('Función rankLadder no encontrada.'),
                            onerror: () => console.error('Error al cargar el script.')
                        });
                        document.body.appendChild(script);
                    })
                    .catch(error => console.error('Error al obtener clasificación general:', error));

                // Cargar el script fechaActualizacion.js para mostrar la fecha de última actualización
                const scriptFecha = Object.assign(document.createElement('script'), {
                    src: '../assets/js/fechaActualizacion.js',
                    onload: () => typeof fecha === 'function' ? fecha(riverRaceData) : console.error('Función fecha no encontrada.'),
                    onerror: () => console.error('Error al cargar el script.')
                });
                document.body.appendChild(scriptFecha);

                // Mostrar el Top 1
                const listaJugador = document.getElementById('participants-list1');
                juagadoresOrdenados.slice(0, 1).forEach((jugador, index) => {
                    const listaElemento = document.createElement('div');
                    listaElemento.className = 'p-3 text-body-secondary bg-body rounded shadow-sm';
                    listaElemento.innerHTML = `
                      <div class="row justify-content-start align-items-center jugador-datos" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#jugadorModal">
                        <div class="col-9 text-start">
                          <h6 class="my-0 jugador-datos">${index + 1}. <span>${jugador.name}</span></h6>
                      <!-- <span>${jugador.tagJugador}</span> -->
                        </div>
                        <div class="col-1 text-end">
                          <img src="../assets/brand/cw-fame.png" style="width:25px; height: auto;">            
                        </div>
                        <div class="col-2 align-items-center">
                          <span class="text-warning text-small h6">${jugador.totalFame}</span>
                        </div>              
                      </div>
                    `;

                    listaElemento.querySelector('.jugador-datos').addEventListener('click', (event) => {
                        document.getElementById('modalNombre').textContent = '';
                        document.getElementById('modalTag').textContent = '';
                        document.getElementById('modalTotalPuntos').innerHTML = ``;

                        document.getElementById('modalPuntos').innerHTML = ``;
                        document.getElementById('modalFooter').innerHTML = ``;
                        document.getElementById('spinner').style.display = 'inline-block'; // Ocultar el spinner

                        // Obtener los registros de la carrera del río
                        fetch(`https://proxy.royaleapi.dev/v1/clans/${encodeURIComponent(tagClan)}/riverracelog`, {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer ${key}`
                                }
                            })
                            .then(response => response.json())
                            .then(riverRaceData => {
                                const jugadorTagEspecificado = jugador.tagJugador; // Reemplaza con el tag del jugador
                                let nombreJugador = "Desconocido"; // Variable para almacenar el nombre del jugador
                                const puntosPorSemana = Array(10).fill(0).map((_, i) => ({ semana: `Semana ${i + 1}`, puntos: 0 }));

                                // Iterar a través de las últimas 10 semanas
                                for (let i = 0; i < 10; i++) {
                                    const semana = riverRaceData.items[i];
                                    if (semana) {
                                        semana.standings.forEach(standing => {
                                            if (standing.clan.tag === tagClan) { // Verificar que el clan es el correcto
                                                standing.clan.participants.forEach(jugador => {
                                                    if (jugador.tag === jugadorTagEspecificado) { // Comparar con el tag especificado
                                                        puntosPorSemana[i].puntos = jugador.fame; // Asignar los puntos del jugador a la semana correspondiente
                                                        nombreJugador = jugador.name; // Guardar el nombre del jugador

                                                    }
                                                });

                                            }
                                        });
                                    }
                                }


                                puntosPorSemana.forEach(entry => {

                                    document.getElementById('modalPuntos').innerHTML +=
                                        `
                                      <div class="p-3 my-2 text-body-secondary bg-body rounded shadow-sm">
                                                            <div class="row justify-content-start align-items-center">
                                            <div class="col-9 text-start">
                                              <h6 class="my-0 jugador-datos" data-bs-toggle="modal" data-bs-target="#jugadorModal">
                                                ${entry.semana}
                                              </h6>
                                              
                                            </div>
                                            
                                            <div class="col-2 align-items-center">
                                              <span class="text-warning text-small h6">${entry.puntos}</span>
                                            </div>
                                          </div>
                                                            </div>`;
                                });

                                document.getElementById('modalNombre').textContent = jugador.name;
                                document.getElementById('modalTag').textContent = jugador.tagJugador;
                                document.getElementById('modalTotalPuntos').innerHTML = `<span class="border rounded-2 p-1">${jugador.totalFame}</span>`;
                                document.getElementById('modalFooter').innerHTML = `<div class="modal-footer flex-nowrap p-0 justify-content-center">
                                    <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 " data-bs-toggle="modal" data-bs-target="#jugadorModal"><strong>Cerrar</strong></button>   
                                    </div>`;


                                // Mostrar el nombre y los puntos separados por semana
                                console.log(`Nombre del jugador: ${nombreJugador}`);
                                puntosPorSemana.forEach(entry => {
                                    console.log(`${entry.semana}: ${entry.puntos} puntos`);
                                });
                                document.getElementById('spinner').style.display = 'none'; // Ocultar el spinner
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });




                    });

                    // Aplicar textContent a todos los span dentro de h2
                    listaElemento.querySelectorAll('h6 span').forEach(span => {
                        span.textContent = jugador.name;
                    });

                    listaJugador.appendChild(listaElemento);
                });

                // Mostrar jugadores en la posición 2-3
                const listaJugadors = document.getElementById('participants-list2');
                juagadoresOrdenados.slice(1, 3).forEach((jugador, index) => {
                    const listaElemento = document.createElement('div');
                    listaElemento.className = 'p-3 my-3 text-body-secondary bg-body rounded shadow-sm';
                    listaElemento.innerHTML = `
                      <div class="row justify-content-start align-items-center jugador-datos" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#jugadorModal">
                        <div class="col-9 text-start">
                          <h6 class="my-0 jugador-datos">${index + 2}. <span>${jugador.name}</span></h6>          
                        </div>
                        <div class="col-1 text-end">
                          <img src="../assets/brand/cw-fame.png" style="width:25px; height: auto;">            
                        </div>
                        <div class="col-2 align-items-center">
                          <span class="text-warning text-small h6">${jugador.totalFame}</span>
                        </div>             
                      </div>
                    `;
                    listaElemento.querySelector('.jugador-datos').addEventListener('click', (event) => {
                        document.getElementById('modalNombre').textContent = '';
                        document.getElementById('modalTag').textContent = '';
                        document.getElementById('modalTotalPuntos').innerHTML = ``;

                        document.getElementById('modalPuntos').innerHTML = ``;
                        document.getElementById('modalFooter').innerHTML = ``;
                        document.getElementById('spinner').style.display = 'inline-block'; // Ocultar el spinner

                        // Obtener los registros de la carrera del río
                        fetch(`https://proxy.royaleapi.dev/v1/clans/${encodeURIComponent(tagClan)}/riverracelog`, {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer ${key}`
                                }
                            })
                            .then(response => response.json())
                            .then(riverRaceData => {
                                const jugadorTagEspecificado = jugador.tagJugador; // Reemplaza con el tag del jugador
                                let nombreJugador = "Desconocido"; // Variable para almacenar el nombre del jugador
                                const puntosPorSemana = Array(10).fill(0).map((_, i) => ({ semana: `Semana ${i + 1}`, puntos: 0 }));

                                // Iterar a través de las últimas 10 semanas
                                for (let i = 0; i < 10; i++) {
                                    const semana = riverRaceData.items[i];
                                    if (semana) {
                                        semana.standings.forEach(standing => {
                                            if (standing.clan.tag === tagClan) { // Verificar que el clan es el correcto
                                                standing.clan.participants.forEach(jugador => {
                                                    if (jugador.tag === jugadorTagEspecificado) { // Comparar con el tag especificado
                                                        puntosPorSemana[i].puntos = jugador.fame; // Asignar los puntos del jugador a la semana correspondiente
                                                        nombreJugador = jugador.name; // Guardar el nombre del jugador

                                                    }
                                                });

                                            }
                                        });
                                    }
                                }


                                puntosPorSemana.forEach(entry => {

                                    document.getElementById('modalPuntos').innerHTML +=
                                        `
                                      <div class="p-3 my-2 text-body-secondary bg-body rounded shadow-sm">
                                                            <div class="row justify-content-start align-items-center">
                                            <div class="col-9 text-start">
                                              <h6 class="my-0 jugador-datos" data-bs-toggle="modal" data-bs-target="#jugadorModal">
                                                ${entry.semana}
                                              </h6>
                                              
                                            </div>
                                            
                                            <div class="col-2 align-items-center">
                                              <span class="text-warning text-small h6">${entry.puntos}</span>
                                            </div>
                                          </div>
                                                            </div>`;
                                                                });

                                document.getElementById('modalNombre').textContent = jugador.name;
                                document.getElementById('modalTag').textContent = jugador.tagJugador;
                                document.getElementById('modalTotalPuntos').innerHTML = `<span class="border rounded-2 p-1">${jugador.totalFame}</span>`;
                                document.getElementById('modalFooter').innerHTML = `<div class="modal-footer flex-nowrap p-0 justify-content-center">
                                   <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 " data-bs-toggle="modal" data-bs-target="#jugadorModal"><strong>Cerrar</strong></button>   
                        </div>`;


                                // Mostrar el nombre y los puntos separados por semana
                                console.log(`Nombre del jugador: ${nombreJugador}`);
                                puntosPorSemana.forEach(entry => {
                                    console.log(`${entry.semana}: ${entry.puntos} puntos`);
                                });
                                document.getElementById('spinner').style.display = 'none'; // Ocultar el spinner
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });




                    });


                    // Aplicar textContent a todos los span dentro de h2
                    listaElemento.querySelectorAll('h6 span').forEach(span => {
                        span.textContent = jugador.name;
                    });
                    listaJugadors.appendChild(listaElemento);
                });

                // Mostrar los jugadores (del 4 al 50)
                const listaJugadores = document.getElementById('participants-list3');
                juagadoresOrdenados.slice(3, 50).forEach((jugador, index) => {
                    const listaElementos = document.createElement('div');
                    listaElementos.className = 'p-3 my-3 text-body-secondary bg-body rounded shadow-sm';
                    listaElementos.innerHTML = `        
                      <div class="row justify-content-start align-items-center jugador-datos" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#jugadorModal">
                        <div class="col-9 text-start">
                          <h6 class="my-0 jugador-datos">${index + 4}. <span>${jugador.name}</span></h6>          
                        </div>
                        <div class="col-1 text-end">
                          <img src="../assets/brand/cw-fame.png" style="width:25px; height: auto;">            
                        </div>
                        <div class="col-2 align-items-center">
                          <span class="text-warning text-small h6">${jugador.totalFame}</span>
                        </div>              
                      </div>
                    `;

                    listaElementos.querySelector('.jugador-datos').addEventListener('click', (event) => {
                        document.getElementById('modalNombre').textContent = '';
                        document.getElementById('modalTag').textContent = '';
                        document.getElementById('modalTotalPuntos').innerHTML = ``;

                        document.getElementById('modalPuntos').innerHTML = ``;
                        document.getElementById('modalFooter').innerHTML = ``;
                        document.getElementById('spinner').style.display = 'inline-block'; // Ocultar el spinner

                        // Obtener los registros de la carrera del río
                        fetch(`https://proxy.royaleapi.dev/v1/clans/${encodeURIComponent(tagClan)}/riverracelog`, {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer ${key}`
                                }
                            })
                            .then(response => response.json())
                            .then(riverRaceData => {
                                const jugadorTagEspecificado = jugador.tagJugador; // Reemplaza con el tag del jugador
                                let nombreJugador = "Desconocido"; // Variable para almacenar el nombre del jugador
                                const puntosPorSemana = Array(10).fill(0).map((_, i) => ({ semana: `Semana ${i + 1}`, puntos: 0 }));

                                // Iterar a través de las últimas 10 semanas
                                for (let i = 0; i < 10; i++) {
                                    const semana = riverRaceData.items[i];
                                    if (semana) {
                                        semana.standings.forEach(standing => {
                                            if (standing.clan.tag === tagClan) { // Verificar que el clan es el correcto
                                                standing.clan.participants.forEach(jugador => {
                                                    if (jugador.tag === jugadorTagEspecificado) { // Comparar con el tag especificado
                                                        puntosPorSemana[i].puntos = jugador.fame; // Asignar los puntos del jugador a la semana correspondiente
                                                        nombreJugador = jugador.name; // Guardar el nombre del jugador

                                                    }
                                                });

                                            }
                                        });
                                    }
                                }


                                puntosPorSemana.forEach(entry => {

                                    document.getElementById('modalPuntos').innerHTML +=
                                        `
                                      <div class="p-3 my-2 text-body-secondary bg-body rounded shadow-sm">
                                                            <div class="row justify-content-start align-items-center">
                                            <div class="col-9 text-start">
                                              <h6 class="my-0 jugador-datos" data-bs-toggle="modal" data-bs-target="#jugadorModal">
                                                ${entry.semana}
                                              </h6>
                                              
                                            </div>
                                            
                                            <div class="col-2 align-items-center">
                                              <span class="text-warning text-small h6">${entry.puntos}</span>
                                            </div>
                                          </div>
                                                            </div>`;
                                });

                                document.getElementById('modalNombre').textContent = jugador.name;
                                document.getElementById('modalTag').textContent = jugador.tagJugador;
                                document.getElementById('modalTotalPuntos').innerHTML = `<span class="border rounded-2 p-1">${jugador.totalFame}</span>`;
                                document.getElementById('modalFooter').innerHTML = `<div class="modal-footer flex-nowrap p-0 justify-content-center">
                                 <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 " data-bs-toggle="modal" data-bs-target="#jugadorModal"><strong>Cerrar</strong></button>   
                                 </div>`;


                                // Mostrar el nombre y los puntos separados por semana
                                console.log(`Nombre del jugador: ${nombreJugador}`);
                                puntosPorSemana.forEach(entry => {
                                    console.log(`${entry.semana}: ${entry.puntos} puntos`);
                                });
                                document.getElementById('spinner').style.display = 'none'; // Ocultar el spinner
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });




                    });

                    // Aplicar textContent a todos los span dentro de h2
                    listaElementos.querySelectorAll('h6 span').forEach(span => {
                        span.textContent = jugador.name;
                    });
                    listaJugadores.appendChild(listaElementos);
                });
            });
    })
    .catch(error => console.error('Error:', error));
