import axios from 'axios';
import { UPDATE_TEMP } from './actionConst';
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const FORECASTFIXED = [
    {
        "low": "76",
        "high": "82",
        "skycodeday": "27",
        "skytextday": "Sunny",
        "date": "2019-08-06",
        "day": "Sunday",
        "shortday": "Sun",
        "precip": "90"
    },
    {
        "low": "69",
        "high": "76",
        "skycodeday": "27",
        "skytextday": "Strom",
        "date": "2019-08-06",
        "day": "Monday",
        "shortday": "Mon",
        "precip": "90"
    },
    {
        "low": "69",
        "high": "76",
        "skycodeday": "27",
        "skytextday": "Cloudy",
        "date": "2019-08-06",
        "day": "Tuesday",
        "shortday": "Tue",
        "precip": "90"
    },
    {
        "low": "71",
        "high": "78",
        "skycodeday": "11",
        "skytextday": "Rain Showers",
        "date": "2019-08-07",
        "day": "Wednesday",
        "shortday": "Wed",
        "precip": "90"
    },
    {
        "low": "70",
        "high": "76",
        "skycodeday": "4",
        "skytextday": "T-Storms",
        "date": "2019-08-08",
        "day": "Thursday",
        "shortday": "Thu",
        "precip": "100"
    },
    {
        "low": "69",
        "high": "77",
        "skycodeday": "9",
        "skytextday": "Light Rain",
        "date": "2019-08-09",
        "day": "Friday",
        "shortday": "Fri",
        "precip": "100"
    },
    {
        "low": "69",
        "high": "76",
        "skycodeday": "11",
        "skytextday": "Rain Showers",
        "date": "2019-08-10",
        "day": "Saturday",
        "shortday": "Sat",
        "precip": "100"
    }
]

export const getTemperatureOnGivenDate = (date = new Date()) => async dispatch => {
    try {
        let forecastOfTheDay = {};

        let url = `https://community-open-weather-map.p.rapidapi.com/forecast?q=bengaluru`;
        let options = {
            method: 'GET',
            headers: {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "48d302a1dfmshbf70709332b33adp1fcb78jsn9bee898c9bb4"
            },
            query: {
                "units": "imperial\"",
                "mode": "xml, html",
                "q": "bengaluru"
            },
            url: url
        };

        let response = await axios(options);

        if (response.status === 200) {
            let temp = response.data.list.filter(e => e.dt_txt.match(date.toISOString().slice(0, 10)))
            var a = {
                "low": temp[0].main.temp_min,
                "high": temp[0].main.temp_max,
                "skytextday": temp[0].weather[0].main,
                "day": FORECASTFIXED[date.getDay()],
                "precip": temp[0].main.humidity,
                "date": date.toISOString().slice(0, 10),
                "shortday": FORECASTFIXED[date.getDay()].slice(0, 4),
            }
            forecastOfTheDay.push(a);
        }
        if (forecastOfTheDay.length === 0) {
            let url = `/api/getTemp/${date}`;
            let options = {
                method: 'GET',
                url: url
            };
            let response = await axios(options);
            if (response.data.message === 'Success') {
                let forecast = response.data.data[0].forecast;
                forecastOfTheDay = forecast.filter(e => e.day === WEEKDAYS[date.getDay()]);
            }
        }


        if (forecastOfTheDay.length === 0) {
            forecastOfTheDay = [FORECASTFIXED[date.getDay()]]
        }

        dispatch({
            type: UPDATE_TEMP,
            payload: { selectedDate: date, weatherData: forecastOfTheDay[0] }
        });
    } catch (error) {
        let forecastOfTheDay = {};
        let url = `/api/getTemp/${date}`;
        let options = {
            method: 'GET',
            url: url
        };
        let response = await axios(options);
        if (response.data.message === 'Success') {
            let forecast = response.data.data[0].forecast;
            forecastOfTheDay = forecast.filter(e => e.day === WEEKDAYS[date.getDay()]);
        }
        forecastOfTheDay = [FORECASTFIXED[date.getDay()]]
        dispatch({
            type: UPDATE_TEMP,
            payload: { selectedDate: date, weatherData: forecastOfTheDay[0] }
        });
    }
}