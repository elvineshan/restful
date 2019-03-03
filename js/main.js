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
	showPhotos();
	updatePage();
}

function nextPhotos() {
  pagenumber = pagenumber + 1;
  console.log(pagenumber);
  updatePage();
}

function previousPhotos() {
  pagenumber = pagenumber - 1;
  zeroCheck();
  console.log(pagenumber);
  updatePage();
}

function zeroCheck() {
  if (pagenumber < 2) {
    pagenumber = 1;
  }
}

function showPhotos() {
	//Pull the photos data from the API
	fetch('https://jsonplaceholder.typicode.com/photos')
	.then(response => response.json())
	.then(json => {
		//generate the correct <img> tags to load each photo from the JSON photos array
	 	//first create an empty variable
		var images = '';
		for( var i=0; i<12; ++i ) {
			//use the thumbnail URL pulled from JSON to generate the <img> tag, for each instance in the array
	  		//store the result in the images variable
			images += '<img src="' + json[i].thumbnailUrl + '" />';
		}
	  	//populate the photoContainer element with the resultant images variable, that is, the photo returned from JSON		
		document.getElementById("photoContainer").innerHTML = images;
	})
}

function updatePage() {
	document.getElementById("pagination").innerHTML = "Page " + pagenumber;
}