let container = document.getElementById("wet");

let date = new Date();
console.log("date:", date);

// ! This function cataches the data of the searched city

async function getWeather() {
  try {
    let city = await document.getElementById("weather").value;
    console.log("city:", city);

    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3749a9a9c673d7eb0aabcf384b47aae1&units=metric`
    );

    let data = await res.json();

    appendData(data);

    forCastMe(data);

    // console.log("data:", data);
  } catch (err) {
    console.log("err:", err);
    alert("Please enter valid City name");
  }
}

// ! This function appends the Data of the City and Map
function appendData(data) {
  container.innerHTML = null; // So that only a sinle data append at a time
  document.querySelector("#map").innerHTML = null; //

  let name = document.createElement("h2");
  name.innerText = `  ${data.name}`;

  let maxTemp = document.createElement("p");
  maxTemp.innerText = "🌡️  " + data.main.temp_max + " °C";

  let winds = document.createElement("p");
  winds.innerText = "🌬️  " + data.wind.speed + "km/s";

  let clouds = document.createElement("p");
  clouds.innerText = "🌩️  " + data.clouds.all;

  let iconcode = data.weather[0].icon;

  let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

  let sunrise = document.createElement("img");
  sunrise.src = iconurl;

  let iframe = document.createElement("iframe");
  iframe.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDgkoXIt14MAnzxMQN3bCVepsma1y_QRF8
      &q=${data.name}`;

  document.querySelector("#map").append(iframe);
  container.append(name, maxTemp, winds, clouds, sunrise);
}

// ! This function cataches the  forcast data of the searched city

async function forCastMe(data) {
  try {
    let lon = data.coord.lon;
    let lat = data.coord.lat;

    let forcast = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=3749a9a9c673d7eb0aabcf384b47aae1&units=metric`
    );

    let newData = await forcast.json();
    // console.log("newData:", newData);
    appendForcast(newData);
  } catch (err) {
    console.log("err:", err);
  }
}

let dayObj = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};
// ! This function appends the forcast of the searched city

function appendForcast(newData) {
  console.log("Hii", newData);

  document.querySelector("#wrapper").innerHTML = null; //

  let newDay = date.getDay();
  console.log("newDay:", newDay);

  newData.daily.map(function (el) {
    let box = document.createElement("div");
    box.setAttribute("class", "box");

    let iconcode = el.weather[0].icon;

    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

    let day = document.createElement("p");
    day.setAttribute("class", "day");
    day.innerText = dayObj[newDay++ % 7];
    console.log("day:", day);

    let photo = document.createElement("img");
    photo.src = iconurl;
    photo.setAttribute("class", "photo");

    let min = document.createElement("p");
    min.innerText = el.temp.min + "°";
    min.setAttribute("class", "min");

    let max = document.createElement("p");
    max.innerText = el.temp.max + "°";
    max.setAttribute("class", "max");

    box.append(day, photo, max, min);

    document.querySelector("#wrapper").append(box);
  });
}
