import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import AutoCity from './components/AutoCity';
import Forecast from './Forecast';
import React from 'react';
import Essentials from './components/essentials';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState('Mumbai');
  const [results, setResults] = useState(null);

  const handleSelect = (suggestion) => {
    setCity(suggestion.name);
  };

  useEffect(() => {
    if (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            if (result['cod'] !== 200) {
              setIsLoaded(false);
            } else {
              setIsLoaded(true);
              setResults(result);
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [city]);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="weather__container">
        {/* Column 1 */}
        <div className="weather__col--1">
          <div className="weather__search">
            <p className="weather__search--prompt">Enter a city</p>
            <AutoCity onSelect={handleSelect} />
          </div>
          <div className="weather__placeholder weather__placeholder--1">
            Google Map Coming Soon
          </div>
          <div className="weather__placeholder weather__placeholder--2">
            Playlist
            <br />
            Coming Soon
          </div>
        </div>

        {/* Column 2 */}
        <div className="weather__col--2">
          {!isLoaded && <h2>Loading...</h2>}
          {isLoaded && results && (
            <div>
              <div className="results__main">
                <h3>{results.weather[0].main}</h3>
                <p>Feels like {results.main.feels_like}°C</p>
                <i>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </i>
              </div>

              <div className="weather__essentials">
                <Essentials today={results?.weather[0].main} />
              </div>

              <div>
                <Forecast city={city} />
              </div>
            </div>
          )}
        </div>

        {/* Column 3 */}
        <div className="weather__col--3">
          <div className="weather__cta weather__cta--day">
            <p>Plan your day with fun activities!</p>
            <Link to="/day-planner">
              <button>Day Planner</button>
            </Link>
          </div>

          <div className="weather__cta weather__cta--trip">
            <p>Start planning your next trip with our flight finder!</p>
            <Link to="/trip-planner">
              <button>Trip Planner</button>
            </Link>
          </div>

          <div className="weather__cta weather__cta--climate">
            <p>Learn how climate change can affect your travels.</p>
            <Link to="/climate-change">
              <button>Climate Change</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
