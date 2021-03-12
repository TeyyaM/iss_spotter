const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = (flyTimes) => {
  for (flight of flyTimes) {
    const date = new Date(0);
    date.setUTCSeconds(flight.risetime);
    const duration = flight.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`)
  }
};

nextISSTimesForMyLocation((error, flyTimes) => {
  if (error) {
    return console.log('It didn\'t work!', error);
  }
  // Success!
  printPassTimes(flyTimes);
});

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log('It didn\'t work!', error);
//   }
//   // Success!
//   console.log(passTimes);
// });

/* earlier test codes */

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP('99.199.82.143', (err, data) => {
//   if (err) {
//     console.log('Something went wrong!', err);
//     return;
//   }
//   console.log('Got it! Coordinates are:', data);
// });

// fetchISSFlyOverTimes({ latitude: 49.3667, longitude: -123.1665 }, (err, data) => {
//   if (err) {
//     console.log('Something went wrong!', err);
//     return;
//   }
//   console.log('Got it! Times and durations are', data);
// });