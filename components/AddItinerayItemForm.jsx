import React, { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import GoogleMapsAutocomplete from "./extras/MapsAutocomplete";
import { itineraryItemTypes } from "@/lib/constants";
import { useUser } from "@clerk/nextjs";
import "simplebar-react/dist/simplebar.min.css";
import {
    convertTo12HourFormat,
    sortBy12HourTime,
    combineDateAndTime,
    formatTimestamp,
} from "@/app/utils/util";

const AddItineraryItemForm = ({ date, tripId, setItinerary }) => {
    const { user } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [status, setStatus] = useState("");
    const modalRef = useRef(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setError(""); // Reset error message when modal is closed
    };

    const [formData, setFormData] = useState({
        title: "",
        cost: "",
        type: "",
        location: "",
        startTime: "",
        endTime: "",
        description: "",
    });

    useEffect(() => {
        if (status && modalRef.current) {
            modalRef.current.scrollTop = 0;
        }
    }, [status]);

    function propagateAddItem(item) {
        setItinerary((itinerary) => ({
            ...itinerary,
            [date]: [
                ...(itinerary[date] || []),
                {
                    ...item,
                    startTime: convertTo12HourFormat(item.startTime),
                    endTime: convertTo12HourFormat(item.endTime),
                },
            ],
        }));
        setItinerary((itinerary) => ({
            ...itinerary,
            [date]: sortBy12HourTime(itinerary[date]),
        }));
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { startTime, endTime } = formData;

        startTime = combineDateAndTime(date, startTime);
        endTime = combineDateAndTime(date, endTime);
        if (startTime && endTime && startTime > endTime) {
            setError("Start time cannot be later than end time.");
            return;
        }
        setDisableSubmit(true);
        try {
            const body = {
                tripId,
                userId: user.id,
                ...formData,
                startTime,
                endTime,
            };

            const response = await fetch("/api/add-item-to-itinerary", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setFormData({
                        title: "",
                        cost: "",
                        type: "",
                        location: "",
                        startTime: "",
                        endTime: "",
                        description: "",
                    });
                    propagateAddItem({
                        ...result.item[0],
                        startTime:
                            formatTimestamp(result.item[0].startTime)[1] ??
                            null,
                        endTime:
                            formatTimestamp(result.item[0].endTime)[1] ?? null,
                    });
                    setDisableSubmit(false);
                    closeModal();
                    return;
                }
            } else {
                const error = await response.json();
                console.log(error);
                setStatus(`Error: ${error.error}`);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setDisableSubmit(false);
        }
    };

    return (
        <div>
            <button
                onClick={openModal}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                + Add Item
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div
                    id="crud-modal"
                    aria-hidden="false"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
                >
                    <div
                        className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-md"
                        style={{ height: "80vh" }}
                        ref={modalRef}
                    >
                        <SimpleBar style={{ maxHeight: "100%" }}>
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Add an activity to your itinerary
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-900 rounded-lg"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {status && (
                                <div className="mb-4 p-3 text-white bg-red-300 border border-red-600 rounded">
                                    {status}
                                </div>
                            )}

                            {/* Modal Form */}
                            <form className="p-4" onSubmit={handleSubmit}>
                                {/* Error Message */}
                                {error && (
                                    <p className="text-red-5000 text-sm mb-4">
                                        {error}
                                    </p>
                                )}

                                {/* Name Input */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="title"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Title{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full p-2.5 text-sm text-gray-900 border rounded-lg bg-gray-50"
                                        placeholder="Enter title for the activity"
                                        required
                                    />
                                </div>

                                {/* Price Input */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="cost"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Cost{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="cost"
                                        id="cost"
                                        value={formData.cost}
                                        onChange={handleInputChange}
                                        className="w-full p-2.5 text-sm text-gray-900 border rounded-lg bg-gray-50"
                                        placeholder="100 (in $)"
                                        required
                                    />
                                </div>

                                {/* Category Select */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="type"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Type{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full p-2.5 text-sm text-gray-900 border rounded-lg bg-gray-50"
                                        required
                                    >
                                        <option value="">Select a type</option>
                                        {itineraryItemTypes.map(
                                            (type, index) => (
                                                <option
                                                    key={index}
                                                    value={type}
                                                >
                                                    {type}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                {/* Location Input */}
                                <label className="block text-gray-700 font-medium mb-2">
                                    Location
                                </label>
                                <GoogleMapsAutocomplete
                                    onLocationSelect={(location) =>
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            location,
                                        }))
                                    }
                                />

                                <div className="mb-4 flex justify-between">
                                    <div>
                                        <label
                                            className="block text-gray-700 font-medium mb-2"
                                            htmlFor="startTime"
                                        >
                                            Starts at{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="time"
                                            name="startTime"
                                            id="startTime"
                                            value={formData.startTime}
                                            onChange={handleInputChange}
                                            className="rounded p-2 border text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="mx-3">
                                        <label
                                            className="block text-gray-700 font-medium mb-2"
                                            htmlFor="endTime"
                                        >
                                            Ends at
                                        </label>
                                        <input
                                            type="time"
                                            name="endTime"
                                            id="endTime"
                                            value={formData.endTime}
                                            onChange={handleInputChange}
                                            className="rounded p-2 border text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Description Textarea */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="description"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full p-2.5 text-sm text-gray-900 border rounded-lg bg-gray-50"
                                        placeholder="Write description (optional)"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="primary-btn"
                                    disabled={disableSubmit}
                                >
                                    Add item
                                </button>
                                <button
                                    className="secondary-btn"
                                    disabled={disableSubmit}
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </form>
                        </SimpleBar>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddItineraryItemForm;
