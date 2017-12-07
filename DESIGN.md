Let's start with index.html, which is in the templates folder within project.
    This is adapted from a template downloaded from this url: http://www.templatemo.com/tm-508-power. The CSS files
were not altered, and only one of the images was kept. The title is set as Rendezvous, the required meta tags are
included, and the scripts that get jquery, bootstrap, etc. are included. The CSS files that were downloaded with
the template are also included at this point.
    The first component of the body is the navigation bar, which has links that direct a user to the main components
of the page. This is done using a tags that have the different section urls set equal to href. This navigation bar
moves with the user as they scroll down the page so that they always have the option to move to any part of the
page. The next component is the home screen banner, which introduces a user to the app with the title and slogan
in large, central text. There are two links that, similar to the navigation bar, direct the user to other areas of
the page. The following section of the page is more introduction of the app with another link to the data input
section of the page. The next section is another informational section, outlining the capabilities and requirements
of the app to a user. The section after that is yet another informational section that lets a user know what we are
trying to accomplish here at rendezvous. We added a section with no text in it that functions as a break between
the informational part of the page and the data-input part of the page. This also allows for when a user clicks a
link taking them to the input addresses section, the heading of the section is fully visible.
    The next element of index.html is a form that takes in all the data we need to find destinations for the user.
There is text at the top to remind the user what app they are using and what data to input. There are fields for
destination type, radius from central point, and two addresses, with buttons for adding addresses and submitting
(the "Rendezvous!" button). The "Add Address" button executes the newAddress() function mentioned momentarily.
These are all necessary inputs for our use of the Google Places API. There is also a script tag at the end of the
form that had the newAddress() function executed when "Add Address" is clicked. This appends another field to the
form. The first two address fields were named "address1" and "address2" respectively, so when another address is
added, is has the name "address" plus the number of additional addresses incremented after two. The "Rendezvous!"
button is a submit button that submits the form and redirects the page
    A footer is included at the end of index.html that has the copyright info and credits the designers of the
template, as well as having a link to the app creators' facebook page and a link back to the top of the page.

Now, let's look at scripts.js, which is in the scripts folder of static within project.
    The DOM function in scripts.js is a slightly modified version of the function from pset8, with a few aspects
removed that aren't necessary for the map.
    The configure function sets up the map with the necessary elements. It also calls update when the map is moved,
and calls geocodeParameters and calculateMidpoint, which are the function used to add the markers to the map.
    The getParameterByName function is from StackOverflow, and works by identifying the parameters from the url through
the indicative characters, and choosing the value of the parameter matching the name input.
    The geocodeAddress function takes in a geocoder, args array, index, and callback function. The function creates an
address variable from the index of the args array. It then uses the geocoder to convert the address to a LatLng
object, and pushes it to the global geocodes array. It then creates a marker with a flag icon at the address location.
It then uses the lat and lng of the marker to update the global latcount and lngcount variables. The callback function
makes sure that the function runs to completion before moving on to the next step.
    The geocodeParameters function takes in a callback function as an argument. It takes the number of address
parameters in the URL and creates a variable. It then runs a for loop for the number of addresses, gets each address
using getParameterByName, and passes it to geocodeAddress, and then updates the global variable length.
    The calculateMidpoint function starts by using the global variables latcount, lngcount, and length updated in
geocodeParameters to calculate the geographic midpoint by averaging the lat and lng by dividing latcount and lngcount
by length between all of the locations, and places a blue marker icon at that position. It then centers the map on the
marker. Next, it gets the radius parameter from the URL,caps it at 30 miles, takes the absolute value, and converts it
to meters from miles. It then creates a request object using the midpoint, radius, and the type parameter from the URL,
and passes that request object into a textSearch. The callback function then iterates through up to 10 of the locations
returned by the textSearch, adds a marker to those locations, and attaches a 'click' listener that opens an infoWindow
containing the name of the business, a link to the website, the Google rating, and the address.

Next, let's take a look at application.py.
    After doing the necessary imports, there are two routes. These are for the two html templates that we have
created, index.html and results.html. index.html is rendered as soon as the site is reached–– it acts as the
landing page. results.html can only be reached through a GET request so that data can be retrieved from the
URL and thus the form.

Finally, let's dissect results.html.
    The head portion of the file is almost exactly the same as that of index.html, except that it also imports the
app's own javascript found in the file scripts.js, and gets the Google Maps API and the geometry and places libraries.
The API key is also set in this portion of the code, so that it does not have to be set by a user. At the top of the
page, there is information letting a user know what is going on, and what to look for in the map. A map is embedded
in the page to show the output, which is dealt with in scripts.js. A similar footer to the one created in index.html
is at the bottom of this file, with the only difference being that there is a "back to home" button that takes a user
back to the home page so they can get ready to rendezvous again!