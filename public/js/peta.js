const URL = "../data/peta.json";

function findLocation(x, y) {
    for (var i = 0; i < places.length; i++) {
        if (places[i].lokasi[0] == x && places[i].lokasi[1] == y) {
            return i;
        }
    }
    return -1;
}

function showLocation(e) {
    let ix = findLocation(e.latlng.lat, e.latlng.lng);
    if (ix >= 0) {
        img.src = places[ix].gambar;
        par.textContent = places[ix].review;
    }
}

let gmb = document.getElementById("gmb");
let rev = document.getElementById("review");
let img = document.createElement('img');
let par = document.createElement('p');
gmb.appendChild(img);
rev.appendChild(par);

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
        // let places = resp.places; localStorage.setItem('places', JSON.stringify(resp.places));
    })
    .catch(function (err) {
        console.log(err);
    });


// get parsed json
let places = JSON.parse(localStorage.getItem('places'));

function loopPlaces(places) {
    for (var p of places) {
        var marker = L.marker(p.lokasi)
                        .addTo(mymap)
                        .bindPopup(p.sponsor);
        marker.on('click', showLocation);
    }
}

