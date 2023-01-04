// onQuestionSubmit()
function onQuestionSubmit() {
  if (localStorage.getItem('btnRequest')) {
    arrayRequest = JSON.parse(localStorage.getItem('btnRequest'));
  }

  if (arrayRequest.includes(questionInput.value)) {
    arrayRequest.push(questionInput.value);
    arrayRequest.pop();
  }

  arrayRequest.forEach(request => {
    const btnRequest = createElement('button', ['card'], null, request);
    downContent.append(btnRequest);
  });

  questionForm.addEventListener('submit', cityNameFromWindow);
}

function cityNameFromWindow(event) {
  event.preventDefault();
  const place = questionInput.value;

  if (arrayRequest.includes(place)) {
    arrayRequest.push(place);
    arrayRequest.pop();
  }

  if (questionInput.value) {
    requestFromWindowCurrentWeather(place);
  } else {
    return;
  }
}

// Yuo need to add TOKEN instead ||||||||||||

function requestFromWindowCurrentWeather(place) {
  const getData = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=||||||||||||||||&units=metric`);
    const data = await response.json();

    if (response.status !== 404) {
      blurWindow.classList.add('none');
      questionFormContainer.classList.add('none');
      questionInput.value = '';
    } else {
      questionInput.value = '';
      return;
    }

    requestWeatherForecast(place);

    takingMainData(data);

    createButtonRequest(place);
  }
  getData();
}

// Yuo need to add TOKEN instead ||||||||||||

function requestWeatherForecast(place) {
  const getData = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=||||||||||||||&units=metric`);
    const data = await response.json();    

    const firstDayDateInfo = data.list[0].dt_txt.split(' ');
    const firstDayDate = firstDayDateInfo[0];
    const firstDayFiltred = data.list.filter(item => item.dt_txt.includes(firstDayDate));
    const withoutFirstDayFiltred = data.list.filter(item => !item.dt_txt.includes(firstDayDate));

    const secondDayDateInfo = withoutFirstDayFiltred[0].dt_txt.split(' ');
    const secondDayDate = secondDayDateInfo[0];
    const secondDayFiltred = data.list.filter(item => item.dt_txt.includes(secondDayDate));
    const withoutFirstSecondDayFiltred = withoutFirstDayFiltred.filter(item => !item.dt_txt.includes(secondDayDate));    

    const thirdDayDateInfo = withoutFirstSecondDayFiltred[0].dt_txt.split(' ');
    const thirdDayDate = thirdDayDateInfo[0];
    const thirdDayFiltred = data.list.filter(item => item.dt_txt.includes(thirdDayDate));
    const withoutFirstSecondThirdDayFiltred = withoutFirstSecondDayFiltred.filter(item => !item.dt_txt.includes(thirdDayDate));

    const forthDayDateInfo = withoutFirstSecondThirdDayFiltred[0].dt_txt.split(' ');
    const forthDayDate = forthDayDateInfo[0];
    const forthDayFiltred = data.list.filter(item => item.dt_txt.includes(forthDayDate));
    const withoutFirstSecondThirdForthDayFiltred = withoutFirstSecondThirdDayFiltred.filter(item => !item.dt_txt.includes(forthDayDate));

    const fifthDayDateInfo = withoutFirstSecondThirdForthDayFiltred[0].dt_txt.split(' ');
    const fifthDayDate = fifthDayDateInfo[0];
    const fifthDayFiltred = data.list.filter(item => item.dt_txt.includes(fifthDayDate));
    const withoutFirstSecondThirdForthFifthDayFiltred = withoutFirstSecondThirdForthDayFiltred.filter(item => !item.dt_txt.includes(fifthDayDate));
    
    const { city: { name: placeName, country: indexPlace } } = data;

    placeNameContainer.textContent = `${placeName}, ${indexPlace}`;

    takingMainDataForecast(firstDayFiltred, secondDayFiltred, thirdDayFiltred, forthDayFiltred, fifthDayFiltred);   
  }
  getData();
}

function takingMainDataForecast(firstDayFiltred, secondDayFiltred, thirdDayFiltred, forthDayFiltred, fifthDayFiltred) {  
  firstDayForecast(firstDayFiltred);
  secondDayForecast(secondDayFiltred);
  thirdDayForecast(thirdDayFiltred);
  forthDayForecast(forthDayFiltred);
  fifthDayForecast(fifthDayFiltred);
}

