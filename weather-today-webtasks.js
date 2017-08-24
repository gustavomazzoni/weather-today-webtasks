var https = require('https');

// check if params are valid
function isValid(latitude, longitude) {
  if (!(latitude && longitude &&
    isNumeric(latitude) && isNumeric(longitude))) {
    return false;
  }
  return true;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function errorHandler(message) {
  return done(null, message);
}

module.exports = function (ctx, done) {
  // check if params are valid
  if (!ctx.data.FORECAST_API_KEY) { return done(null, 'Must inform valid FORECAST_API_KEY.'); }

  if (!isValid(ctx.data.latitude, ctx.data.longitude)) { return done(null, 'Must inform valid latitude and longitude.'); }

  // The Dark Sky API url
  // https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE,TIME
  var baseUri = 'https://api.darksky.net/forecast/' + ctx.data.FORECAST_API_KEY + '/';

  // set URL Params: LATITUDE,LONGITUDE
  var urlParams = ctx.data.latitude + ',' + ctx.data.longitude;

  var request = https.get(baseUri + urlParams, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "",
        result;

    response.on('data', function (chunk) {
      buffer += chunk;
    });

    // finished transferring data
    response.on("end", function () {
      // if response status is not 200, something went wrong.
      if (response.statusCode !== 200) {
        return errorHandler('Problem with the result. Problably an error in the url params: ' + urlParams);
      }

      // dump the raw data
      try {
        result = JSON.parse(buffer);

        // call success callback function with the result
        done(null, "Today's Weather at " + result.timezone + ': ' + result.currently.summary + ' with temperature of ' + result.currently.temperature + ' degrees.');
      } catch(err) {
        return errorHandler('Problem with the result. Problably an error in the url params: ' + urlParams);
      }
    }); 
  });
  // if an error occurs
  request.on('error', function(e) {
    return errorHandler('Problem with request: ' + e.message);
  });
}
