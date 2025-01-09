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

import { GoogleGenerativeAI } from "@google/generative-ai";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEN_AI_API_KEY);

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
    if (formData.trip_type.length === 0)
      errors.trip_type = "Please select a trip type.";
    if (formData.budget && (isNaN(formData.budget) || formData.budget < 2000)) {
      errors.budget = "Budget must be at least 2000.";
    }
    if (formData.maxParticipants && formData.maxParticipants <= 0) {
      errors.maxParticipants =
        "Maximum participants must be greater than zero.";
    }
    if (new Date(formData.start_date) > new Date(formData.end_date)) {
      errors.end_date = "End date cannot be earlier than the start date.";
    }
    return errors;
  };

  // const handleDescriptionEnhance = async () => {
  //   setLoading(true);
  //   try {
  //     // console.log("function calling");
  //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  //     const prompt = `Enhance the following trip description to make it more compelling for customers.Make sure to not exceed word limit 300 and only
  //                     give a paragraph no points or lists.
  //                     :\n\n${formData.description}`;
  //     const result = await model.generateContent(prompt);
  //     const enhancedDescription = result.response.text();
  //     console.log(enhancedDescription);
  //     setFormData((prev) => ({
  //       ...prev,
  //       description: enhancedDescription,
  //     }));

  //     setStatus("Description enhanced successfully!");
  //   } catch (error) {
  //     setStatus("Failed to enhance the description. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleDescriptionEnhance = async () => {
    setLoading(true);
    setEnhancing(false);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // AI Prompt
      const prompt = `Enhance the following trip description to make it more compelling for customers. 
                      Make sure not to exceed 300 words and only provide a paragraph (no points or lists):\n\n${formData.description}`;

      const result = await model.generateContent(prompt);
      const enhancedDescription = await result.response.text();
      setFormData((prev) => ({
        ...prev,
        description: enhancedDescription,
      }));
      setEnhancing(true);
    } catch (error) {
      console.error("Error enhancing description:", error);
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
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <Link href="/" className="text-blue-600 underline mb-4 block">
        HOME
      </Link>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Host a Trip</h1>
      {status && (
        <p className="mb-4 text-center text-red-500 font-semibold">{status}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className={`w-full border p-2 rounded ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <GoogleMapsAutocomplete onLocationSelect={handleLocationSelect} />

        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="dateRange"
          >
            Select Dates<span className="text-red-500">*</span>
          </label>
          <DatePickerWithRange className="w-full" onSelect={handleDateChange} />
          {errors.start_date && (
            <p className="text-red-500 text-sm">{errors.start_date}</p>
          )}
          {errors.end_date && (
            <p className="text-red-500 text-sm">{errors.end_date}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Trip Type<span className="text-red-500">*</span>
          </label>
          <MultiSelector
            values={formData.trip_type}
            onValuesChange={handleTripTypeChange}
            loop
            className="w-full"
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

        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="maxParticipants"
          >
            Maximum Participants<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="maxParticipants"
            id="maxParticipants"
            className={`w-full border p-2 rounded ${
              errors.maxParticipants ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.maxParticipants}
            onChange={handleChange}
          />
          {errors.maxParticipants && (
            <p className="text-red-500 text-sm">{errors.maxParticipants}</p>
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="budget"
          >
            Budget<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="budget"
            id="budget"
            className={`w-full border p-2 rounded ${
              errors.budget ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.budget}
            onChange={handleChange}
          />
          {errors.budget && (
            <p className="text-red-500 text-sm">{errors.budget}</p>
          )}
        </div>

        <div>
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
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm resize-none"
            placeholder="Provide a brief description of your trip"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>

          {loading && (
            <div className="flex items-center mt-2">
              <svg
                className="animate-spin h-5 w-5 text-blue-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 100 8H4z"
                ></path>
              </svg>
              <p className="text-blue-500 text-sm">Enhancing description...</p>
            </div>
          )}

          {!loading && !enhancing && (
            <button
              type="button"
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300 shadow-md"
              onClick={handleDescriptionEnhance}
            >
              Enhance with AI
            </button>
          )}

          {!loading && enhancing && (
            <p className="mt-2 text-green-500 font-medium">Enhanced with AI</p>
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
