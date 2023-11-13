document.addEventListener("DOMContentLoaded", () => {
    const chartContainer = document.getElementById("chart-container");
    const chartCanvas = document.getElementById("myChart");
    const currencySelect = document.getElementById("currency");
    let myChart;  // Variable para almacenar la instancia de Chart
  
    // Al cargar la página, muestra la comparación del valor de la moneda por defecto (USD)
    fetchExchangeRate();
  
    // Agregar un evento de cambio al selector de monedas
    currencySelect.addEventListener('change', fetchExchangeRate);
  
    async function fetchExchangeRate() {
      const baseCurrency = currencySelect.value;
  

      if (myChart) {
        myChart.destroy();
      }
  
      const response = await fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}`);
      const data = await response.json();
      const exchangeRate = data.rates.USD;
  
      const chartData = {
        labels: [baseCurrency, 'USD'],
        datasets: [{
          label: `Valor de 1 ${baseCurrency} en USD`,
          data: [1, exchangeRate],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      };
  
      displayChart(chartData);
    }
  
    function displayChart(data) {
  
      myChart = new Chart(chartCanvas, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  });