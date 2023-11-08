import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import musicIcon from "../../assets/svg/musica.svg";
import axiosInstance from "../../api/axiosInstance";
import { LocationOn } from "@mui/icons-material";
import { Box } from "@mui/material";

import L from "leaflet";
import { getItemIconByCategory } from "../../utils/map";

export default function Leaflet() {
  const [center, setCenter] = useState([
    16.890455072287708, -24.98754235360934,
  ]);
  const [coordinates, setCoordinates] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      return;
    }

    const getAllCoordinates = async () => {
      try {
        const response = await axiosInstance.get(
          `/localizacao/obterLocalizacoes`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response?.data?.dados) {
          return setCoordinates([]);
        }

        const filteredCoordinates = response?.data?.dados
          .filter((item) => item.latitude !== "null")
          .map((item) => {
            return {
              ...item,
              areas_culturais: item.areas_culturais.split(",")[0],
            };
          });

        setCoordinates(filteredCoordinates);
      } catch (error) {
        console.error(error);
        setCoordinates([]);
      }
    };

    getAllCoordinates();
    setCenter([userInfo?.latitude, userInfo?.longitude]);
  }, []);

  const getCustomIcon = (culturalArea) => {
    return L.icon({
      iconUrl: getItemIconByCategory(culturalArea),
      iconSize: [75, 75],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  };

  const styles = {
    popup: {
      textAlign: "center",
    },
  };

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
      {/* 
      <Marker position={center}>
        <Popup> Teste </Popup>
      </Marker> */}

      {coordinates?.map((item, index) => (
        // <Marker icon={iconPerson} position={[item?.latitude, item?.longitude]}>
        <Marker
          icon={getCustomIcon(item.areas_culturais)}
          key={index}
          position={[item?.latitude, item?.longitude]}
        >
          <Popup className={styles.popup}>
            {item?.titulo_publicacao}
            <br />
            <Box display="flex" justifyContent="center" alignItems="center">
              <LocationOn fontSize="1rem" /> {item?.nome}
            </Box>
          </Popup>
        </Marker>
      ))}

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
