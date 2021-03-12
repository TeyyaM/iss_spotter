const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = (flyTimes) => {
  for (flight of flyTimes) {
    const date = new Date(0);
    date.setUTCSeconds(flight.risetime);
    const duration = flight.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`)
  }
};

nextISSTimesForMyLocation()
  .then((flyTimes) => {
    printPassTimes(flyTimes);
  })
  .catch(error => {
    console.log('It didn\'t work:', error.message)
  });

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body))