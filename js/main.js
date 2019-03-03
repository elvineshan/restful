//Pull the photos data from the API
fetch('https://jsonplaceholder.typicode.com/photos') //use API URL with '/photos' endpoint 
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