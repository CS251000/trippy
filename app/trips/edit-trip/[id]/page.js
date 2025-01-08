"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { tripTypesMap } from "@/lib/constants";
import GoogleMapsAutocomplete from "@/components/extras/MapsAutocomplete";
import { DatePickerWithRange } from "@/components/extras/DatePickerrange";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiselector";
import Loading from "@/app/loading";

export default function EditTripForm() {
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    start_date: null,
    end_date: null,
    description: "",
    maxParticipants: "",
    budget: "",
    trip_type: [],
    trip_image: null,
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true); 
  const router = useRouter();
  const { id } = useParams(); 
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await fetch(`/api/get-trip-info?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Trip Data:", data);
          setFormData({
            title: data.trip.title || "",
            destination: data.trip.destination || "",
            start_date: data.trip.startDate ? new Date(data.trip.startDate) : null,
            end_date: data.trip.endDate ? new Date(data.trip.endDate) : null,
            description: data.trip.description || "",
            maxParticipants: data.trip.participantsUpperLimit || "",
            budget: data.trip.budget || "",
            trip_type: data.trip.type || [],
            trip_image: data.trip.trip_image || null,
          });
          setLoading(false);
        } else {
          throw new Error("Failed to fetch trip data.");
        }
      } catch (error) {
        console.error(error);
        setStatus("Error loading trip data. Please try again.");
        setLoading(false);
      }
    };

    fetchTripData();
  }, [id]);

  const validate = () => {
    const errors = {};
    if (!formData.destination) errors.destination = "Destination is required.";
    if (!formData.start_date) errors.start_date = "Start date is required.";
    if (!formData.end_date) errors.end_date = "End date is required.";
    if (formData.trip_type.length === 0)
      errors.trip_type = "Please select a trip type.";
    if (formData.budget && isNaN(formData.budget))
      errors.budget = "Budget must be a number.";
    if (formData.start_date && formData.end_date && new Date(formData.start_date) > new Date(formData.end_date))
      errors.end_date = "End date cannot be earlier than the start date.";
    return errors;
  };

  const handleLocationSelect = (destination) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      destination,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (range) => {
    if (range?.from && range?.to) {
      setFormData({
        ...formData,
        start_date: range.from,
        end_date: range.to,
      });
    }
  };

  const handleTripTypeChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      trip_type: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === "trip_type") {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await fetch(`/api/update-trip?id=${id}`, {
        method: "PATCH",
        body: formDataToSend,
      });

      if (response.ok) {
        setStatus("Trip updated successfully!");
        router.push(`/host/trip/${id}`);
      } else {
        const error = await response.json();
        setStatus(`Error: ${error.message}`);
      }
    } catch (error) {
      setStatus("Failed to update the trip. Please try again.");
    }
  };

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded shadow">
      <Link href="/">HOME</Link>
      <h1 className="text-2xl font-bold mb-4">Edit Trip</h1>
      {status && <p className="mb-4 text-center text-red-500">{status}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full border p-2 rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <GoogleMapsAutocomplete
          onLocationSelect={handleLocationSelect}
          value={formData.destination}
        />
        <div className="mb-4 mt-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="dateRange"
          >
            Select Dates
          </label>
          <DatePickerWithRange
            className="w-full"
            onSelect={handleDateChange}
            defaultValue={{
              from: formData.start_date,
              to: formData.end_date,
            }}
          />
          {errors.start_date && (
            <p className="text-red-500 text-sm">{errors.start_date}</p>
          )}
          {errors.end_date && (
            <p className="text-red-500 text-sm">{errors.end_date}</p>
          )}
        </div>
        <div className="mb-4 mt-6">
          <MultiSelector
            values={formData.trip_type}
            onValuesChange={handleTripTypeChange}
            loop
            className="max-w-xs"
          >
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder="Select your trip type" />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                {tripTypesMap.map((type) => (
                  <MultiSelectorItem key={type.value} value={type.value}>
                    {type.label}
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
          {errors.trip_type && (
            <p className="text-red-500 text-sm">{errors.trip_type}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="maxParticipants"
          >
            Maximum participants
          </label>
          <input
            type="number"
            name="maxParticipants"
            id="maxParticipants"
            className="w-full border p-2 rounded"
            value={formData.maxParticipants}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="budget"
          >
            Budget
          </label>
          <input
            type="number"
            name="budget"
            id="budget"
            className={`w-full border p-2 rounded ${
              errors.budget ? "border-red-500" : ""
            }`}
            value={formData.budget}
            onChange={handleChange}
          />
          {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="4"
            className="w-full border p-2 rounded"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Trip
        </button>
      </form>
    </div>
  );
}
