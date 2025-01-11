"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function TravellerTripForm() {
  const router= useRouter();
  const searchParams = useSearchParams();
  const tripId = searchParams.get("tripId");
  const { user, isLoaded, isSignedIn } = useUser();

  const [formData, setFormData] = useState({
    aadharNumber: "",
    fullName: "",
    phoneNumber: "",
    emergencyContact: "",
    email: "",
    age: "",
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.aadharNumber || formData.aadharNumber.length !== 12) {
      errors.aadharNumber = "Aadhar number must be 12 digits.";
    }
    if (!formData.fullName) {
      errors.fullName = "Full name is required.";
    }
    if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
      errors.phoneNumber = "Phone number must be 10 digits.";
    }
    if (!formData.emergencyContact || formData.emergencyContact.length !== 10) {
      errors.emergencyContact = "Emergency contact must be 10 digits.";
    }
    if (
      !formData.email ||
      !/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      errors.email = "Invalid email format.";
    }
    if (!formData.age || isNaN(formData.age) || formData.age < 18) {
      errors.age = "Age must be a number and at least 18.";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });
    payload.append("tripId", tripId);
    payload.append("clerkId", user.id);
    payload.append("username", user.username);
    payload.append("createdAt", new Date().toISOString());

    if (isLoaded && isSignedIn) {
      try {
        const response = await fetch("/api/add-member", {
          method: "POST",
          body: payload,
        });
        const res = await response.json();
        if (response.ok) {
          setStatus("Form submitted successfully!");
          router.push(`/traveller/trip/${tripId}`);
        } else {
          setStatus(`Error: ${res.message}`);
        }
        
      } catch (err) {
        setStatus("Error occurred while submitting the form");
        console.error("Error:", err);
      } finally {
        setIsSubmitting(false);
        
      }
    } else {
      setStatus("You must be signed in to submit the form.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Join Trip Form</h1>
      {status && (
        <p className={`mb-4 text-center ${status.startsWith("Error") ? "text-red-500" : "text-green-500"} font-semibold`}>
          {status}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/** Form fields */}
        {Object.keys(formData).map((key) => (
          key !== "profilePicture" && (
            <div key={key}>
              <label className="block text-gray-700 font-medium mb-2" htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type={key === "age" ? "number" : "text"}
                name={key}
                id={key}
                className={`w-full border p-2 rounded ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                }`}
                value={formData[key]}
                onChange={handleChange}
              />
              {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
            </div>
          )
        ))}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="profilePicture">
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            className="w-full border p-2 rounded border-gray-300"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded text-white ${
            isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
