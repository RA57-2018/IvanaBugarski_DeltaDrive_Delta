import L from 'leaflet';

export const DefaultMarkerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
  iconSize: [30, 40],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

export const VehicleMarkerIcon = L.icon({
  iconUrl: 'https://www.gripsport.com.au/wp-content/uploads/2017/10/vehicle-icon-300x300.png',
  iconSize: [30, 40],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

export const RedMarkerIcon = new L.Icon({
  iconUrl: 'https://static.vecteezy.com/system/resources/thumbnails/017/178/337/small/location-map-marker-icon-symbol-on-transparent-background-free-png.png',
  iconSize: [30, 40],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});
