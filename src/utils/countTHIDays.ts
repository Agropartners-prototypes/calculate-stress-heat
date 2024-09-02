import { getWeatherInfo } from "../data/getWeatherInfo"
import * as _ from 'lodash';

export async function countTHIDays() {
    const daysThi = await getWeatherInfo()
    const countsStressDays: {
        lightHeat: number, 
        moderateHeat: number,
        heavyHeat: number,
        severeHeat: number,
        deadlyHeat: number,
        noStress: number,
    } = {
        lightHeat: 0,
        moderateHeat: 0,
        heavyHeat: 0,
        severeHeat: 0,
        deadlyHeat: 0,
        noStress: 0,
    }

    for (const [date, obj] of Object.entries(daysThi)) {
        // @ts-ignore
        let thi = obj.THI

        if(thi > 100) {
            countsStressDays.deadlyHeat += 1
        } else if (thi >= 68.00 && thi < 72.00) {
            countsStressDays.lightHeat += 1
        } else if (thi >= 72.00 && thi < 80.00) {
            countsStressDays.moderateHeat += 1
        } else if (thi >= 80 && thi < 90) {
            countsStressDays.heavyHeat += 1
        } else if (thi >= 90 && thi <= 100) {
            countsStressDays.severeHeat += 1
        } else if (thi < 68) {
            countsStressDays.noStress += 1
        }
    }
    return countsStressDays
}

export async function countTHIDays2() {
    const daysThi = await getWeatherInfo()
    const countsStressDays: {
        lightHeat: number, 
        moderateHeat: number,
        heavyHeat: number,
        severeHeat: number,
        noStress: number,
    } = {
        lightHeat: 0,
        moderateHeat: 0,
        heavyHeat: 0,
        severeHeat: 0,
        noStress: 0,
    }

    for (const [date, obj] of Object.entries(daysThi)) {
        // @ts-ignore
        let thi = obj.THI

        if(thi > 100) {
            countsStressDays.severeHeat += 1
        } else if (thi >= 80.00 && thi < 84.00) {
            countsStressDays.lightHeat += 1
        } else if (thi >= 84.00 && thi < 92.00) {
            countsStressDays.moderateHeat += 1
        } else if (thi >= 92.00 && thi <= 100) {
            countsStressDays.heavyHeat += 1
        }  else if (thi < 80) {
            countsStressDays.noStress += 1
        }
    }
    return countsStressDays
}

