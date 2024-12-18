"use client";

import Link from "next/link";
import { useState } from "react";

export default function TripDetailsForm() {
  const [formData, setFormData] = useState({
    destination: "",
    start_date: "",
    end_date: "",
    description: "",
    user_id: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/create-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Trip details successfully saved!");
        setFormData({
          destination: "",
          start_date: "",
          end_date: "",
          description: "",
          user_id: "",
        });
      } else {
        const error = await response.json();
        setStatus(`Error: ${error.message}`);
      }
    } catch (error) {
      setStatus("Failed to save trip details. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-5 border border-gray-300 rounded-lg shadow-md">
      <Link href={'/'}>HOME</Link>
      <h1 className="text-xl font-bold mb-4">Add Trip Details</h1>
      {status && <p className="mb-4 text-center">{status}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="destination">
            Destination
          </label>
          <input
            type="text"
            name="destination"
            id="destination"
            className="w-full border border-gray-300 rounded p-2"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="start_date">
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            className="w-full border border-gray-300 rounded p-2"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="end_date">
            End Date
          </label>
          <input
            type="date"
            name="end_date"
            id="end_date"
            className="w-full border border-gray-300 rounded p-2"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="4"
            className="w-full border border-gray-300 rounded p-2"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="user_id">
            User ID
          </label>
          <input
            type="number"
            name="user_id"
            id="user_id"
            className="w-full border border-gray-300 rounded p-2"
            value={formData.user_id}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
