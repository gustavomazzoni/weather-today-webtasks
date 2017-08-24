# weather-today-webtasks
Get Today's weather of a location using [webtasks](http://webtask.io/) and forecast.io.

Apply for a Forecast.io API key here: https://developer.forecast.io/register

### Download the project
Download or clone the project using following command:
```sh
$ git clone git@github.com:gustavomazzoni/weather-today-webtasks.git
```

### Setup
Install the command line application:
```sh
$ npm i -g wt-cli
$ wt init
```

### Generate the URL
Run the following command to generate the URL:
```sh
$ wt create --secret SECRET=<my-darkest-secrets> weather-today-webtasks.js
```

You should be given a URL like:
```sh
https://wt-15dea485456a0bcddb2278e32877b40d-0.run.webtask.io/weather-today-webtasks
```

### Get Today's Weather
Visit the URL with the latitude and longitude of a place you want to know the weather:
```sh
https://wt-15dea485456a0bcddb2278e32877b40d-0.run.webtask.io/weather-today-webtasks?latitude=-22.970722&longitude=-43.182365
```