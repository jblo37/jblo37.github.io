// const insignia = document.getElementById('insignia');
// const actInsignia = `

// <a class="navbar-brand" href="../index.html">Guerreros Mayas
// <img class="ms-2"src="https://cdn.statsroyale.com/v5/clan_leagues/full/legend_league_1_16000028.webp" width="auto" height="35" alt="insignia" loading="">
// </a>

// `;
// insignia.innerHTML = actInsignia;

const key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjFjNDcxNTg4LTZkMWQtNGQ1YS1iMmFjLTZjNDM5MzY5NmQxNCIsImlhdCI6MTcyMzA5MTY1MSwic3ViIjoiZGV2ZWxvcGVyL2YwOTM0YTg4LTRkYzMtNWUyOC1lMDFkLWRiZjIyZjdkMzY1NCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.GmalFLWjbERMCJ4PKzcvZuaXHQoCAZxgfklUzexrmfd6t1zywazTFRZhRxCplawnzAUVDySt9-b7CR0Mnjt0eQ';
const tagClan = '#LQQR9GQR';

// Obtener los registros de la carrera del río
fetch(`https://proxy.royaleapi.dev/v1/clans/${encodeURIComponent(tagClan)}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${key}`
  }
})
.then(respuestaClan => respuestaClan.json())
.then(datosClan => {    
    console.log(datosClan);
    const insigniaClan = datosClan.badgeId;
    const trofeos = datosClan.clanWarTrophies;

    if (trofeos >= 4000) {
        const insignia = document.getElementById('insignia');
        const actInsignia = document.createElement('div');
        actInsignia.innerHTML =`
            <div class="">
                <a class="navbar-brand" href="../index.html">Guerreros Mayas
                    <img class="ms-2" src="https://cdn.statsroyale.com/v5/clan_leagues/full/legend_league_2_${insigniaClan}.webp" width="auto" height="35" alt="insignia" loading="">
                </a>
            </div>
        `;
        insignia.appendChild(actInsignia);
    } else {
        const insignia = document.getElementById('insignia');
        const actInsignia = document.createElement('div');
        actInsignia.innerHTML =`
            <a class="navbar-brand" href="../index.html">Guerreros Mayas
                <img class="ms-2" src="https://cdn.statsroyale.com/v5/clan_leagues/full/legend_league_1_${insigniaClan}.webp" width="auto" height="35" alt="insignia" loading="">
            </a>
        `;
        insignia.appendChild(actInsignia);
    }
})
.catch(error => {
    console.error('Error al obtener los datos:', error);
});



