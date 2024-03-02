const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const apiKey = "";

app.get("/place-details", async (req, res) => {
  try {
    const { place_id } = req.query;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${place_id}&fields=opening_hours,name,formatted_address,place_id,formatted_phone_number,photo`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