function firstDayForecast(firstDayFiltred) {
  const dateContainer = document.querySelector('.date-container-first-day');
  const forecastContainer = document.querySelector('.forecast-container-first-day');
  dateContainer.textContent = '';
  forecastContainer.textContent = '';

  firstDayFiltred.forEach(obj => {
    const { dt_txt: dateTime, main: { temp: temperature } } = obj;
    const date = dateTime.split(' ')[0];
    const time = dateTime.split(' ')[1];
    const cloudy = obj.weather[0].description;

    if (!dateContainer.textContent) {
      dateContainer.append(date);
    }

    const firstDayData = createElement('div', ['weather'], null, `${Math.round(temperature)}°C, ${cloudy}`);
    const firstDayTime = createElement('div', ['time'], null, `${time}`);
    const container = createElement('div', ['container'], null, null, [firstDayTime, firstDayData], 'append');

    forecastContainer.append(container);
  });
}

function secondDayForecast(secondDayFiltred) {
  const dateContainer = document.querySelector('.date-container-second-day');
  const forecastContainer = document.querySelector('.forecast-container-second-day');
  dateContainer.textContent = '';
  forecastContainer.textContent = '';

  secondDayFiltred.forEach(obj => {
    const { dt_txt: dateTime, main: { temp: temperature } } = obj;
    const date = dateTime.split(' ')[0];
    const time = dateTime.split(' ')[1];
    const cloudy = obj.weather[0].description;

    if (!dateContainer.textContent) {
      dateContainer.append(date);
    }

    const secondDayData = createElement('div', ['weather'], null, `${Math.round(temperature)}°C, ${cloudy}`);
    const secondDayTime = createElement('div', ['time'], null, `${time}`);
    const container = createElement('div', ['container'], null, null, [secondDayTime, secondDayData], 'append');

    forecastContainer.append(container);
  });
}

function thirdDayForecast(thirdDayFiltred) {
  const dateContainer = document.querySelector('.date-container-third-day');
  const forecastContainer = document.querySelector('.forecast-container-third-day');
  dateContainer.textContent = '';
  forecastContainer.textContent = '';

  thirdDayFiltred.forEach(obj => {
    const { dt_txt: dateTime, main: { temp: temperature } } = obj;
    const date = dateTime.split(' ')[0];
    const time = dateTime.split(' ')[1];
    const cloudy = obj.weather[0].description;

    if (!dateContainer.textContent) {
      dateContainer.append(date);
    }

    const thirdDayData = createElement('div', ['weather'], null, `${Math.round(temperature)}°C, ${cloudy}`);
    const thirdDayTime = createElement('div', ['time'], null, `${time}`);
    const container = createElement('div', ['container'], null, null, [thirdDayTime, thirdDayData], 'append');

    forecastContainer.append(container);
  });
}

function forthDayForecast(forthDayFiltred) {
  const dateContainer = document.querySelector('.date-container-forth-day');
  const forecastContainer = document.querySelector('.forecast-container-forth-day');
  dateContainer.textContent = '';
  forecastContainer.textContent = '';

  forthDayFiltred.forEach(obj => {
    const { dt_txt: dateTime, main: { temp: temperature } } = obj;
    const date = dateTime.split(' ')[0];
    const time = dateTime.split(' ')[1];
    const cloudy = obj.weather[0].description;

    if (!dateContainer.textContent) {
      dateContainer.append(date);
    }

    const forthDayData = createElement('div', ['weather'], null, `${Math.round(temperature)}°C, ${cloudy}`);
    const forthDayTime = createElement('div', ['time'], null, `${time}`);
    const container = createElement('div', ['container'], null, null, [forthDayTime, forthDayData], 'append');

    forecastContainer.append(container);
  });
}

function fifthDayForecast(fifthDayFiltred) {
  const dateContainer = document.querySelector('.date-container-fifth-day');
  const forecastContainer = document.querySelector('.forecast-container-fifth-day');
  dateContainer.textContent = '';
  forecastContainer.textContent = '';

  fifthDayFiltred.forEach(obj => {
    const { dt_txt: dateTime, main: { temp: temperature } } = obj;
    const date = dateTime.split(' ')[0];
    const time = dateTime.split(' ')[1];
    const cloudy = obj.weather[0].description;

    if (!dateContainer.textContent) {
      dateContainer.append(date);
    }

    const fifthDayData = createElement('div', ['weather'], null, `${Math.round(temperature)}°C, ${cloudy}`);
    const fifthDayTime = createElement('div', ['time'], null, `${time}`);
    const container = createElement('div', ['container'], null, null, [fifthDayTime, fifthDayData], 'append');

    forecastContainer.append(container);
  });
}

