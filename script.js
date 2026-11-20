const targetLatitude = 40.692805;
const targetLongitude = -73.987728;
const unlockDistance = 80;

const button = document.querySelector("#locationButton");
const message = document.querySelector("#message");
const coordinatesText = document.querySelector("#coordinates");
const distanceText = document.querySelector("#distance");
const treasureArea = document.querySelector("#treasureArea");

button.addEventListener("click", checkLocation);

function checkLocation() {
  if (!navigator.geolocation) {
    message.innerHTML = "Location is not supported by this browser.";
    return;
  }

  button.innerHTML = "SEARCHING...";

  navigator.geolocation.getCurrentPosition(showLocation, showError, {
    enableHighAccuracy: true
  });
}

function showLocation(position) {
  const userLatitude = position.coords.latitude;
  const userLongitude = position.coords.longitude;

  coordinatesText.innerHTML =
    "Latitude: " + userLatitude.toFixed(6) +
    "<br>Longitude: " + userLongitude.toFixed(6);

  const distance = getDistance(
    userLatitude,
    userLongitude,
    targetLatitude,
    targetLongitude
  );

  distanceText.innerHTML = Math.round(distance) + " meters away";
  button.innerHTML = "CHECK AGAIN";

  if (distance <= unlockDistance) {
    treasureArea.classList.add("found");
    message.innerHTML = "You found the treasure! ✦<br>Make one small wish.";
    distanceText.innerHTML = "Treasure unlocked at 370 Jay Street";
  } else if (distance <= 300) {
    message.innerHTML = "You are getting closer...";
  } else {
    message.innerHTML = "The treasure is still hiding. Keep walking!";
  }
}

function showError() {
  button.innerHTML = "TRY AGAIN";
  message.innerHTML = "Please allow location access to find the treasure.";
  coordinatesText.innerHTML = "";
}

function getDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371000;
  const latitudeDistance = toRadians(lat2 - lat1);
  const longitudeDistance = toRadians(lon2 - lon1);

  const a =
    Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(longitudeDistance / 2) * Math.sin(longitudeDistance / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

function toRadians(number) {
  return number * Math.PI / 180;
}
