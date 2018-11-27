const URL = "/data/peta.json";
let places = []

function findLocation(x, y) {
    for (var i = 0; i < places.length; i++) {
        if (places[i].lokasi[0] == x && places[i].lokasi[1] == y) {
            return i;
        }
    }
    return -1;
}

let gmb = document.getElementById("gmb");
let rev = document.getElementById("review");
let img = document.createElement('img');
let par = document.createElement('p');
img.style.cssText = 'width:400px;height:300px;margin:0px;'
gmb.appendChild(img);
rev.appendChild(par);

function showLocation(e) {
    let ix = findLocation(e.latlng.lat, e.latlng.lng);
    if (ix >= 0) {
        img.src = places[ix].gambar;
        par.textContent = places[ix].review;
    }
}

fetch(URL)
    .then(function (response) {
        if (response.status !== 200) {  //HTTP Status
            console.log('Ada masalah. Status Code: ' +
                response.status);
            return;
        }
        return response.json()
    })
    .then(resp => {
        loopPlaces(resp.places)
    })
    .catch(function (err) {
        console.log(err);
    });

function loopPlaces(plcs) {
    places = plcs
    for (var p of places) {
        var marker = L.marker(p.lokasi)
                        .addTo(mymap)
                        .bindPopup(p.sponsor);
        marker.on('click', showLocation);
    }
}

