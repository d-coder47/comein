import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { useTheme } from "@mui/material";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

const center = [16.890455072287708, -24.98754235360934];

function LocationMarker({ handlePositionChange }) {
  useMapEvents({
    click(location) {
      if (location?.latlng) {
        handlePositionChange(location?.latlng);
        // handlePositionChange({ ...location?.latlng, local: "" });
      }
    },
  });

  return null;
}

function LeafletControlGeocoder({ handlePositionChange }) {
  const map = useMap();

  useEffect(() => {
    var geocoder = L.Control.Geocoder.nominatim();
    if (typeof URLSearchParams !== "undefined" && location.search) {
      var params = new URLSearchParams(location.search);
      var geocoderString = params.get("geocoder");
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn("Unsupported geocoder", geocoderString);
      }
    }

    L.Control.geocoder({
      query: "",
      placeholder: "Pesquise seu local...",
      defaultMarkGeocode: false,
      geocoder,
    })
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        handlePositionChange({ ...latlng, local: e?.geocode?.name });
      })
      .addTo(map);
  }, []);

  return null;
}

export default function LocationMap({ currentLocation, handlePositionChange }) {
  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{
        width: "100%",
        height: "inherit",
      }}
    >
      <LeafletControlGeocoder handlePositionChange={handlePositionChange} />
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=4d3lGy6vTvjGNu72qBIK"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />

      <LocationMarker handlePositionChange={handlePositionChange} />
      {/* {markerToDisplay === "custom-marker" && currentLocation?.lat !== null ? ( */}
      {currentLocation?.lat !== null ? (
        <Marker
          position={{ lat: currentLocation?.lat, lng: currentLocation?.lng }}
        >
          <Popup> {currentLocation?.local || "Local do Evento"} </Popup>
        </Marker>
      ) : null}
    </MapContainer>
  );
}
