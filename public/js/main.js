const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');

const temp_status = document.getElementById('temp_status');
const temp_real_val = document.getElementById('temp_real_val');

const datahide = document.querySelector('.middle_layer');

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = `Please write name before search`;
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=a5b06821749fc92d41bad7ca75735dd0`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;


            const tempMood = arrData[0].weather[0].main;

            // consition for checking colud and clear
            if (tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fa-solid  fa-sun' style='color: #fc7f0a;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #fc7f0a;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-rain' style='color: #fc7f0a;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fa-solid fa-sun-plant-wilt' style='color: #fc7f0a;'></i>";
            }

            datahide.classList.remove('data_hide');

        } catch {
            city_name.innerText = `plz enter correct city name`;
            datahide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click', getInfo);