movieScript = function(){
	var myRequest;
	var movie = document.getElementById('movieName').value;
	movie = movie.split(' ');
	var data = "http://www.omdbapi.com/?t=";
	var endData ="&y=&plot=short&r=json";
	var container = document.getElementById('container').style.display = 'block';

	//For loop for taking care of textarea value (movie to search) with multiple words
	for(var x = 0; x < movie.length; x++){
		if( x === movie.length - 1 ){
			data += movie[x];
		}
		else{
			data += movie[x] + '+';
		}
	}
	data = data + endData;

	//Test if XMLHttpRequest is available in active browser
	try{
		myRequest = new XMLHttpRequest();
	}
	catch(e){
		try{
			myRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				myRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e){
				alert("Something broke!");
				return false;
			}
		}
	}
	myRequest.onreadystatechange = function(){
		if(myRequest.readyState === 4 && myRequest.status === 200){
			var jsonObj = JSON.parse(myRequest.responseText);//Grabs json object
			var actors = jsonObj.Actors;
			var actorList = '<ul><li>';
			for(var x = 0; x < actors.length; x++){
				if(actors[x] !== ',' ){
					actorList += actors[x];
				}
				else if(actors[x] === ','){
					actorList += '</li><li>';
				}
			}
			actorList += '</li></ul>';
			var actorHeader = '<h2 class="movieActors-header">Actors:</h2>';
			var rated = '<span class="movieRating-rated" >Rated: </span>';
			var plot = '<h2 class="moviePlot-header">Plot:</h2>';
			document.getElementById('movieActors-list').innerHTML = actorHeader + actorList;
			document.getElementById('movieTitle-text').innerHTML = jsonObj.Title;
			document.getElementById('movieRating-text').innerHTML =  rated +jsonObj.Rated;
			document.getElementById('movieImage-url').setAttribute('src' , jsonObj.Poster);
			document.getElementById('moviePlot-text').innerHTML = plot + jsonObj.Plot;

		}
	}
	myRequest.open("GET", data, true);
	myRequest.send();
}

