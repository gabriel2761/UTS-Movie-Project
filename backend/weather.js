const axios = require('axios'); 

function getWeather(callback) {
  axios({
    method: 'get',
    url: 'https://www.metaweather.com/api/location/1105779',
  })
  .then((response) => {
    callback(response.data.consolidated_weather);
  });

}

module.exports = {
  getWeather: getWeather
}
