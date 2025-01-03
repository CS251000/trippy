import dotenv from "dotenv"

dotenv.config({path:'.env.local'});



export async function getTripImages(destination) {
  try {
    // Step 1: Search for the place using the Google Places API
    const placesResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const placesData = await placesResponse.json();

    if (placesData.results.length === 0) {
      throw new Error("No place found for the destination");
    }

    const placeId = placesData.results[0]?.place_id;
    // console.log("placeid",placeId);

    const detailsResponse = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName,photos&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const detailsData = await detailsResponse.json();
    // console.log("detailsdata",detailsData);

    const pid= detailsData.id;

    const pnames= detailsData.photos;
    return pnames;
    
    // const pname= detailsData.photos[0].name;
    // return `https://places.googleapis.com/v1/${pname}/media?maxHeightPx=1000&maxWidthPx=1000&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

   
  } catch (error) {
    console.error("Error fetching trip image:", error);
    return null;
  }
}
