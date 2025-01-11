import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";
import Pill from "../Pill";


export const itineraryItemColors = {
    Hotel: "pink",
    Travel: "blue",
    Food: "yellow",
    Sightseeing: "green",
    Adventure: "purple",
    Other: "gray",
};

const ItineraryItemTraveller = ({ item, date, setItinerary }) => {
    return (
        <div className={`itinerary-item ${item.type.toLowerCase()}`}>
            <div>
                <Image
                    src={item.image}
                    width={600}
                    height={50}
                    className="itinerary-image h-56"
                    alt="Itinerary Image"
                />

                <div className="flex justify-between items-center">
                    <Pill
                        color={`${itineraryItemColors[item.type]}`}
                        className="mx-4 mt-2"
                    >
                        {item.type}
                    </Pill>

                </div>
                <h3 className="text-sm font-semibold mt-2 mx-4">
                    {item.title}
                </h3>
                <div className="text-xs text-gray-600 mx-4">
                    {item.description}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600 p-2 mx-4 mt-2">
                    <span>
                        <strong>Start:</strong> {item.startTime}
                    </span>
                    <span>
                        <strong>End:</strong> {item.endTime}
                    </span>
                </div>

                <div className="flex items-center justify-start text-xs text-gray-600 p-2 mx-4 mt-2">
                    <HiLocationMarker className="text-green-500 mr-1" />
                    <span>{item.location}</span>
                </div>

                <div className="text-right text-xs text-gray-600 mx-4 mt-2">
                    <i>₹{item.cost}</i>
                </div>
            </div>
        </div>
    );
};

export default ItineraryItemTraveller;
