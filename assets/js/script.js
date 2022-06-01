var key = '265c9d125eac2d1c7c7e7b9b8dc79e0d';
var city = "Toronto"

//time and date
var date = moment().format('dddd, MMMM Do YYYY');
var dateTime = moment().format('YYYY-MM-DD HH:MM:SS')
//to do: button creator 
var cityHist = [];
var hist = $('.citHit');
function getHis() {
    hist.empty();

	for (let i = 0; i < cityHist.length; i++) {

		var rowEle = $('<row>');
		var btnEle = $('<button>').text(`${cityHist[i]}`)

		rowEle.addClass('row histBtnRow');
		btnEle.addClass('btn btn-outline-secondary histBtn');
		btnEle.attr('type', 'button');

		hist.prepend(rowEle);
		rowEle.append(btnEle);
	} if (!city) {
		return;
	}
	//start the search once button is clicked
	$('.histBtn').on("click", function (event) {
		event.preventDefault();
		city = $(this).text();
		forecast.empty();
		getWeath();
	});
};
//
var cardBody = $('.bodToday')
//to do: get weather data for today and put it in today card
function getWeath(){
    var curURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
	$(cardBody).empty();
	$.ajax({
		url: curURL,
		method: 'GET',
	}).then(function (response) {
		$('.cityName').text(response.name);
		$('.currDate').text(date);
		//icons
		$('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
		//temperature
		var pEl = $('<p>').text(`Temperature: ${response.main.temp} °F`);
		cardBody.append(pEl);
		//what it actually feels like
		var pElTemp = $('<p>').text(`Feels Like: ${response.main.feels_like} °F`);
		cardBody.append(pElTemp);
		//humidity
		var pElHumid = $('<p>').text(`Humidity: ${response.main.humidity} %`);
		cardBody.append(pElHumid);
		//wind
		var pElWind = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
		cardBody.append(pElWind);
		//latitude and longitude of city
		var cityLon = response.coord.lon;
		var cityLat = response.coord.lat;


		var getUrlUvi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily,minutely&appid=${key}`;

		$.ajax({
			url: getUrlUvi,
			method: 'GET',
		}).then(function (response) {
			var uviElement = $('<p>').text(`UV Index: `);
			var uviSpan = $('<span>').text(response.current.uvi);
			var uvi = response.current.uvi;
			uviElement.append(uviSpan);
			cardBody.append(uviElement);
			//uv index based on color between moderate and severe
			if (uvi >= 0 && uvi <= 2) {
				uviSpan.attr('class', 'green');
			} else if (uvi > 2 && uvi <= 5) {
				uviSpan.attr("class", "yellow")
			} else if (uvi > 5 && uvi <= 7) {
				uviSpan.attr("class", "orange")
			} else if (uvi > 7 && uvi <= 10) {
				uviSpan.attr("class", "red")
			} else {
				uviSpan.attr("class", "purple")
			}
		});
	});
	forecast();
}
//to do: get forecast for the week
var forcastVal = $('forecast');
function forecast(){
    
}

//to do: save text as array on search click
$('.search').on("click", function (event) {
	event.preventDefault();
	city = $(this).parent('.btnPar').siblings('.textIn').val().trim();
	if (city === "") {
		return;
	};
	cityHist.push(city);

	localStorage.setItem('city', JSON.stringify(cityHist));
	forecast.empty();
	getHis();
	getWeath();
});
//to do: function for first data that the user sees when the website loads
function initCast(){
    
}
initCast();