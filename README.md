    Our project, entitled Rendezvous, finds destinations for users around a center point between multiple
addresses. The central point is calculated by averaging the latitute and longitude of the inputted addresses, and
finding relevant places within an inputted radius and place type to output.
    To visit our project, you can visit the URL: http://this-is-rendezvous.herokuapp.com/. It may take a
little longer to load the homepage if it has not been loaded for over half an hour (it was launched on the free
version of heroku). If you want to get to it via the CS50 IDE, call the directory ~/workspace/powertemp/project
and execute the command "flask run" in the terminal. You can then click on the link and you will be taken to
the homepage where you can begin your rendezvous.
    When you visit the homepage, there will be several links with directions to different places on the website.
At the top, there is a navigation bar with links labeled "rendezvous," "home," "about," and "input addresses."
The "rendezvous" and "home" links take you to the home page from wherever you are on the webpage. The "about"
link takes you to the description section of the page, where each element of the app is described and the mission
statement is stated. The "input addresses" link takes you to the section of the page where you can actually put
in your addresses and information.
    Looking a little farther down the home page, you will find our project's name and slogan covering a photo of a
ciyscape that is free for personal and commercial use with no attribution required. There are also two links
below this text labeled "get started" and "more details" respectively. The "get started" link takes you to the
input addresses section of the page, and the "more details" link takes you to the description section.
    Scrolling past the home page, you will find yet another link, this time labeled "let me rendsezvous!" which
also takes you to the input addresses section of the page.
    In the information section, you can read up on inputting your addresses, adding a place type, and going on
your adventure. You can also read our mission statement there.
    Scrolling to the input addresses section of the page, you will find a form with four fields labeled
"destination type," "radius (up to 30 miles)," "address 1," and "address 2." Destination type takes in any type
supported by the Google Places API, which can be found at this url:
https://developers.google.com/places/supported_types. In the radius field, input a positive number between 0 and
30. This is the maximum distance from the centralized point that results will be outputted. In the address fields,
input addresses that you would like to find rendezvous points between. If you input a negative number for radius,
it will be treated as the absolute value of that number. If you put in a number greater than 30 miles, it will be
treated as an input of 30. Clicking the "add address" button will create an additional address field in which you
can input an additional address. There is no limit for how many addresses you can add. Clicking the "rendezvous!"
button will submit the form and redirect you to another page where the results will be displayed.
    If you want to test out the program, try putting in Cafe as the type, 1 as the radius, and any addresses you
want to look between.
    At the bottom of the first page is a footer with the copyright info etc., a link to the creators' facebook
page, and a link labeled "back to top" that redirects you back to the top of the page.
    When you are redirected to the results page, you are presented with a map with up to ten markers showing the
inputted addresses, the centralized point, and the destinations that we have found for you. The red and yellow flags
mark where the inputted addresses are. The blue marker marks the centralized point. The red markers mark the
destinations. You can drag around the map and zoom in and out. If you click on a red destination marker, an info
window will appear above it that lists the name, address, website url, and rating of the destination. Some text
at the top center of the results page tells you all of this relevant information. If one or more of the yellow
and red flags are missing from the map, try reloading the page.
    A footer similar to the first page is at the bottom of the page, the only difference being that the button
that said "back to top" now says "back to home," and it redirects you back to the home page of the web app.