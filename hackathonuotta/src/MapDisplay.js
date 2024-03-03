import React, { useState, useEffect } from "react";
import EvStation from "./EvStation";

const MapDisplay = ({ sourceAddress, destAddress, temperature, carModel, percentage }) => {
  const [map, setMap] = useState(null);
  const [sourceMarker, setSourceMarker] = useState(null);
  const [destMarker, setDestMarker] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routePoints, setRoutePoints] = useState([]);
  const [clickedMarker, setClickedMarker] = useState(null);

  useEffect(() => {
    
    if (window.google && !map) {
      const mapOptions = {
        center: { lat: 0, lng: 0 },
        zoom: 1,
      };
      const newMap = new window.google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );
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
          const route = result.routes[0];
          const points = route.overview_path;
          const stepDistance = 3000;
          let nextStepDistance = stepDistance;
          let currentStepIndex = 0;
          let routePoints = [];
          let currentDistance = 0;

          while (currentStepIndex < points.length - 1) {
            const currentPoint = points[currentStepIndex];
            const nextPoint = points[currentStepIndex + 1];
            const stepDistance =
              window.google.maps.geometry.spherical.computeDistanceBetween(
                currentPoint,
                nextPoint
              );
            currentDistance += stepDistance;

            if (currentDistance >= nextStepDistance) {
              const heading =
                window.google.maps.geometry.spherical.computeHeading(
                  currentPoint,
                  nextPoint
                );
              const remainingDistance = currentDistance - nextStepDistance;
              const newPoint =
                window.google.maps.geometry.spherical.computeOffset(
                  currentPoint,
                  remainingDistance,
                  heading
                );
              routePoints.push(newPoint);
              nextStepDistance += stepDistance;
            }

            currentStepIndex++;
          }

          setRoutePoints(routePoints);

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

  useEffect(() => {
    if (map && routePoints.length > 0) {
      const service = new window.google.maps.places.PlacesService(map);
      routePoints.forEach((point) => {
        service.nearbySearch(
          {
            location: point,
            radius: 100,
            keyword: "charging",
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              results.forEach((place) => {
                const marker = new window.google.maps.Marker({
                  position: point,
                  map: map,
                  icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                  },
                });

                marker.addListener("click", () => {
                  setClickedMarker(point);
                });
              });
            }
          }
        );
      });
    }
  }, [map, routePoints]);

  return (
    <>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
      {clickedMarker && sourceMarker && (
        <EvStation
          destLat={clickedMarker.lat()}
          destLng={clickedMarker.lng()}
          sourceLat={sourceMarker.getPosition().lat()}
          sourceLng={sourceMarker.getPosition().lng()}
          temperature = {temperature}
          carModel = {carModel}
          percentage = {percentage}
        />
      )}
    </>
  );
};

export default MapDisplay;
