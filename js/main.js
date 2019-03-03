document.getElementById("startbutton").addEventListener("click", startPhotos);

document.getElementById("nextbutton").addEventListener("click", nextPhotos);

document.getElementById("previousbutton").addEventListener("click", previousPhotos);

//At beginning of program, globally set the page number to 1, for pagination purposes
var pagenumber = 1;

//Initialise the program by clicking the start button. Also serves as reset button afterwards
function startPhotos() {
	document.getElementById("previousbutton").style.visibility="visible"; //'previous' button appears once program starts
	document.getElementById("nextbutton").style.visibility="visible"; //'next' button appears once program starts
	document.getElementById("startbutton").innerHTML="Reset"; //'start' button becomes 'reset' button once program starts
	pagenumber = 1; //sets page number back to 1 for reset purposes
	showPhotos(); //pull data from the API - see showPhotos function below
	updatePageNumber();
}

function nextPhotos() {
  pagenumber = pagenumber + 1; //increment the page number
  console.log(pagenumber);
  showPhotos(); //pull data from the API - see showPhotos function below
  updatePageNumber();
}

function previousPhotos() {
  pagenumber = pagenumber - 1; //decrement the page number
  zeroCheck(); //perform a zero check - see zeroCheck function below
  console.log(pagenumber);
  showPhotos(); //pull data from the API - see showPhotos function below
  updatePageNumber();
}

//Ensure that the page number is never set to anything less than 1. This eliminates negative page numbers.
function zeroCheck() {
  if (pagenumber < 2) {
    pagenumber = 1;
  }
}

//Pull the photos data from the API when this function is called
function showPhotos() {
	//Use the '_page' param to fetch photos by page. Dynamically change the page fetched using the current value of the pagenumber variable
	//Use the '_limit' param to override the default number of photos returned per page (set to 12 in this case)
	fetch('https://jsonplaceholder.typicode.com/photos?_page=' + pagenumber + '&_limit=12')
	.then(response => response.json())
	.then(json => {
		//generate the correct <img> tags to load each photo from the JSON photos array
		var images = ''; //first create an empty images variable
		for( var i=0; i<json.length; ++i ) {
			//use the thumbnail URL pulled from JSON to generate the <img> tag, for each instance in the array
	  		//store the result in the images variable
			images += '<img src="' + json[i].thumbnailUrl + '" />';
		}
	  	//populate the photoContainer element with the resultant images variable, that is, the photo from the generated <img> tag
		document.getElementById("photoContainer").innerHTML = images;
	})
}

//Update the pagination element to show the current page number
function updatePageNumber() {
	document.getElementById("pagination").innerHTML = "Page " + pagenumber;
}