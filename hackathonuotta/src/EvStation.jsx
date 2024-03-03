import React, { useState, useEffect } from "react";
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

import { getPlaceDetails } from "./api";

const EvStation = ({ lat, lng }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [stationPhoto, setStationPhoto] = useState(null);
  const [address, setAddress] = useState(null);
  const [stationName, setStationName] = useState(null);
  const [stationPhoneNumber, setStationPhoneNumber] = useState(null);
  const [stationOpeningHours, setStationOpeningHours] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const latlng = lat + "," + lng;
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

      setModalOpen(true);
    };

    fetchData();
  }, [lat, lng]);

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
