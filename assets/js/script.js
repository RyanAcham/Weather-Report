var key = '265c9d125eac2d1c7c7e7b9b8dc79e0d';
var city = "Toronto"

//time and date
var date = moment().format('dddd, MMMM Do YYYY');
var dateTime = moment().format('YYYY-MM-DD HH:MM:SS')
//to do: button creator 
var hist = $('.citHit');
function getHis() {
	 
};
var cityHist = [];
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
//to do: get weather data for today and put it in today card
function getWeath(){

}
//to do: get forecast for the week
var forcastVal = $('forecast');
function forecast(){

}
//to do: function for first data that the user sees when the website loads
function initCast(){
    
}
initCast();