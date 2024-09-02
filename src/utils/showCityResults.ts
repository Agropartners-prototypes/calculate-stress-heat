import * as _ from 'lodash';
declare const window: any;
export function showCityResults(input: string) {
    let res = document.getElementById("result")
    res.innerHTML = ''
    if (input == '') {
        return;
    }
    let list = ''

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=10&language=en&format=json`).then(
        function(response) {
            return response.json()
        }).then(function (data) {
            for (let i = 0; i < data.results.length; i++) {
                list += `<li
                            class="list-group-item" 
                            onclick="setCity(
                                ${data.results[i].latitude},
                                ${data.results[i].longitude},
                                '${data.results[i].timezone}',
                                '${data.results[i].name}',
                                '${data.results[i].admin1}',
                                '${data.results[i].country}'
                            )">
                            ${data.results[i].name}, ${data.results[i].admin1}, ${data.results[i].country}
                        </li>`
            }
            res.innerHTML = '<ul class="result-item list-group">' + list +  '</ul>'
            
            document.addEventListener('click', function() {
                let itensList = document.querySelector(".result-item")
                if(itensList !== null) {
                    document.querySelector(".result-item").remove();
                }
            })
            return true;
        }).catch(function (err) {
            console.warn('Something went wrong.', err)
            return false
        })  
}
window.showCityResults = showCityResults