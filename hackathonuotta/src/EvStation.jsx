import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { getPlaceDetails, getRouteInfo } from "./api";

const EvStation = () => {
  const evStationInfo = {
    chargingStationLocation: {
      latitude: 45.42202882338327,
      longitude: -75.69767989999454,
    },
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [stationPhoto, setStationPhoto] = useState(null);
  const [address, setAddress] = useState(null);
  const [stationName, setStationName] = useState(null);
  const [stationPhoneNumber, setStationPhoneNumber] = useState(null);
  const [stationOpeningHours, setStationOpeningHours] = useState(null);

  const handleClick = async () => {
    const latlng =
      evStationInfo.chargingStationLocation.latitude +
      "," +
      evStationInfo.chargingStationLocation.longitude;

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

    getRouteInfo(
      45.42202882338327,
      -75.69767989999454,
      45.42542224499664,
      -75.68866422246816
    );
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <Box style={{ display: "flex" }}>
      <Button variant="outlined" onClick={handleClick}>
        open me
      </Button>

      <Dialog
        hideBackdrop
        disableEnforceFocus
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "400px",
          transform: "translateY(0)",
        }}
        open={modalOpen}
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
        </DialogContent>
        <DialogTitle>Trip Information</DialogTitle>
        <DialogContent>You still have {} of range left</DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EvStation;
