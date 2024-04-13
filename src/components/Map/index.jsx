import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import axiosInstance from "../../api/axiosInstance";
import { LocationOn } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

import L from "leaflet";
import { getItemIconByCategory } from "../../utils/map";
import { useTranslation } from "react-i18next";

const CurrentLocation = () => {
  const map = useMap();
  const { t } = useTranslation();

  const [currentLocation, setCurrentLocation] = useState();

  const styles = {
    popup: {
      textAlign: "center",
    },
  };

  const getGeo = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        map.setView([position.coords.latitude, position.coords.longitude], 20);
      },
      (error) => {
        console.log(
          "--------- ERROR WHILE FETCHING LOCATION ----------- ",
          error
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <>
      {currentLocation && (
        <Marker position={[currentLocation.lat, currentLocation.lng]}>
          <Popup className={styles.popup}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <LocationOn fontSize="1rem" /> {t("mapa.localizacaoAtual")}
            </Box>
          </Popup>
        </Marker>
      )}

      <Button
        onClick={() => {
          getGeo();
        }}
        sx={{
          position: "absolute",
          top: "15px",
          right: "135px",
          zIndex: "10000",
          marginRight: "20px",
          height: "auto",
          backgroundColor: "#33B3CC",
          color: "white",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#743600", // Adjust the opacity or add more styles as desired
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <LocationOn fontSize="10rem" /> {t("mapa.localizacaoAtual")}
        </Box>
      </Button>
    </>
  );
};

export default function Leaflet() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [center, setCenter] = useState([
    16.890455072287708, -24.98754235360934,
  ]);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
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
              // Authorization: `Bearer ${token}`,
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

      {coordinates?.map((item, index) => (
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
      <CurrentLocation />
    </MapContainer>
  );
}
