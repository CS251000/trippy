"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "AIzaSyBiAZFBelnH4gtlRZaqLo6QT62ZnqC7gJU";
const genAI = new GoogleGenerativeAI(API_KEY);

export default function HostTripForm() {
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    start_date: "",
    end_date: "",
    description: "",
    maxParticipants: "",
    budget: "",
    trip_type: [],
    trip_image: null,
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const router = useRouter();

  const validate = () => {
    const errors = {};
    if (!formData.title) errors.title = "Title is required.";
    if (!formData.destination) errors.destination = "Destination is required.";
    if (!formData.start_date) errors.start_date = "Start date is required.";
    if (!formData.end_date) errors.end_date = "End date is required.";
    if (formData.trip_type.length === 0) errors.trip_type = "Please select a trip type.";
    if (formData.budget && (isNaN(formData.budget) || formData.budget < 2000)) {
      errors.budget = "Budget must be at least 2000.";
    }
    if (formData.maxParticipants && formData.maxParticipants <= 0) {
      errors.maxParticipants = "Maximum participants must be greater than zero.";
    }
    if (new Date(formData.start_date) > new Date(formData.end_date)) {
      errors.end_date = "End date cannot be earlier than the start date.";
    }
    return errors;
  };

  const handleDescriptionEnhance = async () => {
    setLoading(true);
    try {
      // console.log("function calling");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Enhance the following trip description to make it more compelling for customers.Make sure to not exceed word limit 150 and only 
                      give a paragraph no points or lists.
                      :\n\n${formData.description}`;
      const result = await model.generateContent(prompt);
      const enhancedDescription = result.response.text();
      console.log(enhancedDescription);
      setFormData((prev) => ({
        ...prev,
        description: enhancedDescription,
      }));
  
      setStatus("Description enhanced successfully!");
    } catch (error) {
      setStatus("Failed to enhance the description. Please try again.");
    } finally {
      setLoading(false);
    }
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
    if (name === "description" && value.trim().length > 0) {
      setEnhancing(true);
    } else if (name === "description" && value.trim().length === 0) {
      setEnhancing(false);
    }
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
      setModalMessage(Object.values(validationErrors).join("\n"));
      setShowModal(true);
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

      const response = await fetch("/api/create-trip", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        setStatus("Trip hosted successfully!");
        router.push(`/host/trip/${data.id}`);
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
          <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className={`w-full border p-2 rounded ${errors.title ? "border-red-500" : ""}`}
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <GoogleMapsAutocomplete onLocationSelect={handleLocationSelect} />

        <div className="mb-4 mt-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="dateRange">
            Select Dates
          </label>
          <DatePickerWithRange className="w-full" onSelect={handleDateChange} />
          {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date}</p>}
          {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date}</p>}
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
            className={`w-full border p-2 rounded ${errors.maxParticipants ? "border-red-500" : ""}`}
            value={formData.maxParticipants}
            onChange={handleChange}
          />
          {errors.maxParticipants && <p className="text-red-500 text-sm">{errors.maxParticipants}</p>}
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
          {loading && <p className="text-blue-500 text-sm">Enhancing description...</p>}
          {enhancing && !loading && (
            <button
              type="button"
              className="mt-2 text-blue-500 underline"
              onClick={handleDescriptionEnhance}
            >
              Enhance with AI
            </button>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Host Trip
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Validation Errors</h2>
            <p className="mb-4">{modalMessage}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
