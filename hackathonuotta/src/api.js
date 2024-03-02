import axios from "axios";

const apiKey = "";

const getPlacePhoto = async (photoReference) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`
  );
  return response.data;
};

const getPlaceDetails = async (latlng) => {
    const addressResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${apiKey}`
    )
    const address = addressResponse.data.results[0].formatted_address;
    const place_id = addressResponse.data.results[0].place_id;
    const placeResponse = await axios.get(`http://localhost:3001/place-details?place_id=${place_id}`);

    const photoReference = placeResponse.data.result.photos[0].photo_reference;


    console.log('response', placeResponse)

    const response = await axios.get(
        `http://localhost:3001/place-photos?photoReference=${photoReference}`
      );
      return response;
  };
  
export { getPlacePhoto, getPlaceDetails };