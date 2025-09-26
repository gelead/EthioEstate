import React, { useState, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { geocode } from "esri-leaflet-geocoder";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!address) return;

    geocode()
      .text(address)
      .run((err, results) => {
        if (err) {
          console.error("Geocoding error:", err);
          return;
        }

        if (results?.results?.length > 0) {
          const { lat, lng } = results.results[0].latlng;
          setPosition([lat, lng]);
          map.setView([lat, lng], 6);
        }
      });
  }, [address, map]);

  if (!position) return null;

  return (
    <Marker position={position}>
      <Popup>{address}</Popup>
    </Marker>
  );
};

export default GeoCoderMarker;
