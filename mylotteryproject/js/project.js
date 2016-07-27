// ***** Begin Pseudo ******
//
// - Page loads
// - Geo location logic tries to determine state select box automatically and toggles.  Call made to database, which returns appropriate games available based on selected US state and populates second select box
// - most recently available draw results for that game and state are also returned
// - input boxes dynamically generated based on game selected and game properties pull from db
// - limits set for input boxes based on game properties

// ***** End Pseudo ******

var strErr;
var strReverseGeoURL;
var urlStateDataSrc;
var tempState;
var gamesHTTP = new XMLHttpRequest();
var oStateJSON;

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

  strReverseGeoURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyAgKrWUdpQ-aAa-UiI-3mPZ2H7Fl1OP1kU";

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
       document.getElementById("debugger").innerHTML = gamesHTTP.responseText;
    }
  };
  gamesHTTP.open("GET", "/mylotteryproject/data/vStates.json", true);
  gamesHTTP.send();


} //  End populateGames function

    getStateGamesData();
    // oStateJSON = gamesHTTP.responseText;
    // //alert(gamesHTTP.responseText);
    // console.log(typeof(oStateJSON));

function popStateGames(pState) {
  // Do this to return listing of games and populate select box
    console.log("Populating Games for:  " + pState);
    //console.log(typeof(gamesHTTP));
    //iterate through data and find key value match for state

    // $.each(gamesHTTP, function(i, v)  {
    //
    //     console.log(i.responseText);
    //     document.getElementById('debugger').innerHTML = i;
    //
    //
    //         //console.log("fired!");
    //
    //
    //
    // });



}   //  End popStateGames function



function getGameProperties(pState, pGameName) {
  // Return the properties of a particular game

  document.getElementById('sQueryTxt').style.visibility = 'visible';

}   //  End getGameProperties function



function showGameChutes (pGmID) {
  // this function will display the appropriate input boxes to generate match query
  // based on the slot count value


}   //  end showGameChutes function
