import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { getPlaceDetails } from "./api";

const EvStation = () => {
  const evStationInfo = {
    chargingStationLocation: {
      latitude: 45.42985933703672,
      longitude: -75.69133986882008,
    },
    chargingConnections: [
      {
        facilityType: "Charge_380_to_480V_3_Phase_at_32A",
        plugType: "NEMA_5_20",
      },
      {
        facilityType: "Charge_Direct_Current_at_50kW",
        plugType: "IEC_62196_Type_2_Outlet",
      },
    ],
    image: "url",
    phoneNumber: "123456789",
    openingHours: "6:00AM - 9:00PM",
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
        style={{ position: "initial", width: "400px" }}
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
        <DialogTitle>Connection Information</DialogTitle>

        <Box style={{ width: "300px", maxHeight: "200px", overflowY: "auto" }}>
          {evStationInfo.chargingConnections.map((connection, index) => (
            <Card key={index} style={{ margin: "10px" }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Facility Type
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {connection.facilityType.replace(/_/g, " ")}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ marginTop: "10px" }}
                >
                  Plug Type
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {connection.plugType.replace(/_/g, " ")}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

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
