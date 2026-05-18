"use client";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

// IMPORTANT: SSR OFF for MapView
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

export default function MapModal({ onClose, onSelect }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <button onClick={onClose} style={styles.close}>
          ❌
        </button>

        <MapView onSelect={onSelect} />
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    zIndex: 1000,
  },
  box: {
    width: "100%",
    height: "100%",
    background: "white",
    position: "relative",
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 9999,
    fontSize: "20px",
    background: "white",
    border: "none",
    cursor: "pointer",
  },
};