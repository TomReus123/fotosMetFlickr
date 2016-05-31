$(document).ready(function(){
	//Onderstaande blok code is om de functie haalFotos() aan te roepen en op te halen uit mijn html
	var zoekwoorden;
	$("#haalFotos").click(function() {
		zoekwoorden = $("#zoekwoorden").val();
		haalFotos();
	});
	
	//Onderstaande blok code is om te kunnen zoeken met de Enter knop
	$("#zoekwoorden").keydown(function(e){
		if(e.keyCode == 13){
			zoekwoorden = $(this).val();
			haalFotos();
		}
	});
	
	//Onderstaande blok code is om de foto's op te halen met een Flickr link gemengd met de ingevulde zoekwoorden
	function haalFotos(){
		var flickrURL = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags="+
		zoekwoorden + "&jsoncallback=?";
		$.ajax (
			{
				dataType: "json",
				method: "GET",
				url: flickrURL,
				success: laadFotos
			}
		)
	}
	
	//Onderstaande blok code is om de foto's style mee te geven en op het scherm te zetten
	function laadFotos(data){
		console.log(data);
		$("#plaatjes").html("");
		for(var i=0; i<data.items.length; i++){
			var foto = data.items[i];
			var htmlCode = "<div class='houder'><div class='afbeelding'><a href='" + foto.link + "'><img src='" + foto.media.m + "' alt='" + foto.title + "'></a></div><h4>" + foto.title + "</h4></div>";
			$("#plaatjes").append(htmlCode);
		}
		$("#link").attr("href", data.link).text(data.title + " door Flickr.com");
	}
})

