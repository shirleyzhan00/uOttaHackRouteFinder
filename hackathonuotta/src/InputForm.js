import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  Slider,
  Typography,
} from "@mui/material";
import { carInformation } from "./constants";

const InputForm = ({
  setSourceAddress,
  setDestAddress,
  setTemp,
  setModel,
  setPercent,
}) => {
  const [sourceLocation, setSourceLocation] = useState("");
  const [destLocation, setDestLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [carModel, setCarModel] = useState("");
  const [batteryPercentage, setBatteryPercentage] = useState(50);

  const handleSourceLocationChange = (event) => {
    setSourceLocation(event.target.value);
  };

  const handleDestLocationChange = (event) => {
    setDestLocation(event.target.value);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  const handleCarModelChange = (event) => {
    setCarModel(event.target.value);
  };

  const handleBatteryPercentageChange = (event, newValue) => {
    setBatteryPercentage(newValue);
  };

  const handleConfirm = () => {
    setSourceAddress(sourceLocation);
    setDestAddress(destLocation);
    setTemp(temperature);
    setModel(carModel);
    setPercent(batteryPercentage);
  };

  const initAutocomplete = () => {
    const sourceAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("sourceLocation"),
      { types: ["geocode"] }
    );
    sourceAutocomplete.addListener("place_changed", () => {
      const place = sourceAutocomplete.getPlace();
      setSourceLocation(place.formatted_address);
    });

    const destAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("destLocation"),
      { types: ["geocode"] }
    );
    destAutocomplete.addListener("place_changed", () => {
      const place = destAutocomplete.getPlace();
      setDestLocation(place.formatted_address);
    });
  };

  React.useEffect(() => {
    if (window.google) {
      initAutocomplete();
    }
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Box>
        <Typography variant="h5" marginBottom = {1}>Address Information</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            id="sourceLocation"
            label="Source Location"
            value={sourceLocation}
            onChange={handleSourceLocationChange}
          />
          <TextField
            id="destLocation"
            label="Destination Location"
            value={destLocation}
            onChange={handleDestLocationChange}
          />
        </Box>
      </Box>
      <Box>
        <Typography variant="h5">Other Information</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Box>
            <Typography variant="subtitle1">Temperature:</Typography>
            <Select
              style={{ width: 200 }}
              value={temperature}
              onChange={handleTemperatureChange}
            >
              <MenuItem value="hot">Hot</MenuItem>
              <MenuItem value="cold">Cold</MenuItem>
              <MenuItem value="justRight">Just Right</MenuItem>
            </Select>
          </Box>
          <Box>
            <Typography variant="subtitle1">Car Model:</Typography>
            <Select
              style={{ width: 200 }}
              value={carModel}
              onChange={handleCarModelChange}
            >
              {carInformation.map((model) => (
                <MenuItem key={model.modelName} value={model.modelName}>
                  {model.modelName}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography variant="subtitle1">Battery Percentage:</Typography>
            <Slider
              label="Battery Percentage"
              value={batteryPercentage}
              onChange={handleBatteryPercentageChange}
              aria-labelledby="battery-percentage-slider"
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Box>
        </Box>
      </Box>
      <Button variant="contained" onClick={handleConfirm}>
        Confirm
      </Button>
    </Box>
  );
};

export default InputForm;
