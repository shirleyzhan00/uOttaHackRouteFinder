import React, { useState, useEffect } from "react";

const MapDisplay = ({ sourceAddress, destAddress }) => {
    const [map, setMap] = useState(null);
    const [sourceMarker, setSourceMarker] = useState(null);
    const [destMarker, setDestMarker] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);

    useEffect(() => {
        if (window.google && !map) {
            const mapOptions = {
                center: { lat: 0, lng: 0 },
                zoom: 1,
            };
            const newMap = new window.google.maps.Map(document.getElementById("map"), mapOptions);
            setMap(newMap);
            setDirectionsService(new window.google.maps.DirectionsService());
            setDirectionsRenderer(new window.google.maps.DirectionsRenderer());
        }
    }, [map]);

    useEffect(() => {
        if (map && sourceAddress) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: sourceAddress }, (results, status) => {
                if (status === "OK" && results[0]) {
                    const location = results[0].geometry.location;
                    map.setCenter(location);
                    if (sourceMarker) {
                        sourceMarker.setMap(null);
                    }
                    const newSourceMarker = new window.google.maps.Marker({
                        position: location,
                        map: map,
                        title: "Source Location",
                    });
                    setSourceMarker(newSourceMarker);
                }
            });
        }
    }, [map, sourceAddress]);

    useEffect(() => {
        if (map && destAddress) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: destAddress }, (results, status) => {
                if (status === "OK" && results[0]) {
                    const location = results[0].geometry.location;
                    map.setCenter(location);
                    if (destMarker) {
                        destMarker.setMap(null);
                    }
                    const newDestMarker = new window.google.maps.Marker({
                        position: location,
                        map: map,
                        title: "Destination Location",
                    });
                    setDestMarker(newDestMarker);
                }
            });
        }
    }, [map, destAddress]);

    useEffect(() => {
        if (directionsService && directionsRenderer && sourceMarker && destMarker) {
            const request = {
                origin: sourceMarker.getPosition(),
                destination: destMarker.getPosition(),
                travelMode: "DRIVING",
            };
            directionsService.route(request, (result, status) => {
                if (status === "OK") {
                    directionsRenderer.setDirections(result);
                    directionsRenderer.setMap(map);
                    const bounds = new window.google.maps.LatLngBounds();
                    bounds.extend(sourceMarker.getPosition());
                    bounds.extend(destMarker.getPosition());
                    map.fitBounds(bounds);
                }
            });
        }
    }, [directionsService, directionsRenderer, sourceMarker, destMarker]);

    return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default MapDisplay;
