"use client";

import { useEffect, useRef } from "react";

export default function GoogleMapsAutocomplete({ onLocationSelect }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstance = useRef(null);
  const autocompleteInstance = useRef(null);
  const infoWindowRef = useRef(null);

  useEffect(() => {
    async function initMap() {
      if (typeof google !== "undefined") {
        // Import necessary libraries
        const [{ Map }, { AdvancedMarkerElement }, { Autocomplete }] = await Promise.all([
          google.maps.importLibrary("maps"),
          google.maps.importLibrary("marker"),
          google.maps.importLibrary("places"),
        ]);

        // Initialize the map only once
        if (!mapInstance.current) {
          mapInstance.current = new Map(mapRef.current, {
            center: { lat: 28.709933, lng: 77.1025 }, // Default center
            zoom: 8,
            mapId: "4504f8b37365c3d0",
            mapTypeControl: false,
          });
        }

        // Create marker and infoWindow
        if (!markerRef.current) {
          markerRef.current = new AdvancedMarkerElement({
            map: mapInstance.current,
          });
        }
        if (!infoWindowRef.current) {
          infoWindowRef.current = new google.maps.InfoWindow();
        }

        // Initialize autocomplete
        if (!autocompleteInstance.current) {
          const input = document.getElementById("place-autocomplete-input");
          autocompleteInstance.current = new Autocomplete(input);

          // Handle place selection
          autocompleteInstance.current.addListener("place_changed", () => {
            const place = autocompleteInstance.current.getPlace();

            if (!place.geometry) return; // Skip if no geometry

            // Extract and pass destination to parent
            const destination = `${place.name || ""}, ${place.formatted_address || ""}`;
            onLocationSelect(destination.trim());

            // Adjust map view
            if (place.geometry.viewport) {
              mapInstance.current.fitBounds(place.geometry.viewport);
            } else {
              mapInstance.current.setCenter(place.geometry.location);
              mapInstance.current.setZoom(17);
            }

            // Update marker position and info window
            markerRef.current.position = place.geometry.location;
            updateInfoWindow(
              `
                <div>
                  <strong>${place.name}</strong><br />
                  <span>${place.formatted_address}</span>
                </div>
              `,
              place.geometry.location
            );
          });
        }
      }
    }

    // Helper function to update the info window
    function updateInfoWindow(content, position) {
      infoWindowRef.current.setContent(content);
      infoWindowRef.current.setPosition(position);
      infoWindowRef.current.open({
        map: mapInstance.current,
        anchor: markerRef.current,
      });
    }

    initMap();
  }, [onLocationSelect]);

  return (
    <div>
      <input
        id="place-autocomplete-input"
        type="text"
        placeholder="Enter your Destination"
        className="w-full border p-2 m-2 rounded"
      />
      <div ref={mapRef} style={{ height: "30vh", width: "100%" }}></div>
    </div>
  );
}
