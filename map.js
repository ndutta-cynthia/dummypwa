// Initialize and add the map
function initMap() {
    const location = { lat: 40.7128, lng: -74.0060 }; // Example: New York City
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: location,
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
}
