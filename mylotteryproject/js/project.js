// ***** Begin Pseudo ******
//
// - Page loads
// - Geo location logic tries to determine state select box automatically and toggles.  Call made to database, which returns appropriate games available based on selected US state and populates second select box
// - most recently available draw results for that game and state are also returned
// - input boxes dynamically generated based on game selected and game properties pull from db
// - limits set for input boxes based on game properties

// ***** End Pseudo ******


$(function() {    /// Begin-load js first


var strErr;
var strReverseGeoURL;
var urlStateDataSrc;
var tempState;

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
      //console.log(typeof(sgeoState));
      document.getElementById("selState").value = sgeoState;
      //document.getElementById("geo").innerHTML = "Someplace in " + sgeoState;   // auto notify current state querrying
      document.getElementById('sState').innerHTML = '  [' + sgeoState + ']';    // notify search state
      document.getElementById('sQueryTxt').style.visibility = 'visible';

    }).done(function() {

        getStateGames(tempState);

    });

}   //  End storePosition Function


function getStateGames(pState) {
  console.log("populating games for state:  " + pState);
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
       document.getElementById("url").innerHTML = xhttp.responseText;


    }
  };


  xhttp.open("GET", "/mylotteryproject/data/vStates.json", true);
  xhttp.send();

  console.log(xhttp.responseText);

} //  End populateGames function




function listStateGames(pState) {
  // Do this to return listing of games

  //populateGames(populateGames(pState));

}   //  End listStateGames function



function getGameProperties(pState, pGameName) {
  // Return the properties of a particular game

  document.getElementById('sQueryTxt').style.visibility = 'visible';

}   //  End getGameProperties function



function showGameChutes (pGmID) {
  // this function will display the appropriate input boxes to generate match query
  // based on the slot count value


}   //  end showGameChutes function
