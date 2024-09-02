import Chart from 'chart.js/auto'
import { getPrecipitation } from '../data/getPrecipitation'

export async function chartPrecipitation() {
    const averagePrecipitation = await getPrecipitation()
    let data: any[] = []
    for (const[date, obj] of Object.entries(averagePrecipitation)) {
        data.push(obj)
    }
    
    let chartStatus = Chart.getChart("chartPrecipitation"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    
    let grapharea =  document.getElementById('chartPrecipitation') as HTMLCanvasElement;
    let myChart = new Chart(
        grapharea,
        {
          type: 'line',
          data: {
            labels: data.map(row => row.month),
            datasets: [
              {
                label: 'Precipitation',
                data: data.map(row => row.sumPrecipitation)
              }
            ]
          }
        }
    );
}
