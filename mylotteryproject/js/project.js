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

  //document.getElementById("geo").innerHTML = strReverseGeoURL;


  //Get JSON from google api
  $.getJSON(strReverseGeoURL, function(thedata) {

    var sgeoState = thedata.results[0].address_components[4].long_name;
    document.getElementById("selState").value = sgeoState;
    document.getElementById("geo").innerHTML = "Someplace in " + sgeoState;

    // for (i=0; i < thedata.length; i++) {
    //
    //     console.log(typeof(thedata[i]));
    //
    // }

    //thedata.foreach(function(showdata) {
      //
      //  if (showdata.length > 0) {
      //   console.log(showdata);
      //
      // }
      //
      // console.log(showdata);
      // showdata = results.address_components;
      // // document.getElementById("geo").innerHTML = thedata.results.address_components[1].long_name;
      // var state = showdata[1].long_name;
      // console.log(state);

    //});

 });

}




















function findGames(sVal) {
  //do this when state changed

}


function showGameSlots () {
  // this function will display the appropriate input boxes to generate match query
  // based on the values retrieved from the database using the state and game select boxes
}
