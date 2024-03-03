import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";

const InputForm = ({ setSourceAddress, setDestAddress }) => {
    const [sourceLocation, setSourceLocation] = useState("");
    const [destLocation, setDestLocation] = useState("");

    const handleSourceLocationChange = (event) => {
        setSourceLocation(event.target.value);
    };

    const handleDestLocationChange = (event) => {
        setDestLocation(event.target.value);
    };

    const handlePlaceSelect = (address, type) => {
        if (type === "source") {
            setSourceLocation(address);
            setSourceAddress(address);
        } else if (type === "dest") {
            setDestLocation(address);
            setDestAddress(address);
        }
    };

    const initAutocomplete = () => {
        const sourceAutocomplete = new window.google.maps.places.Autocomplete(
            document.getElementById("sourceLocation"),
            { types: ["geocode"] }
        );
        sourceAutocomplete.addListener("place_changed", () => {
            const place = sourceAutocomplete.getPlace();
            handlePlaceSelect(place.formatted_address, "source");
        });

        const destAutocomplete = new window.google.maps.places.Autocomplete(
            document.getElementById("destLocation"),
            { types: ["geocode"] }
        );
        destAutocomplete.addListener("place_changed", () => {
            const place = destAutocomplete.getPlace();
            handlePlaceSelect(place.formatted_address, "dest");
        });
    };

    React.useEffect(() => {
        if (window.google) {
            initAutocomplete();
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
    );
};

export default InputForm;
