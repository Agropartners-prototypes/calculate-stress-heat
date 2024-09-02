import * as _ from 'lodash';
import { countTHIDays, countTHIDays2 } from './utils/countTHIDays';
import { chartTHI} from './charts/chartTHI';
import { chartPrecipitation } from './charts/chartPrecipitation';
import { thiTable} from './tables/thiTable';
import { precipitationTable } from './tables/precipitationTable';
import Chart from 'chart.js/auto'
import "../public/style.css"


declare const window: any;

const dataPrecipitation = [
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
];
let graphareaPrecipitation =  document.getElementById('chartPrecipitation') as HTMLCanvasElement;
let chartPrecipitationBase = new Chart(
    graphareaPrecipitation,
    {
      type: 'line',
      data: {
        labels: dataPrecipitation.map(row => row.month),
        datasets: [
          {
            label: 'Precipitation',
            data: dataPrecipitation.map(row => row.averagePrecipitation)
          }
        ]
      }
    }
);

const dataTHI = [
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
];
let graphareaTHI =  document.getElementById('chartTHI') as HTMLCanvasElement;
let chartTHIBase = new Chart(
    graphareaTHI,
    {
      type: 'line',
      data: {
        labels: dataTHI.map(row => row.month),
        datasets: [
          {
            label: 'THI',
            data: dataTHI.map(row => row.averagePrecipitation)
          }
        ]
      }
    }
);

async function showCalcTHI() {

    const values = await countTHIDays();
    const values2 = await countTHIDays2();

    //Table Stress data Non-Thermotolerant Taurine Breeds
    document.querySelector('#noStress')!.innerHTML = `${values.noStress}`
    document.querySelector('#lightHeat')!.innerHTML = `${values.lightHeat}`
    document.querySelector('#moderateHeat')!.innerHTML = `${values.moderateHeat}`
    document.querySelector('#heavyHeat')!.innerHTML = `${values.heavyHeat}`
    document.querySelector('#severeHeat')!.innerHTML = `${values.severeHeat}`
    document.querySelector('#deadlyHeat')!.innerHTML = `${values.deadlyHeat}`

    thiTable();
    chartTHI();

    //Table Stress data Thermotolerant Taurine Breeds
    document.querySelector('#noStress2')!.innerHTML = `${values2.noStress}`
    document.querySelector('#lightHeat2')!.innerHTML = `${values2.lightHeat}`
    document.querySelector('#moderateHeat2')!.innerHTML = `${values2.moderateHeat}`
    document.querySelector('#heavyHeat2')!.innerHTML = `${values2.heavyHeat}`
    document.querySelector('#severeHeat2')!.innerHTML = `${values2.severeHeat}`

    // Precipitation Chart / Table
    precipitationTable();
    chartPrecipitation();

}
window.showCalcTHI = showCalcTHI;
export{};