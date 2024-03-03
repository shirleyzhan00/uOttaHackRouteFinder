import axios from "axios";

const apiKey = "";

const getPlaceDetails = async (latlng) => {
  const addressResponse = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${apiKey}`
  );
  console.log("address", addressResponse);
  let place_id;
  for (let i = 0; i < addressResponse.data.results.length; i++) {
    if (
      addressResponse.data.results[i].types.includes("establishment") ||
      addressResponse.data.results[i].types.includes("point_of_interest")
    ) {
      place_id = addressResponse.data.results[i].place_id;
      break;
    }
  }

  if (!place_id) {
    place_id = addressResponse.data.results[0].place_id;
  }
  console.log('place_id', place_id)

  const placeResponse = await axios.get(
    `http://localhost:3001/place-details?place_id=${place_id}`
  );
  console.log("place", placeResponse);

  const address = placeResponse.data.result.formatted_address
    ? placeResponse.data.result.formatted_address
    : null;

  const name = placeResponse.data.result.name
    ? placeResponse.data.result.name
    : null;

  let photoUrl = null;
  if (placeResponse.data.result.photos) {
    let photoReference = placeResponse.data.result.photos[0]?.photo_reference;
    photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  }

  let phoneNumber = placeResponse.data.result.formatted_phone_number
    ? placeResponse.data.result.formatted_phone_number
    : null;

  let openingHours = placeResponse.data.result.opening_hours?.weekday_text
    ? placeResponse.data.result.opening_hours.weekday_text
    : null;

  const placeDetails = {
    address: address,
    photo: photoUrl,
    name: name,
    phoneNumber: phoneNumber,
    openingHours: openingHours,
  };
  return placeDetails;
};

const getRouteInfo = async (sourceLat, sourceLng, destLat, destLng) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/route?sourceLat=${sourceLat}&sourceLng=${sourceLng}&destLat=${destLat}&destLng=${destLng}`
    );
    console.log("route", response);
    const routeData = {
      distanceMeters: response.data.routes[0].distance.value,
      timeHour: response.data.routes[0].duration.value / 3600,
    };
    return routeData;
  } catch (err) {
    console.error(err);
  }
};
export { getPlaceDetails, getRouteInfo };
