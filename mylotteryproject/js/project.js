// ***** Begin Pseudo ******
//
// - Page loads
// - Geo location logic tries to determine state select box automatically and toggles.  Call made to database, which returns appropriate games available based on selected US state and populates second select box
// - most recently available draw results for that game and state are also returned
// - input boxes dynamically generated based on game selected and game properties pull from db
// - limits set for input boxes based on game properties

// ***** End Pseudo ******

var strErr;
var strGamesMasterURL = "/mylotteryproject/data/vgamesmaster.json";
var StrStateDataURL = "/mylotteryproject/data/vStates.json";
var tempState;
var gamesHTTP = new XMLHttpRequest();
var gamesMaster = new XMLHttpRequest();
var arrStateJSON;
var arrGameIDs;

//var oStateJSON;

$(function() {    /// Begin-load js first

});   /// End-load js first

function getLocation() {
  if (navigator.geolocation) {
    var oGeo = navigator.geolocation.getCurrentPosition(storePosition);
    return;
  } else {
    strErr = "Unable to determine location.  Using default.";
  }
}

function storePosition(myposition) {
  var lat = myposition.coords.latitude;
  var lon = myposition.coords.longitude;
  var strState;
  var strReverseGeoURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyAgKrWUdpQ-aAa-UiI-3mPZ2H7Fl1OP1kU";


  //Get JSON from google api
  $.getJSON(strReverseGeoURL, function(thedata) {
    var sgeoState = thedata.results[0].address_components[4].long_name;
    tempState = sgeoState;
    document.getElementById("selState").value = sgeoState;
    document.getElementById('sState').innerHTML = '  [' + sgeoState + ']';    // notify search state
    document.getElementById('sQueryTxt').style.visibility = 'visible';

  }).done(function() {

    popStateGames(tempState);

  });

}   //  End storePosition Function


function getStateGamesData() {
  gamesHTTP.onreadystatechange = function() {
    if (gamesHTTP.readyState == 4 && gamesHTTP.status == 200) {
      arrStateJSON = JSON.parse(gamesHTTP.responseText);
    }
  };  //  End getStateGamesData


  gamesHTTP.open("GET", StrStateDataURL, true);
  gamesHTTP.send();

} //  End populateGames function

getStateGamesData();

function popStateGames(pState) {
  //  Do this to return listing of games and populate select box
  console.log("Populating Games for:  " + pState);
    document.getElementById('debugger').innerHTML = ("arrStateJSON is an " + typeof(arrStateJSON) + " of length " +  arrStateJSON.length);

  //  iterate through array and find key value match for state
  $.each(arrStateJSON, function(objs){
      for(i=0; i < arrStateJSON.length; i++) {
          //console.log($.isArray(arrStateJSON[i]));

           if (arrStateJSON[i].StateName === pState) {
              arrGameIDs = arrStateJSON[i].stateGameIDs;
              console.log(arrGameIDs);
              //return;
             }
      } //  End for

  });

  arrGameIDs.replace("[","");
  arrGameIDs.replace("]");
//console.log($.isArray(arrGameIDs));
console.log(typeof(arrGameIDs));

  for(j=0; j < arrGameIDs.length; j++) {
    //  get game names of every game id
    getGameName(arrGameIDs[i]);
  } //  End For

}   //  End popStateGames function


function getGameName(gameID) {
  console.log("Getting properties for:  " + gameID);
}







//  Take game ID's and populate select box
$.getJSON(strGamesMasterURL, function(thedata) {
}).done(function() {
});


function getMasterGameList(pState) {
  // Return the properties of a particular game
  gamesMaster.onreadystatechange = function() {
       if (gamesMaster.readyState == 4 && gamesMaster.status == 200) {

       }
     gamesMaster.open("GET", strGamesMasterURL, true);
     gamesMaster.send();



};  //  End getGameProperties







  document.getElementById('sQueryTxt').style.visibility = 'visible';

}   //  End getGameProperties function



function showGameChutes (pGmID) {
  // this function will display the appropriate input boxes to generate match query
  // based on the slot count value


}   //  end showGameChutes function


function findMatch(arrNumber, iGameID) {
  //  Given an array of numbers and a game id parameter, search
  //  for matches in appropriate json



}
