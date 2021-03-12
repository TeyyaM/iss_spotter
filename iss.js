const request = require('request');

const fetchMyIP = (callback) => {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    // check for general error
    if (error) {
      callback(error, null);
      return;
    }
    // specific error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // success!
    callback(null, JSON.parse(body).ip);
    return;
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const url = `https://freegeoip.app/json/${ip}`;
  request(url, (error, response, body) => {
    // Check for error
    if (error) {
      callback(error, null);
      return;
    }
    // Failure with a status code
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching the coordinates. Response: ${body}`), null);
      return;
    }
    // Success! Return the coordinates!
    const data = JSON.parse(body);
    const coordinates = {
      latitude: data.latitude,
      longitude: data.longitude
    };
    callback(null, coordinates);
    return;
  });
};
const fetchISSFlyOverTimes = (coords, callback) => {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    // Check if error
    if (error) {
      callback(error, null);
      return;
    }
    // failure with status code
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching the coordinates. Response: ${body}`), null);
      return;
    }
    // Success! Return the upcoming dates and durations!
    const data = JSON.parse(body).response;
    callback(null, data);
    return;
  });
};

const nextISSTimesForMyLocation = (callback) => {
  // find IP of user
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    // get latitude and longitude by IP
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      // Get the Flyover Times by latitude and longitude
      fetchISSFlyOverTimes(coords, (error, flyTimes) => {
        if (error) {
          return callback(error, null);
        }
        // return the results
        callback(null, flyTimes);
      });
    });
  });
}

module.exports = { nextISSTimesForMyLocation };