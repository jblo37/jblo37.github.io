const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjFjNDcxNTg4LTZkMWQtNGQ1YS1iMmFjLTZjNDM5MzY5NmQxNCIsImlhdCI6MTcyMzA5MTY1MSwic3ViIjoiZGV2ZWxvcGVyL2YwOTM0YTg4LTRkYzMtNWUyOC1lMDFkLWRiZjIyZjdkMzY1NCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.GmalFLWjbERMCJ4PKzcvZuaXHQoCAZxgfklUzexrmfd6t1zywazTFRZhRxCplawnzAUVDySt9-b7CR0Mnjt0eQ';
const PLAYER_TAG = '9QGGLVUV2';
const PROXY_URL = 'https://proxy.royaleapi.dev/v1/players/%23';
const API_URL = `${PROXY_URL}${PLAYER_TAG}/warlog`;

fetch(API_URL, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
})
.then(response => response.json())
.then(data => {
  data.items.forEach(war => {
    console.log(`Fecha de la guerra: ${war.createdDate}`);
    war.participants.forEach(participant => {
      console.log(`Miembro: ${participant.name}, Puntos de Carrera del Río: ${participant.riverRacePoints}`);
    });
  });
})
.catch(error => console.error('Error:', error));
