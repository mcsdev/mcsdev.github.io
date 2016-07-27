// ***** Begin Pseudo ******
//
// - Page loads
// - Geo location logic tries to determine state select box automatically and toggles.  Call made to database, which returns appropriate games available based on selected US state and populates second select box
// - most recently available draw results for that game and state are also returned
// - input boxes dynamically generated based on game selected and game properties pull from db
// - limits set for input boxes based on game properties

// ***** End Pseudo ******

// do nothing until document loads completely
$(function() {


});

var strErr;
var strReverseGeoURL;

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

//  document.getElementById("url").innerHTML = strReverseGeoURL;


  //Get JSON from google api
  $.getJSON(strReverseGeoURL, function(thedata) {

    var sgeoState = thedata.results[0].address_components[4].long_name;

    //console.log(typeof(sgeoState));
    document.getElementById("selState").value = sgeoState;
    document.getElementById("geo").innerHTML = "Someplace in " + sgeoState;   // auto notify current state querrying
    document.getElementById('sState').innerHTML = '  [' + sgeoState + ']';    // notify search state
    document.getElementById('sQueryTxt').style.visibility = 'visible';


    populateGames();

  });








}










function populateGames(sState) {
  // return the names of the available games for state and
  // dynamically populate options for select list (selGame)
  //alert("games");

    alert("Populating...");

    var oFileHTTP = new XMLHttpRequest();
    var urlStateDataSrc = "/mylotteryproject/data/vStates.json";


    oFileHTTP.onreadystatechange = function() {
        if (oFileHTTP.readyState == 4 && oFileHTTP.status == 200) {
            var myArr = JSON.parse(oFileHTTP.responseText);
            myFunction(myArr);
        }
    };
    oFileHTTP.open("GET", urlStateDataSrc, true);
    oFileHTTP.send();


    function myFunction(arr) {
        var out = "";
        var i;
        for(i = 0; i < arr.length; i++) {
            out += '<a href="' + arr[i].url + '">' +
            arr[i].display + '</a><br>';
        }

       console.log(out);
    }











    //var sJSON = JSON.parse(stateData);

    console.log(JSON.stringify(stateDataSrc));
    $.getJSON(stateDataSrc, function(list) {

      document.getElementById("url").innerHTML = list;

  });
}


function listStateGames(sState) {
  // Do this to return listing of games
  alert("Finding games in:  " + sState);
  //populateGames();







}


function getGameProperties(sState, sGameName) {
  // Return the properties of a particular game

  document.getElementById('sQueryTxt').style.visibility = 'visible';

}

function showGameChutes (iGmID) {
  // this function will display the appropriate input boxes to generate match query
  // based on the slot count value
}
