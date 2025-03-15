function rankLadder(datos) {
    console.log('Datos recibidos:', datos);

    const items = datos.items;
    items.forEach(item => {
        if (item.tag === tagClan) {
            const rank = item.rank;
            const previousRank = item.previousRank;
            const name = item.name;

            if (rank == previousRank) {
                document.getElementById('encabezadoLadder').innerHTML = `
                    <div class="row no-space w-100 text-center">
                        <div class="col-12">
                            <p class="no-space">Ladder</p>
                        </div>
                    </div>`;

                document.getElementById('rangoPrevioLadder').innerHTML = `
                    <div class="row no-space w-100 text-center" style="height: 31px;">
                        <div class="col-12 pe-0 pt-1">
                            <svg style="transform: rotate(90deg);" xmlns="http://www.w3.org/2000/svg" 
                                 width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
                                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                            </svg>
                        </div>
                    </div>`;

                document.getElementById('rangoLadder').innerHTML = `
                    <div class="row no-space w-100" style="height: 31px;">
                        <div class="col-12 ps-0 pt-2">
                            <h6 class="no-space text-body-emphasis text-start">${rank}</h6>
                        </div>
                    </div>`;
            } else if (rank > previousRank) {
                const rango = previousRank < 0 ? 0 : rank - previousRank;

                document.getElementById('encabezadoLadder').innerHTML = `
                    <div class="row no-space w-100 text-center">
                        <div class="col-12">
                            <p class="no-space">Ladder</p>
                        </div>
                    </div>`;

                document.getElementById('rangoPrevioLadder').innerHTML = `
                    <div class="col-12 pe-0">
                        <div class="row no-space w-100 text-center" style="height: 16px;">
                            <div class="col-12 pe-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                                     class="bi ${previousRank < 0 ? 'bi-pause-fill' : 'bi-caret-down-fill text-danger'}" 
                                     viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                            </div>
                        </div>
                        <div class="row no-space w-100 text-center">
                            <div class="col-12 pe-0">
                                <p class="no-space text-danger" style="font-size: 0.6rem;">${rango}</p>
                            </div>
                        </div>
                    </div>`;

                document.getElementById('rangoLadder').innerHTML = `
                    <div class="row no-space w-100" style="height: 31px;">
                        <div class="col-12 ps-0 pt-2">
                            <h6 class="no-space text-body-emphasis text-start">${rank}</h6>
                        </div>
                    </div>`;
            } else {
                const rango = previousRank - rank;

                document.getElementById('encabezadoLadder').innerHTML = `
                    <div class="row no-space w-100 text-center">
                        <div class="col-12">
                            <p class="no-space ps-1">Ladder</p>
                        </div>
                    </div>`;

                document.getElementById('rangoPrevioLadder').innerHTML = `
                    <div class="col-12 pe-0">
                        <div class="row no-space w-100 text-center" style="height: 16px;">
                            <div class="col-12 pe-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                                     class="bi bi-caret-up-fill text-success" viewBox="0 0 16 16">
                                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                </svg>
                            </div>
                        </div>
                        <div class="row no-space w-100 text-center">
                            <div class="col-12 pe-0">
                                <p class="no-space text-success" style="font-size: 0.6rem;">${rango}</p>
                            </div>
                        </div>
                    </div>`;

                document.getElementById('rangoLadder').innerHTML = `
                    <div class="row no-space w-100" style="height: 31px;">
                        <div class="col-12 ps-0 pt-2">
                            <h6 class="no-space text-body-emphasis text-start">${rank}</h6>
                        </div>
                    </div>`;
            }

            console.log(`Clan: ${name}, Actual: ${rank}, Anterior: ${previousRank}`);
        }
    });
}

