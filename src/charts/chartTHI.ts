import Chart from 'chart.js/auto'
import { getWeatherInfo } from '../data/getWeatherInfo';

export async function chartTHI() {
    const daysTHI = await getWeatherInfo()
    let data: any[] = []
    for (const[date, obj] of Object.entries(daysTHI)) {
        data.push(obj)
    }

    let chartStatus = Chart.getChart("chartTHI"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    
    let grapharea =  document.getElementById('chartTHI') as HTMLCanvasElement;
    let myChart = new Chart(
        grapharea,
        {
          type: 'line',
          data: {
            labels: data.map(row => row.date.split("T")[0]),
            datasets: [
              {
                label: 'THI',
                data: data.map(row => row.THI)
              }
            ]
          }
        }
    );
}
