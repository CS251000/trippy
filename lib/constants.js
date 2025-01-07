

export const tripTypes = [
  "Relaxing",
  "Adventurous",
  "Sightseeing",
  "Cultural",
  "Wildlife",
  "Beach",
  "Hiking",
  "Drizzle",
  "Snowy",
  "Romantic",
  "FamilyFriendly",
  "Historical",
  "RoadTrip",
  "Luxury",
  "EcoFriendly",
  "Festival",
  "Wellness",
  "AdventureSports",
  "Cruise",
  "Camping",
];

export const tripTypesMap = tripTypes.map((type) => ({
  label: type,
  value: type, 
}));

export const itineraryItemTypes = ["Food", "Travel", "Sightseeing", "Adventure", "Hotel", "Other"];



export const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Places", path: "/places" },
    { name: "Services", path: "/services" },
    { name: "Contact Us", path: "/contact-us" },
  ];