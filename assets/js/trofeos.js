function trofeosDatos(datos) {
    console.log('Datos recibidos:', datos);

    // Trofeos de guerra
    const trofeosClan = datos.clanWarTrophies;
    const idTrofeosClan = document.getElementById('trofeos-clan');
    const mTrofeosClan = document.createElement('div');
    mTrofeosClan.className = 'col d-flex align-items-start justify-content-center';
    mTrofeosClan.innerHTML = `
        <img src="../assets/brand/trofeos.webp" width="25">
        <h6 class="mb-0 text-body-emphasis ms-3">${trofeosClan}</h6>
    `;
    idTrofeosClan.appendChild(mTrofeosClan);

    // Total miembros del clan
    const miembros = datos.members;
    const idMiembrosClan = document.getElementById('miembros');
    const mMiembrosClan = document.createElement('div');
    mMiembrosClan.className = 'col d-flex align-items-start justify-content-center';
    mMiembrosClan.innerHTML = `
        <img src="../assets/brand/people.webp" width="25">
        <h6 class="mb-0 text-body-emphasis ms-3">${miembros}</h6>
    `;
    idMiembrosClan.appendChild(mMiembrosClan);

    // Trofeos totales
    const trofeosGuerra = datos.clanScore;
    const idTrofeosGuerra = document.getElementById('trofeos');
    const mTrofeosGuerra = document.createElement('div');
    mTrofeosGuerra.className = 'col d-flex align-items-start justify-content-center';
    mTrofeosGuerra.innerHTML = `
        <img src="../assets/brand/trophy-ribbon.webp" width="25">
        <h6 class="mb-0 text-body-emphasis ms-3">${trofeosGuerra}</h6>
    `;
    idTrofeosGuerra.appendChild(mTrofeosGuerra);
}


