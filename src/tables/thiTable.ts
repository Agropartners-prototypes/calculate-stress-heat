import * as _ from 'lodash';
import { getWeatherInfo } from '../data/getWeatherInfo';

declare const window: any;

export async function thiTable() {
    let data: any[] = []
    const daysTHI = await getWeatherInfo()

    for (const[date, obj] of Object.entries(daysTHI)) {
        data.push(obj)
    }
    //Pagination of sigle days table
    const rowsPerPage = 7;
    let currentPage = 1

    function displayTable(page: number) {
        const table = document.getElementById("THITable")
        const startIndex = (page - 1) * rowsPerPage
        const endIndex = startIndex + rowsPerPage
        const slicedData = data.slice(startIndex, endIndex)

        //Clear existing table rows
        table.innerHTML = `
            <thead>
                <tr>
                <th scope="col">Date</th>
                <th scope="col">Temperature</th>
                <th scope="col">Humidity</th>
                <th scope="col">THI</th>
                </tr>
            </thead>`;
        
        //Add new rows to the table
        slicedData.forEach(item => {
            //@ts-expect-error
            const row = table.insertRow()
            const dateCell = row.insertCell(0)
            const tempCell = row.insertCell(1)
            const humdCell = row.insertCell(2)
            const thiCell = row.insertCell(3)
            dateCell.innerHTML = item.date.split("T")[0]
            tempCell.innerHTML = item.temperature
            humdCell.innerHTML = item.humidity
            thiCell.innerHTML = item.THI
        })

        //Update pagination
        updatePagination(page)
    }

    function updatePagination(currentPage: number) {
        const pageCount = Math.ceil(data.length / rowsPerPage)
        const paginationContainer = document.getElementById("pagination")
        paginationContainer.innerHTML = ""

        for(let i = 1; i <= pageCount;  i++) {
            const pageLink = document.createElement('a')
            pageLink.href = '#THITable'
            pageLink.innerText = `${i}`
            pageLink.onclick = function() {
                displayTable(i)
            }
            if(i === currentPage) {
                pageLink.style.fontWeight = "bold"
            }
            paginationContainer.appendChild(pageLink)
            paginationContainer.appendChild(document.createTextNode(" "))
        }
    }
    displayTable(currentPage);
}
window.thiTable = thiTable;