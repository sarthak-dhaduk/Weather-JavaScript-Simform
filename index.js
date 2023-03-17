let lat = document.getElementById("Lat");
let lng = document.getElementById("Lng");
let searchTextField = document.getElementById("searchTextField");
let tmp = document.getElementById("tmp");
let ws = document.getElementById("ws");
let wd = document.getElementById("wd");
let lu = document.getElementById("last-update");

function weatherLocationDebounce(code, delay) {
    let time;

    return function (...args) {
        if (time) clearTimeout(time);
        time = setTimeout(() => {
            code(...args);
        }, delay);
    }
}
function getPlaceName() {
    const debouncedFn = weatherLocationDebounce(() => {
        let p2 = fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + searchTextField.value);
        if (searchTextField.value != "") {
            p2.then((Response2) => {
                console.log(Response2.status);
                console.log(Response2.ok);
                return Response2.json();
            }).then((value2) => {
                let latitude = value2.results[0].latitude;
                let longitude = value2.results[0].longitude;
                lat.value = latitude;
                lng.value = longitude;
            }).catch(() => {
                alert("Error : Place name is invalid!");
            })
        } else {
            lat.value = "";
            lng.value = "";
        }
    }, 3000);
    debouncedFn();

}


const findDetailsOfWeather = () => {

    let p1 = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat.value}&longitude=${lng.value}&current_weather=true&hourly=temperature_2m,winddirection_10m,windspeed_10m`)


    p1.then((Responses) => {
        console.log(Responses.status);
        console.log(Responses.ok);
        return Responses.json();
    }).then((value) => {
        console.log(value)
        tmp.innerHTML = "Temperature<sub>Around 2M</sub> : " + value.current_weather.temperature + "C<sup>o</sup>";
        ws.innerHTML = "Windspeed<sub>Around 2M</sub> : " + value.current_weather.windspeed + "km/h";
        wd.innerHTML = "Wind Direction<sub>Around 10M</sub> : " + value.current_weather.winddirection + "<sup>o</sup>";
        lu.innerHTML = "Last Updated : " + value.current_weather.time;
    }).catch(() => {
        alert("Error : Latitude and longitude are invalid!");
    })
}