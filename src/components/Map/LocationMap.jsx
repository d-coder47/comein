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
import { useMediaQuery, useTheme } from "@mui/material";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const center = [16.890455072287708, -24.98754235360934];

function LocationMarker({ handlePositionChange }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(location) {
      console.log(location);
      if (location?.latlng) {
        setPosition(location?.latlng);
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
  const theme = useTheme();
  // const extraSmallToSmall = useMediaQuery(
  //   theme.breakpoints.between("xs", "sm")
  // );
  // const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
  // const MidToLarge = useMediaQuery(theme.breakpoints.between("md", "lg"));
  // const LargeToExtraLarge = useMediaQuery(
  //   theme.breakpoints.between("lg", "xl")
  // );

  // const height = extraSmallToSmall
  //   ? "70%"
  //   : smallToMid
  //   ? "75%"
  //   : MidToLarge
  //   ? "80%"
  //   : LargeToExtraLarge
  //   ? "80%"
  //   : "80%";

  const { height: h } = useWindowDimensions();

  const height =
    h > 1339
      ? "80%"
      : h > 1079
      ? "84%"
      : h > 999
      ? "83%"
      : h > 899
      ? "82%"
      : h > 799
      ? "78%"
      : h > 699
      ? ""
      : h > 599
      ? "75%"
      : "70%";

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{
        width: "100%",
        height,
      }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=4d3lGy6vTvjGNu72qBIK"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />

      <LocationMarker handlePositionChange={handlePositionChange} />
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
