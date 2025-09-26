// src/components/Map/Map.js
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Fix default marker icons (React-Leaflet v4 + Leaflet 1.9)
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
import GeoCoderMarker from "../GeoCoderMarker/GeoCoderMarker";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl: iconUrl,
  shadowUrl: iconShadowUrl,
});

const Map = ({ address, city, country }) => {
  const fullAddress = `${address} ${city} ${country}`;

  return (
    <MapContainer
      center={[53.35, 18.8]} // initial center
      zoom={4}
      scrollWheelZoom={true}
      style={{ height: "40vh", width: "100%", marginTop: "20px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoCoderMarker address={fullAddress} />
    </MapContainer>
  );
};

export default Map;
