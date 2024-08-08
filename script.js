const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImY4MjBkZjJhLTZmZGEtNDJiNS05NmU0LTMyNmJiZGVlNDg3YyIsImlhdCI6MTcyMjIwNTE0Mywic3ViIjoiZGV2ZWxvcGVyL2I5MjBmNmIyLTI0MDAtZGM3Zi1lZGM2LWYxNzI4MTYzMDYyOCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxODkuMTQzLjIyNS4yMzgiXSwidHlwZSI6ImNsaWVudCJ9XX0.HBuxPnSC6XhL3eJ4UuUqRImRRA1PfjKGz5UPiAqm9pn800-u_k0K7AicrxBjCDffpwIHKLIczydyG6fV-3gROg';
const PLAYER_TAG = '9QGGLVUV2';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_URL = `https://api.clashroyale.com/v1/players/%23${PLAYER_TAG}`;

fetch(PROXY_URL + API_URL, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
