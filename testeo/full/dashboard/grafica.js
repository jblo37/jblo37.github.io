const key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjFjNDcxNTg4LTZkMWQtNGQ1YS1iMmFjLTZjNDM5MzY5NmQxNCIsImlhdCI6MTcyMzA5MTY1MSwic3ViIjoiZGV2ZWxvcGVyL2YwOTM0YTg4LTRkYzMtNWUyOC1lMDFkLWRiZjIyZjdkMzY1NCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.GmalFLWjbERMCJ4PKzcvZuaXHQoCAZxgfklUzexrmfd6t1zywazTFRZhRxCplawnzAUVDySt9-b7CR0Mnjt0eQ';
            const tag = 'LQQR9GQR';


fetch(`https://proxy.royaleapi.dev/v1/clans/%23${tag}/riverracelog`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${key}`
    }
})
.then(response => response.json())
.then(data => {        
    const puntosPorSemana = data.items.map((item, i) => {
        let totalpuntos = 0;
        item.standings.forEach(standing => {
            if (standing.clan.tag === `#${tag}`) {
                totalpuntos = standing.clan.fame;
            }
        });
        return totalpuntos;
    });

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [ 'Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7', 'Semana 8', 'Semana 9', 'Semana 10' ],
            datasets: [{
                data: puntosPorSemana,
                lineTension: 0,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderWidth: 4,
                pointBackgroundColor: '#007bff'
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    boxPadding: 3
                }
            }
        }
    });
})
.catch(error => {
    console.error('error:', error);
});
