import React from 'react';
import axios from 'axios';

class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
      weather: [],
    };
  }

  getWeather() {
    axios.get('/weather', {
      headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) }
    })

    .then((response) => {
      console.log(response);
      this.setState({
        weather: response.data,
      });
    })

    .catch((error) => {
      console.log(error);
    });
  }

  componentWillMount() {
    this.getWeather();
  }

  render() {
    return (
      <div className="w3-card-4 w3-margin">
      	<div className="w3-container w3-dark-grey">
	  <h3>Weather Forecast</h3>
	</div>
	<table className="w3-table-all">
	  <thead>
	    <tr className="w3-dark-grey">
	      <th>Date</th>
	      <th>Temperature</th>
	      <th>Humidity</th>
	      <th>Forecast</th>
	    </tr>
	  </thead>
	  <tbody>
	    {this.state.weather.map((day, key) => 
	      <tr key={key}>
	        <td>{day.applicable_date}</td>
	        <td>{day.the_temp}</td>
	        <td>{day.humidity}%</td>
	        <td>{day.weather_state_name}</td>
	      </tr>
	    )}
	  </tbody>
	</table>
      </div>
    );
  }
}

export default Weather
