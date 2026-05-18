

"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";


import { useState } from "react";
import MapModal from "./MapModal";

export default function LocationPicker() {
  const [openMap, setOpenMap] = useState(false);
  const [location, setLocation] = useState(null);

  // 1. CURRENT LOCATION
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      const address = await getAddress(lat, lng);

      setLocation({ lat, lng, address });
    });
  };

  // reverse geocode
  const getAddress = async (lat, lng) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    return data.display_name;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📍 Send Location</h2>

      <button onClick={getCurrentLocation}>
        Send Current Location
      </button>

      <br /><br />

      <button onClick={() => setOpenMap(true)}>
        Pick From Map
      </button>

      {location && (
        <div style={{ marginTop: 20 }}>
          <p><b>Lat:</b> {location.lat}</p>
          <p><b>Lng:</b> {location.lng}</p>
          <p><b>Address:</b> {location.address}</p>
        </div>
      )}

      {openMap && (
        <MapModal
          onClose={() => setOpenMap(false)}
          onSelect={async (lat, lng) => {
            const address = await getAddress(lat, lng);
            setLocation({ lat, lng, address });
            setOpenMap(false);
          }}
        />
      )}
    </div>
  );
}