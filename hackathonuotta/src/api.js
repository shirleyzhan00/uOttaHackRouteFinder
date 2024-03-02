import axios from "axios";

const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

const getPlacePhoto = async (photoReference) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`
  );
  return response.data;
};

const getPlaceDetails = async (latitude, longitude) => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&key=${apiKey}`
    );
    return response.data;
  };
  
export { getPlacePhoto, getPlaceDetails };