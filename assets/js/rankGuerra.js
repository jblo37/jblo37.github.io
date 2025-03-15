function rankGuerra(datos) {
    console.log('Datos recibidos:', datos);

    const items = datos.items;
    items.forEach(item => {
        if (item.tag === tagClan) {
            const rank = item.rank;
            const previousRank = item.previousRank;
            const name = item.name;

            document.getElementById('tituloClasificacion').innerHTML = `
                <div class="row no-space w-100 text-center">
                    <div class="col-12 pe-0">
                        <p class="">Clasificación local</p>
                    </div>
                </div>`;

            if (rank == previousRank) {
                document.getElementById('encabezadoGuerra').innerHTML = `
                    <div class="row no-space w-100 text-center">
                        <div class="col-12">
                            <p class="no-space">Guerra</p>
                        </div>
                    </div>`;

                document.getElementById('rangoPrevioGuerra').innerHTML = `
                    <div class="row no-space w-100 text-center" style="height: 31px;">
                        <div class="col-12 pe-0 pt-1">
                            <svg style="transform: rotate(90deg);" xmlns="http://www.w3.org/2000/svg" 
                                width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
                                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                            </svg>
                        </div>
                    </div>`;

                document.getElementById('rangoGuerra').innerHTML = `
                    <div class="row no-space w-100" style="height: 31px;">
                        <div class="col-12 ps-0 pt-2">
                            <h6 class="no-space text-body-emphasis text-start">${rank}</h6>
                        </div>
                    </div>`;
            } else if (rank > previousRank) {
                let rango = previousRank < 0 ? 0 : rank - previousRank;
                let icon = previousRank < 0 ? 'bi-pause-fill' : 'bi-caret-down-fill text-danger';

                document.getElementById('encabezadoGuerra').innerHTML = `
                    <div class="row no-space w-100 text-center">
                        <div class="col-12">
                            <p class="no-space">Guerra</p>
                        </div>
                    </div>`;

                document.getElementById('rangoPrevioGuerra').innerHTML = `
                    <div class="row no-space w-100 text-center">
                        <div class="col-12">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                                class="bi ${icon}" viewBox="0 0 16 16"></svg>
                        </div>
                        <div class="col-12">
                            <p class="no-space text-danger" style="font-size: 0.6rem;">${rango}</p>
                        </div>
                    </div>`;

                document.getElementById('rangoGuerra').innerHTML = `
                    <div class="row no-space w-100" style="height: 31px;">
                        <div class="col-12 ps-0 pt-2">
                            <h6 class="no-space text-body-emphasis text-start">${rank}</h6>
                        </div>
                    </div>`;
            } else {
                let rango = previousRank - rank;

                document.getElementById('encabezadoGuerra').innerHTML = `
                    <div class="row no-space w-100 text-center">
                        <div class="col-12">
                            <p class="no-space">Guerra</p>
                        </div>
                    </div>`;

                document.getElementById('rangoPrevioGuerra').innerHTML = `
                    <div class="row no-space w-100 text-center">
                        <div class="col-12">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                                class="bi bi-caret-up-fill text-success" viewBox="0 0 16 16"></svg>
                        </div>
                        <div class="col-12">
                            <p class="no-space text-success" style="font-size: 0.6rem;">${rango}</p>
                        </div>
                    </div>`;

                document.getElementById('rangoGuerra').innerHTML = `
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
