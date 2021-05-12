import React, { useState } from 'react';
import axios from 'axios';
import { withGoogleMap, withScriptjs, GoogleMap, InfoWindow } from 'react-google-maps';

const API_KEY = "YOUR_API_KEY";

const Map = withScriptjs(withGoogleMap((props) => {

    const [position, setPosition] = useState({ lat: 28.58, lng: 77.204 });
    const [weather, setWeather] = useState({ place: '', country: '', humidity: '', tempMax: '', tempMin: '' });
    const [show, setShow] = useState(false);

    const onClickMap = (e) => {

        setShow(true);
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setPosition({
            lat: lat,
            lng: lng
        });
        showWeatherInfo();
    }

    const showWeatherInfo = () => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lng}&appid=${API_KEY}`)
            .then(res => {
                console.log(res);
                setWeather({
                    place: res.data.name,
                    country: res.data.sys.country,
                    humidity: res.data.main.humidity,
                    tempMax: res.data.main.temp_max,
                    tempMin: res.data.main.temp_min,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={position}
                onClick={onClickMap}

            >
                {show && <InfoWindow

                    position={{ lat: position.lat, lng: position.lng }}
                >
                    <div>
                        <p>Place: {weather.place}</p>
                        <p>Country: {weather.country}</p>
                        <p>Humidity: {weather.humidity}</p>
                        <p>Max Temperature: {weather.tempMax}</p>
                        <p>Min Temperature: {weather.tempMin}</p>
                    </div>
                </InfoWindow>}
            </GoogleMap>
        </div>
    );
}));

export default Map;