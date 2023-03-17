let lat = document.getElementById("Lat");
let lng = document.getElementById("Lng");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    console.log("Location is not allows!")
}

function showPosition(position) {
    lat.value = position.coords.latitude;
    lng.value = position.coords.longitude;
    const getInfo = () => {
        let p1 = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat.value}&longitude=${lng.value}&current_weather=true&hourly=temperature_2m,winddirection_10m,windspeed_10m`)


        p1.then((Responses) => {
            console.log(Responses.status);
            console.log(Responses.ok);
            return Responses.json();
        }).then((value) => {
            console.log(value)
            document.getElementById("tmp").innerHTML = "Temperature<sub>Around 2M</sub> : " + value.current_weather.temperature + "C<sup>o</sup>";
            document.getElementById("ws").innerHTML = "Windspeed<sub>Around 2M</sub> : " + value.current_weather.windspeed + "km/h";
            document.getElementById("wd").innerHTML = "Wind Direction<sub>Around 10M</sub> : " + value.current_weather.winddirection + "<sup>o</sup>";
            document.getElementById("last-update").innerHTML = "Last Updated : " + value.current_weather.time;
        })
    }
    getInfo();
}
function load() {
    location.reload();
}