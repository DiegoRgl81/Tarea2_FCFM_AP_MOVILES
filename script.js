
var nextPage = "";
var lastPage = "";
var currentApiURL = "";

function next() {
  currentApiURL = nextPage;
  FindPokemon();

}

function back() {
  currentApiURL = lastPage;
  FindPokemon();

}

function search() {
  currentApiURL = "https://pokeapi.co/api/v2/pokemon-species";
  FindPokemon();

}

function FindPokemon() {

  document.getElementById("results").innerHTML = "";
  debugger;

  var data = undefined;
  var request = new XMLHttpRequest();
  request.open('GET', currentApiURL, true);
  request.send();

  request.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      debugger;

      var resultRawData = this.response;
      data = JSON.parse(resultRawData);
      showApiData(data);

    }

  }

}


function showApiData(data) {

  var element = document.getElementById("results");
  var countingHtml = document.createElement('h4');
  countingHtml.style.color = "white";
  countingHtml.innerHTML = "Pokemones: " + data.count;
  element.appendChild(countingHtml);



  for (var i = 0; i < data.results.length; i++) {

    var currentItem = data.results[i];
    var personaje = document.createElement('h5');
    personaje.style.color = "white";
    
    var htmlStyle = "<hr/ ><strong>" + currentItem.name + "</strong><br />";

    //Obtencion de la URL de la API especifica
    //htmlStyle += currentItem.url;
    var data1 = undefined;
    var request = new XMLHttpRequest();

    var currentSpeciesURL = currentItem.url;

    request.open('GET', currentSpeciesURL, true);
    request.send();

    request.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {
        debugger;

        var resultRawData = this.response;
        data1 = JSON.parse(resultRawData);
        htmlStyle += "Capture rate: " + data1.capture_rate;
        //mostrar en consola si obtiene los datos de la segunda API
        console.log(data1.capture_rate);
      }

    }

    personaje.innerHTML = htmlStyle;
    document.getElementById('results').appendChild(personaje);

  }



  debugger;
  if (data.next != null) {
    debugger;
    document.getElementById("buttonNext").style.display = "inline";
    nextPage = data.next
  }
  else {
    document.getElementById("buttonNext").style.display = "none";
  }

  if (data.previous != null) {
    debugger;
    document.getElementById("buttonBack").style.display = "inline";
    lastPage = data.previous;
  }
  else {
    document.getElementById("buttonBack").style.display = "none";
  }

}
