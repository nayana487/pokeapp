$(document).ready(function(){
  var url = "http://pokeapi.co/api/v1/pokedex/1/"

  //this is an ajax call to get the whole list of pokemon ids
  $.ajax({
    url: url,
    type: "get",
    dataType: "json"
}).done(function(response){
  //ajax was successful, add a link for each pokemon name that calls the show image function
  var pokeArray = response.pokemon;
  for (i = 0; i < pokeArray.length; i++) {
    var uri = pokeArray[i].resource_uri;
    //get name list element and add the html for the link
    //pass specific pokemon data url to show image function
    $('#nameList').append('<li><a href="#" onclick="showImage(\''+uri+'\');">'+pokeArray[i].name+'</a></li>');
  }
  // promise that executes on unsuccessful ajax call
  }).fail(function(){
    alert("Transaction Failed");
  })
});

//function called on click--it will change the src attribute of the image html element
function showImage(uri){
 var url ='http://pokeapi.co/'+uri;
  //ajax to get data specific to a single pokemon
  $.ajax({
    url: url,
    type: "get",
    dataType: "json"
  }).done(function(response){
    //got sprite url from response
    //need to also make ajax to sprite url to get actual image url
    url = response.sprites[0].resource_uri;
    $.ajax({
      url: 'http://pokeapi.co'+url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      //got the image url, use in image html tag
      url= 'http://pokeapi.co'+response.image;
      $('#pokemonSprite').attr("src", url);
    }).fail(function(){
      alert("Transaction Failed");
    })
  }).fail(function(){
    alert("Transaction Failed");
  })
}
