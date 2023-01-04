const form = document.querySelector('#form');
const inputValue = document.querySelector('#search-input');
let arrayRequest = [];
const downContent = document.querySelector('.down-content');

const blurWindow = document.querySelector('.blur-window');
const questionFormContainer = document.querySelector('.question-form-container');
const questionBtn = document.querySelector('.question-btn');
const questionInput = document.querySelector('.question-input');
const questionForm = document.querySelector('.question-form');

const placeNameContainer = document.querySelector('.place-name-container');

const currentWeather = document.querySelector('.current-weather');
const weatherForecast = document.querySelector('.weather-forecast');
const btnCurrentContainer = document.querySelectorAll('.btn-current-container');
const btnForecastContainer = document.querySelectorAll('.btn-forecast-container');

onQuestionSubmit();

onSwitchWeatherBtn();

onSubmit();
