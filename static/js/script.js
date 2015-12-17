
function getWeather(query, units)
{
// List of img objects. the icon property acts as the key.
    var bgImgs = [
        {
            name: 'clear sky',
            image: 'http://www.weatherstock.com/royalty-free-weather-storm-pictures/Agriculture%20Royalty%20Free%20Pictures/slides/AG-02.JPG',
            icon: ['01d', '01n']
        },
        {
            name: 'few clouds',
            image: 'http://www.weatherstock.com/royalty-free-weather-storm-pictures/Cloud%20Royalty%20Free%20Pictures/slides/C-RF-02.JPG',
            icon: ['02d', '02n']
        },
        {
            name: 'scattered clouds',
            image: 'http://www.weatherstock.com/royalty-free-weather-storm-pictures/Cloud%20Royalty%20Free%20Pictures/slides/C-RF-06.JPG',
            icon: ['03d', '03n']
        },
        {
            name: 'broken clouds',
            image: 'http://www.weatherstock.com/royalty-free-weather-storm-pictures/Cloud%20Royalty%20Free%20Pictures/slides/C-RF-08.JPG',
            icon: ['04d', '04n']
        },
        {
            name: 'shower rain',
            image: 'http://webneel.com/wallpaper/sites/default/files/images/04-2013/Pear-Rain-Photography_1.jpg',
            icon: ['09d', '09n']
        },
        {
            name: 'rain',
            image: 'http://webneel.com/wallpaper/sites/default/files/images/04-2013/wallls.com_1200_1.jpg',
            icon: ['10d', '10n']
        },
        {
            name: 'thunderstorm',
            image: 'http://www.weatherstock.com/royalty-free-weather-storm-pictures/Lightning%20Royalty%20Free%20Pictures/slides/L-RF-05.JPG',
            icon: ['11d', '11n']
        },
        {
            name: 'snow',
            image: 'http://www.weatherstock.com/royalty-free-weather-storm-pictures/Winter%20Weather%20Royalty%20Free%20Pictures/slides/W-RF-27.JPG',
            icon: ['13d', '13n']
        },
        {
            name: 'mist',
            image: 'http://www.weatherstock.com/royalty-free-weather-storm-pictures/Fog%20Royalty%20Free%20Pictures/slides/FOG-RF-03.JPG',
            icon: ['50d', '50n']
        }
    ];

    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?' + query + units + '&appid=0953e8514c5501d8fdc02af6c04ed2c6',
        method: 'GET',
        dataType: 'json',
        success: function (resp)
        {
            for (var i = 0; i < bgImgs.length; i++)
            {
                for (var j = 0; j < bgImgs[i].icon.length; j++)
                {
                    if (bgImgs[i].icon[j] === resp.weather[0].icon)
                    {
                        var body = $('body');
                        body.css('background', 'url(' +
                            bgImgs[i].image + ') no-repeat');
                        body.css('background-size', 'cover');
                    }
                }
            }
            $('#temp').html(Math.floor(resp.main.temp) + '&deg;');
            $('#weather').html('<img src="http://openweathermap.org/img/w/' + resp.weather[0].icon + '.png" />');
            $('#description').text(resp.weather[0].description);
            $('#location').text(resp.name);
        }
    });
}

$(document).ready(function()
{
    var query = 'q=Orlando,fl';
    var units = '&units=imperial';

    getWeather(query, units);

    //TODO: Find out why my button click doesn't work.
    $('#goButton').click(function ()
    {
        console.log(query);
        query = $('input').val().replace(/ /g, '');
        console.log(query);
        getWeather('q=' + query, units);
    });

    $(document).keypress(function(e)
    {
        if (e.which == 13)
        {
            // Could be more DRY.
            console.log(query);
            query = $('input').val().replace(/ /g, '');
            console.log(query);
            getWeather('q=' + query, units);
        }
    })
});
