// Pseudo Begin
//
// - Page loads
// - Geo location logic tries to determine state select box automatically and toggles it selected.  Call made to database, which returns applicable games based on selected US state
// - select box dynamically populated with games applicable to state once state selected
// - most recently available draw results for that game and state are also returned
// - input boxes dynamically generated based on game selected
//
var strErr;
var strReverseGeo;
var oPosData;
// var outpDiv = document.getElementById("geo");

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
    strReverseGeo = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyAgKrWUdpQ-aAa-UiI-3mPZ2H7Fl1OP1kU";

   oPosData = $.get(strReverseGeo);

// document.getElementById("geo").innerHTML = strReverseGeo;

return;

// alert(oPosData.results.address_components[4].longname);
}

function findGames(sVal) {
//do this when state changed

}
