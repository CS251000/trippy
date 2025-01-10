"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function TravellerTripForm() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get("tripId");

  const [formData, setFormData] = useState({
    aadharNumber: "",
    firstName: "",
    lastName: "",
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
    if (!formData.firstName) {
      errors.firstName = "First name is required.";
    }
    if (!formData.lastName) {
      errors.lastName = "Last name is required.";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setStatus("Form submitted successfully!");
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Join Trip Form</h1>
      {status && (
        <p className="mb-4 text-center text-green-500 font-semibold">
          {status}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="aadharNumber"
          >
            Aadhar Number<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="aadharNumber"
            id="aadharNumber"
            className={`w-full border p-2 rounded ${
              errors.aadharNumber ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.aadharNumber}
            onChange={handleChange}
          />
          {errors.aadharNumber && (
            <p className="text-red-500 text-sm">{errors.aadharNumber}</p>
          )}
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="firstName"
          >
            First Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className={`w-full border p-2 rounded ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="lastName"
          >
            Last Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className={`w-full border p-2 rounded ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            className={`w-full border p-2 rounded ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="emergencyContact"
          >
            Emergency Contact<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="emergencyContact"
            id="emergencyContact"
            className={`w-full border p-2 rounded ${
              errors.emergencyContact ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.emergencyContact}
            onChange={handleChange}
          />
          {errors.emergencyContact && (
            <p className="text-red-500 text-sm">{errors.emergencyContact}</p>
          )}
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`w-full border p-2 rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="age">
            Age<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="age"
            id="age"
            className={`w-full border p-2 rounded ${
              errors.age ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="profilePicture"
          >
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
