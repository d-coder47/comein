import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";

const center = [16.890455072287708, -24.98754235360934];

function LocationMarker({ handlePositionChange, handleFullPositionChange }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(location) {
      console.log(location);
      if (location?.latlng) {
        setPosition(location?.latlng);
        handleFullPositionChange(location?.latlng);
        handlePositionChange(location?.latlng);
      }
      // map.locate();
    },
    // locationfound(e) {
    //   setPosition(e.latlng);
    //   map.flyTo(e.latlng, map.getZoom());
    // },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>O local do seu evento</Popup>
    </Marker>
  );
}

export default function LocationMap({ currentLocation, handlePositionChange }) {
  const [position, setPosition] = useState(null);
  console.log({ currentLocation, position });
  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ width: "100%", height: "70%" }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=4d3lGy6vTvjGNu72qBIK"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />

      <LocationMarker
        handlePositionChange={handlePositionChange}
        handleFullPositionChange={(val) => setPosition(val)}
      />
      {currentLocation?.lat !== null ? (
        <Marker
          position={{ lat: currentLocation?.lat, lng: currentLocation?.lng }}
        >
          <Popup> Test </Popup>
        </Marker>
      ) : null}
    </MapContainer>
  );
}
