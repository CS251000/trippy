import { FaTrash } from "react-icons/fa";

const DeleteItineraryItem = ({itemId, date, setItinerary}) => {
    function propagateDeleteItem(itemId) {
        setItinerary((itinerary) => ({
            ...itinerary,
            [date]: itinerary[date].filter((i) => i.id !== itemId),
        }))
    }

    async function handleDelete() {
        const body = {
            itemId,
        };
        try {
            const response = await fetch("/api/delete-item-in-itinerary", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    propagateDeleteItem(itemId);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <FaTrash
            className="cursor-pointer text-red-500 hover:text-red-700"
            onClick={handleDelete}
        />
    );
};

export default DeleteItineraryItem;
