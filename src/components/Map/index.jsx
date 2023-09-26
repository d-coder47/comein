import React from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import musicIcon from "../../assets/svg/musica.svg";
import { statesData } from "./data";
import teatroIcon from "../../assets/svg/teatro.svg";

const center = [16.896426314126867, -24.988609308850506];
const center1 = [16.87965920177269, -24.990839680879148];

export default function Leaflet() {
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
        url="https://api.maptiler.com/mapas/basic-v2/256/{z}/{x}/{y}.png?key=OTtqlD9QwRDVVCM6n26U"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />

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

      <Marker position={center}>
        {/* Optionally, you can add a Popup component to display additional information */}
        <Popup> Test </Popup>
      </Marker>
      {/*
            <Marker position={center1} icon={customIcon}>
                <Popup>  Event test 2 - theatre </Popup>
            </Marker>

            */}
    </MapContainer>
  );
}
