// Google Map
let map;

//geocoded addresses
let geocodes = [];
//sum of lat and lng
let latcount = 0;
let lngcount = 0;
//number of address inputs
let length = 0;

// Info window
let info = new google.maps.InfoWindow();


// Execute when the DOM is fully loaded
$(document).ready(function() {


    // Options for map
    // https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    let options = {
        center: {lat: 37.4236, lng: -122.1619}, // Stanford, California
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        maxZoom: 14,
        panControl: true,
        zoom: 13,
        zoomControl: true
    };

    // Get DOM node in which map will be instantiated
    let canvas = $("#map-canvas").get(0);

    // Instantiate map
    map = new google.maps.Map(canvas, options);

    // Configure UI once Google Map is idle (i.e., loaded)
    google.maps.event.addListenerOnce(map, "idle", configure);

});
//creates icon at midpoint and creates meeting point markers
function calculateMidpoint()
{
    latcount /= length;
    lngcount /= length;
    let output = new google.maps.LatLng({lat: latcount, lng: lngcount});
    var image = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    //creates marker at midpoint
    marker = new google.maps.Marker({
        position: output,
        icon: image
    });
    marker.setMap(map);
    map.setCenter(output);

    //get radius from url and convert into proper form
    let radius = Math.abs(getParameterByName("radius"));
    if (radius > 30)
    {
        radius = 30;
    }

    var request = {
    location: output,
    radius: radius * 1609,
    query: getParameterByName("type")
    };
    //searches by type around central location
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);


    var infowindow = new google.maps.InfoWindow
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            //iterates through up to 10 results
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                id = results[i].place_id;
                //places marker at results
                marker = new google.maps.Marker({
                    position: results[i].geometry.location,
                });
                marker.setMap(map);
                //creates infoWindow with place name, website, rating, and address
                service.getDetails({
                        placeId: id}, function(place, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        var marker = new google.maps.Marker({
                            map: map,
                            position: place.geometry.location
                        });
                        //developers.google.com/maps/documentation/javascript/examples/place-details
                         google.maps.event.addListener(marker, 'click', function() {
                            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                            'Website: <a href=\'' + place.website + '\'>' + place.website + '</a><br>'
                            + 'Rating: ' + place.rating + '<br>' +place.formatted_address + '</div>');
                            infowindow.open(map, this);
                        });
                    }
                });
                console.log(id);
                if (i >= 10)
                {
                    break;
                }
            }
        }
    }
}

// Configure application
function configure()
{
    // Update UI after map has been dragged
    google.maps.event.addListener(map, "dragend", function() {

        // If info window isn't open
        if (!info.getMap || !info.getMap())
        {
            update();
        }
    });

    // Update UI after zoom level changes
    google.maps.event.addListener(map, "zoom_changed", function() {
        update();
    });

    // Configure typeahead
    $("#q").typeahead({
        highlight: false,
        minLength: 1
    });


    // Re-center map after place is selected from drop-down
    $("#q").on("typeahead:selected", function(eventObject, suggestion, name) {

        // Set map's center
        map.setCenter({lat: parseFloat(suggestion.latitude), lng: parseFloat(suggestion.longitude)});

        // Update UI
        update();
    });

    // Hide info window when text box has focus
    $("#q").focus(function(eventData) {
        info.close();
    });

    // Re-enable ctrl- and right-clicking (and thus Inspect Element) on Google Map
    // https://chrome.google.com/webstore/detail/allow-right-click/hompjdfbfmmmgflfjdlnkohcplmboaeo?hl=en
    document.addEventListener("contextmenu", function(event) {
        event.returnValue = true;
        event.stopPropagation && event.stopPropagation();
        //event.cancelBubble && event.cancelBubble();
    }, true);

    // Update UI
    update();

    // Give focus to text box
    $("#q").focus();
    geocodeParameters(function(geocodes) {
        if(geocodes[0] == 0) { //error checking
            console.error("Oh no");
            return;
        }
        console.log("checkpoint")
        calculateMidpoint();
    });



}


//geocodes single address
function geocodeAddress(geocoder, args, index, callback) {
    var address = args[index];
    geocoder.geocode({'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            geocodes.push(results[0].geometry.location);
            map.setCenter(geocodes[index]);
            var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
            marker = new google.maps.Marker({
                map: map,
                position: geocodes[index],
                icon: image
            });
            latcount += marker.getPosition().lat();
            lngcount += marker.getPosition().lng();
            console.log(latcount);
            console.log(lngcount);
            callback();
        }
    });
}

//geocode addresses
function geocodeParameters(callback) {
    let addressNumber = window.location.href.split("address").length -1;
    console.log(addressNumber);
    let args = [];
    var finishedCoders = 0;
    for (let i = 0; i < addressNumber; i++)
    {
        args.push(getParameterByName("address" + (i + 1)))
        var geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder, args, i, function() {
            if(++finishedCoders >= addressNumber) {
                callback(geocodes);
            }
        });
        length ++;
    }
    //callback();
    return; // geocodes are passed through the callback
}


//get parameters from url
//https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



// Update UI's markers
function update()
{
    // Get map's bounds
    let bounds = map.getBounds();
    let ne = bounds.getNorthEast();
    let sw = bounds.getSouthWest();

    // Get places within bounds (asynchronously)
    let parameters = {
        ne: `${ne.lat()},${ne.lng()}`,
        q: $("#q").val(),
        sw: `${sw.lat()},${sw.lng()}`
    };

};
