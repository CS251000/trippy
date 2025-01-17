"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { database, storage } from "@/firebaseConfig";

export default function TripPhotoGallery() {
  const { tripId } = useParams();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [mediaList, setMediaList] = useState([]);


  useEffect(() => {
    const fetchMedia = async () => {
      const q = query(collection(database, "tripMedia"), where("tripId", "==", tripId));
      const querySnapshot = await getDocs(q);
      const media = querySnapshot.docs.map((doc) => doc.data());
      setMediaList(media);
    };

    fetchMedia();
  }, [tripId]);

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);

    const promises = files.map(async (file) => {
      const storageRef = ref(storage, `trips/${tripId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error), // Reject on error
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(database, "tripMedia"), {
              tripId,
              url: downloadURL,
              name: file.name,
              type: file.type,
              uploadedAt: new Date(),
            });
            resolve(downloadURL); // Resolve after successful upload
          }
        );
      });
    });

    try {
      await Promise.all(promises);
      setFiles([]); 
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload files.");
    } finally {
      setUploading(false);
      setFiles([]);
    }

    // Refresh the media list to reflect the new uploads
    try {
      const q = query(collection(database, "tripMedia"), where("tripId", "==", tripId));
      const querySnapshot = await getDocs(q);
      const media = querySnapshot.docs.map((doc) => doc.data());
      setMediaList(media);
    } catch (error) {
      console.error("Failed to refresh media list:", error);
    }
  };

  // Handle file selection from input
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Photo Gallery for Trip: {tripId}</h1>

      <div className="mb-4">
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        <button
          onClick={handleUpload}
          disabled={uploading || files.length === 0}
          className={`mt-4 px-6 py-2 text-white rounded-lg ${
            uploading || files.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Uploaded Media</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaList.map((media, index) => (
            <div key={index} className="shadow rounded-lg overflow-hidden">
              {media.type.startsWith("image/") ? (
                <img src={media.url} alt={media.name} className="w-full h-48 object-cover" />
              ) : (
                <video
                  controls
                  className="w-full h-48 object-cover"
                >
                  <source src={media.url} type={media.type} />
                </video>
              )}
              <div className="p-2 text-sm text-gray-600 truncate">{media.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
