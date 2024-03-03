import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { getPlaceDetails } from "./api";
import { getRouteInfo } from "./api";
import { carInformation } from "./constants";

const EvStation = ({
  destLat,
  destLng,
  sourceLat,
  sourceLng,
  temperature,
  carModel,
  percentage,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [stationPhoto, setStationPhoto] = useState(null);
  const [address, setAddress] = useState(null);
  const [stationName, setStationName] = useState(null);
  const [stationPhoneNumber, setStationPhoneNumber] = useState(null);
  const [stationOpeningHours, setStationOpeningHours] = useState(null);
  const [remainingRange, setRemainingRange] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const latlng = destLat + "," + destLng;
      const placeDetails = await getPlaceDetails(latlng);

      setStationName(placeDetails.name);
      setStationPhoto(placeDetails.photo);
      setAddress(placeDetails.address);
      setStationPhoneNumber(placeDetails.phoneNumber);
      if (placeDetails.openingHours) {
        const todayDate = new Date();
        setStationOpeningHours(
          placeDetails.openingHours[(todayDate.getDay() + 6) % 7]
        );
      }

      if (carModel) {
        const carInfoIndex = carInformation.findIndex(
          (car) => car.modelName === carModel
        );
        const batteryCapacity = carInformation[carInfoIndex].batteryCapacity;
        const powerOutput = carInformation[carInfoIndex].powerOutput;
        const routeInfo = await getRouteInfo(
          sourceLat,
          sourceLng,
          destLat,
          destLng
        );

        const currentRange = batteryCapacity * powerOutput * (percentage / 100);
        const justDrivingJourney = routeInfo.timeHour * powerOutput;
        let totalRangeConsumed = justDrivingJourney;

        if (temperature === "Hot") {
          totalRangeConsumed += 0.125 * 5;
        } else if (temperature === "Cold") {
          totalRangeConsumed += 0.095 * 5;
        }
        setRemainingRange(currentRange - totalRangeConsumed);
      }

      setModalOpen(true);
    };

    fetchData();
  }, [destLat, destLng]);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Dialog
      hideBackdrop
      disableEnforceFocus
      style={{
        width: "400px",
      }}
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      disableBackdropClick
      disableScrollLock={true}
    >
      {stationPhoto && (
        <img
          style={{
            width: "100%",
            maxHeight: "150px",
            objectFit: "cover",
          }}
          src={stationPhoto}
          alt="station"
        />
      )}
      <DialogTitle id="Ev-station-title">{stationName}</DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <LocationOnIcon style={{ marginRight: "5px" }} />
          {address}
        </DialogContentText>
        {stationPhoneNumber && (
          <DialogContentText
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <LocalPhoneIcon style={{ marginRight: "5px" }} />
            {stationPhoneNumber}
          </DialogContentText>
        )}

        {stationOpeningHours && (
          <DialogContentText
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <AccessTimeIcon style={{ marginRight: "5px" }} />
            {stationOpeningHours}
          </DialogContentText>
        )}
        {remainingRange && (
          <DialogContentText>
            You will have {remainingRange.toFixed(2)}km of range left when you
            reach here
          </DialogContentText>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EvStation;
