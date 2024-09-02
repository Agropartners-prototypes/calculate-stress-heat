// import { setCity } from "./setCity"
import { fetchWeatherApi } from "openmeteo"
import * as _ from 'lodash';
declare const window: any;

export async function getWeatherInfo() {

    let lat = document.querySelector('#latitude').innerHTML
    let lon = document.querySelector('#longitude').innerHTML
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
        "hourly": ["temperature_2m", "relative_humidity_2m"]
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

    const hourly = response.hourly()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0)!.valuesArray()!,
            relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
        },
    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    let hoursData = []
    for (let i = 0; i < weatherData.hourly.time.length; i++) {
        let temp = Math.round(weatherData.hourly.temperature2m[i] * 100) / 100
        let humd = Math.round(weatherData.hourly.relativeHumidity2m[i] * 100) / 100
        let thi = Math.round(((0.8 * temp) + ((humd / 100) * (temp - 14.4)) + 46.4) * 100) / 100

        hoursData.push({
            date: weatherData.hourly.time[i].toISOString(),
            temperature: temp,
            humidity: humd,
            THI: thi
        })
    }

    const groupedByDayWithMaxTHI = hoursData.reduce((daysLog, day) => {
        const date = day.date.split("T")[0]
        // @ts-ignore
        if (!daysLog[date] || day.THI > daysLog[date].THI) {
            // @ts-ignore
            daysLog[date] = day
        }
        return daysLog
    }, [])

    return groupedByDayWithMaxTHI
}
window.getWeatherInfo = getWeatherInfo