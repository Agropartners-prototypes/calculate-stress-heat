import { fetchWeatherApi } from 'openmeteo';
import * as _ from 'lodash';
declare const window: any;

export async function getPrecipitation() {

    let lat = document.querySelector('#latitude').innerHTML;
    let lon = document.querySelector('#longitude').innerHTML;
    let timezoneInput = document.querySelector('#timezone').innerHTML;
    const getStartDate = () => {
        return (<HTMLInputElement>document.getElementById('startDate')).value
    }
    const getEndDate = () => {
        return (<HTMLInputElement>document.getElementById('endDate')).value
    }
    const params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": getStartDate(),
        "end_date": getEndDate(),
        "daily": "precipitation_sum",
        "timezone": timezoneInput,
    };
    const url = "https://archive-api.open-meteo.com/v1/archive";
    const responses = await fetchWeatherApi(url, params);
    
    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];
    
    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    
    const daily = response.daily()!;
    
    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
    
        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            precipitationSum: daily.variables(0)!.valuesArray()!,
        },
    
    };
    
    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    interface PrecipitationData {
        date: string;
        precipitation: number;
    }
    let dailyPrecipitation: PrecipitationData[] = []
    for (let i = 0; i < weatherData.daily.time.length; i++) {
        dailyPrecipitation.push({
            date: weatherData.daily.time[i].toISOString().split("T")[0],
            precipitation: weatherData.daily.precipitationSum[i]
        })
    }

    interface MonthlyData {
        totalPrecipitation: number;
    }

    const groupedByMonth = dailyPrecipitation.reduce((monthAcc: {[key: string]: MonthlyData}, day: PrecipitationData) => {
        const [year, month] = day.date.split('-')
        const yearMonth = `${year}-${month}`
        
        if(!monthAcc[yearMonth]) {
            monthAcc[yearMonth] = {
                totalPrecipitation: 0,
            }
        }
        
        monthAcc[yearMonth].totalPrecipitation += day.precipitation
        
        return monthAcc
    }, {})

    interface MonthlySum {
        month: string;
        sumPrecipitation: number;
    }

    const sumPrecipitationByMonth: MonthlySum[] = Object.entries(groupedByMonth).map(([month, {totalPrecipitation}]) => ({
        month,
        sumPrecipitation: totalPrecipitation
    }))

    return sumPrecipitationByMonth
}
window.getPrecipitation = getPrecipitation