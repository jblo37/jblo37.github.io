/* globals Chart:false */

(() => {
  'use strict'

  // Graphs
  const ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Semana 1',
        'Semana 2',
        'Semana 3',
        'Semana 4',
        'Semana 5',
        'Semana 6',
        'Semana 7',
        'Semana 8',
        'Semana 9',
        'Semana 10'
       
      ],
      datasets: [{
        data: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10
          
          
        ],
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
  },)
})()


