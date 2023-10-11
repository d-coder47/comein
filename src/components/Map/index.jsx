import React, { useEffect, useState } from "react";
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
import musicIcon from "../../assets/svg/musica.svg";
import { statesData } from "./data";
import teatroIcon from "../../assets/svg/teatro.svg";

// const center = [16.890455072287708, -24.98754235360934];
// const center1 = [16.87965920177269, -24.990839680879148];

export default function Leaflet() {
  const [center, setCenter] = useState([
    16.890455072287708, -24.98754235360934,
  ]);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      return;
    }
    setCenter([userInfo?.latitude, userInfo?.longitude]);
  }, []);

  const customIcon = L.icon({
    iconUrl: musicIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ width: "100vw", height: "100vh" }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=4d3lGy6vTvjGNu72qBIK"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />

      {/* <LocationMarker /> */}

      <Marker position={center}>
        <Popup> Teste </Popup>
      </Marker>

      {/* 
                statesData.features.map((state)=>{
                    const coordinates = state.geometry.coordinates[0].map((item)=>[item[1], item[0]]);

                    return(<Polygon 
                        pathOptions={{
                            fillColor: '#FD8D3C',
                            fillOpacity: 0.7,
                            weight: 2,
                            opacity: 1,
                            dashArray: 3,
                            color: 'white'
                        }}

                        positions={coordinates}
                        eventHandlers={{
                           mouseover: (e) => {
                            const layer = e.target;
                            layer.setStyle({
                                fiilOpacity: 1,
                                weight: 5,
                                dashArray: "",
                                color: '#666',
                                fillColor: '#D45962'
                            });
                           },
                           mouseout: (e) => {
                            const layer = e.target;
                            layer.setStyle({
                                fiilOpacity: 0.7,
                                weight: 2,
                                dashArray: "3",
                                color: 'white',
                                fillColor: '#FD8D3C'
                            });
                           },
                           click: (e) => {
                           
                           }
                        }}
                    />)
                }) 
            
            */}
      {/*
            <Marker position={center1} icon={customIcon}>
                <Popup>  Event test 2 - theatre </Popup>
            </Marker>

            */}
    </MapContainer>
  );
}
