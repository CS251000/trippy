"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { tripTypes } from "@/lib/constants";



export default function HostTripForm() {
  const [formData, setFormData] = useState({
    destination: "",
    start_date: "",
    end_date: "",
    description: "",
    maxParticipants:0,
    budget: 0,
    trip_type: "",
    trip_image: null,
    
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const router = useRouter();

  const validate = () => {
    const errors = {};
    if (!formData.destination) errors.destination = "Destination is required.";
    if (!formData.start_date) errors.start_date = "Start date is required.";
    if (!formData.end_date) errors.end_date = "End date is required.";
    if (!formData.trip_type) errors.trip_type = "Please select a trip type.";
    if (formData.budget && isNaN(formData.budget)) errors.budget = "Budget must be a number.";
    if (new Date(formData.start_date) > new Date(formData.end_date))
      errors.end_date = "End date cannot be earlier than the start date.";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, trip_image: e.target.files[0] });
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
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch("/api/create-trip", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        setStatus("Trip hosted successfully!");
        router.push(`/host/host-trip-form/${data.id}`);
      } else {
        const error = await response.json();
        setStatus(`Error: ${error.message}`);
      }
    } catch (error) {
      setStatus("Failed to host the trip. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded shadow">
      <Link href="/">HOME</Link>
      <h1 className="text-2xl font-bold mb-4">Host a Trip</h1>
      {status && <p className="mb-4 text-center text-red-500">{status}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="destination">
            Destination
          </label>
          <input
            type="text"
            name="destination"
            id="destination"
            className={`w-full border p-2 rounded ${errors.destination ? "border-red-500" : ""}`}
            value={formData.destination}
            onChange={handleChange}
            required
          />
          {errors.destination && <p className="text-red-500 text-sm">{errors.destination}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="start_date">
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            className={`w-full border p-2 rounded ${errors.start_date ? "border-red-500" : ""}`}
            value={formData.start_date}
            onChange={handleChange}
            required
          />
          {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="end_date">
            End Date
          </label>
          <input
            type="date"
            name="end_date"
            id="end_date"
            className={`w-full border p-2 rounded ${errors.end_date ? "border-red-500" : ""}`}
            value={formData.end_date}
            onChange={handleChange}
            required
          />
          {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="trip_type">
            Trip Type
          </label>
          <select
            name="trip_type"
            id="trip_type"
            className={`w-full border p-2 rounded ${errors.trip_type ? "border-red-500" : ""}`}
            value={formData.trip_type}
            onChange={handleChange}
            required
          >
            <option value="">Select a type</option>
            {tripTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.trip_type && <p className="text-red-500 text-sm">{errors.trip_type}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="maxParticipants">
            Maximum participants
          </label>
          <input
            type="number"
            name="maxParticipants"
            id="maxParticipants"
            className={`w-full border p-2 rounded`}
            value={formData.maxParticipants}
            onChange={handleChange}
          />
          
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="budget">
            Budget
          </label>
          <input
            type="number"
            name="budget"
            id="budget"
            className={`w-full border p-2 rounded ${errors.budget ? "border-red-500" : ""}`}
            value={formData.budget}
            onChange={handleChange}
          />
          {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
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
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="trip_image">
            Upload Trip Image (Optional)
          </label>
          <input
            type="file"
            name="trip_image"
            id="trip_image"
            className="w-full border p-2 rounded"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Host Trip
        </button>
      </form>
    </div>
  );
}
