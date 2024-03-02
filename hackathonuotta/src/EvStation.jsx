import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const EvStation = () => {
    const evStationInfo = {name : 'station one', address: 'Bikini Bottom', connectionInfo: [{name: 'connectionName', plugs: [{name: "plug1", charge :'50kW'},{name: "plug1", charge :'50kW'} ]
    }], image: "url", phoneNumber: '123456789', openingHours: '6:00AM - 9:00PM',  }
    const [modalOpen, setModalOpen] = useState(false);

    const handleClick = () => {
        setModalOpen(true);
    }
    
    const handleClose = () => {
        setModalOpen(false);
    }
    return (
        <Box>
 
                <Button variant="outlined" onClick={handleClick}>open me</Button>
          
        <Dialog
        hideBackdrop
        disableEnforceFocus
        style={{ position: 'initial', width : "300px" }}
        open={modalOpen}
        aria-labelledby="dialog-title"
        disableBackdropClick
        disableScrollLock={true}
       
      >
       <img
      style={{ maxWidth: "200px", maxHeight: '150px'}}
      src="https://images.unsplash.com/photo-1565992441121-4367c2967103"
      alt="station"
    />
        <DialogTitle id="Ev-station-title">{evStationInfo.name}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ display: 'flex', alignItems: 'center', marginBottom: '10px'  }}>
          <LocationOnIcon style={{ marginRight: '5px'}} />
            {evStationInfo.address}
          </DialogContentText>

          <DialogContentText style={{ display: 'flex', alignItems: 'center', marginBottom: '10px'  }}>
    <LocalPhoneIcon style={{ marginRight: '5px' }} />
    {evStationInfo.phoneNumber}
</DialogContentText>

          <DialogContentText style={{ display: 'flex', alignItems: 'center', marginBottom: '10px'  }}>
          <AccessTimeIcon style = {{marginRight: '5px'}}/>
            {evStationInfo.openingHours}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          
        </DialogActions>
      </Dialog>
      </Box>
    )
}

export default EvStation;