// onSwitchWeatherBtn()
function onSwitchWeatherBtn() {
  btnForecastContainer.forEach(item => item.addEventListener('click', () => {
    btnCurrentContainer.forEach(item => item.classList.remove('checked'));
    btnForecastContainer.forEach(item => item.classList.add('checked'));
    currentWeather.classList.add('none');
    weatherForecast.classList.remove('none');
  }));

  btnCurrentContainer.forEach(item => item.addEventListener('click', () => {
    btnCurrentContainer.forEach(item => item.classList.add('checked'));
    btnForecastContainer.forEach(item => item.classList.remove('checked'));
    currentWeather.classList.remove('none');
    weatherForecast.classList.add('none');
  }));
}

// onSubmit()
function onSubmit() {
  form.addEventListener('submit', cityName);
}

function cityName(event) {
  event.preventDefault();
  const place = inputValue.value;
  inputValue.value = '';

  if (arrayRequest.includes(place)) {
    arrayRequest.push(place);
    arrayRequest.pop();
  }
  request(place);
}

// Yuo need to add TOKEN instead |||||||||||||
function request(place) {
  const getData = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=||||||||||||||&units=metric`);
    const data = await response.json();

    if (response.status === 404) {
      return;
    }

    requestWeatherForecast(place);

    takingMainData(data);

    createButtonRequest(place);
  }
  getData();
}

function takingMainData(data) {
  const { name: cityName, sys: { country }, main: { temp: temperature, feels_like: feelsLike, humidity, pressure } } = data;
  const weather = data.weather;
  const weatherNew = { ...weather };
  const { 0: { description: cloudy } } = weatherNew;
  const { visibility, wind: { speed: windSpeed } } = data;

  createContent(cityName, country, temperature, feelsLike, humidity, pressure, visibility, windSpeed, cloudy);
}

function createContent(cityName, country, temperature, feelsLike, humidity, pressure, visibility, windSpeed, cloudy) {
  const dateBox = document.querySelector('.date');
  const timeBox = document.querySelector('.time');
  const placeElement = document.querySelector('.place');
  const temperatureElement = document.querySelector('.temperature');
  const feelsLikeElement = document.querySelector('.feels-like');
  const humidityElement = document.querySelector('.humidity');
  const pressureElement = document.querySelector('.pressure');
  const visibilityElement = document.querySelector('.visibility');
  const windSpeedElement = document.querySelector('.wind-speed');
  const cloudyElement = document.querySelector('.cloudy');

  setDateTime(dateBox, timeBox);

  placeElement.textContent = `${cityName}, ${country}`;
  temperatureElement.textContent = `Temperature: ${Math.round(temperature)}° C`;
  feelsLikeElement.textContent = `feels like: ${Math.round(feelsLike)}° C`;
  humidityElement.textContent = `humidity: ${humidity}%`;
  pressureElement.textContent = `pressure: ${pressure} hPa`;
  visibilityElement.textContent = `visibility: ${visibility} m`;
  windSpeedElement.textContent = `wind speed: ${windSpeed} m/s`;
  cloudyElement.textContent = `${cloudy}`;
}

function setDateTime(dateBox, timeBox) {
  setInterval(() => {
    const date = new Date();
    const dateTransformed = date.toLocaleDateString('en-EN', { dateStyle: 'long' });
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const toString = minutes.toString();

    if (toString.length === 1) {
      if (hours === 12 || hours > 12) {
        timeBox.textContent = `${hours}: 0${minutes} PM`;
      } else {
        timeBox.textContent = `${hours}: 0${minutes} AM`;
      }
    }

    if (hours === 12 || hours > 12) {
      timeBox.textContent = `${hours}: ${minutes} PM`;
    } else {
      timeBox.textContent = `${hours}: ${minutes} AM`;
    }
    dateBox.textContent = `${dateTransformed}`, 300});
}

function createButtonRequest(place) {
  const downContent = document.querySelector('.down-content');
  if (!downContent.textContent.includes(place.trim().toLowerCase())) {  
    if (arrayRequest.length > 9) {
      arrayRequest.shift();
      arrayRequest.push(place);
    } else {
      arrayRequest.push(place);
    }

    localStorage.setItem('btnRequest', JSON.stringify(arrayRequest));

    downContent.textContent = '';  

    arrayRequest.forEach(request => {
      const btnRequest = createElement('button', ['card'], null, request);
      downContent.append(btnRequest);

      onCardClick(btnRequest);
    });    
  } else {
    arrayRequest.push(place);
    arrayRequest.pop();
    downContent.textContent = ''; 

    arrayRequest.forEach(request => {
      const btnRequest = createElement('button', ['card'], null, request);
      downContent.append(btnRequest);

      onCardClick(btnRequest);
    });
  }
}

function onCardClick(btnRequest) {
  if (btnRequest) {
    btnRequest.addEventListener('click', (event) => {
      request(event.target.textContent);
    });
  }
}
