// components/WhyTrovaCarousel.js
import Image from "next/image";

const features = [
  {
    title: "Planned for you",
    description:
      "The best of a destination including accommodations, a local guide, and select meals and activities.",
    // imgSrc: "/planned-for-you.jpg",
  },
  {
    title: "Safety and trust",
    description:
      "Trova vets Trip Operators to ensure safety, positive local impact, sustainable tourism practices, and more.",
    // imgSrc: "/safety-and-trust.jpg", // Add your image path here
  },
  {
    title: "Community and Connection",
    description:
      "You’ll find a community of kind, joyful, open-minded adventurers — everywhere in the world.",
    // imgSrc: "/community-and-connection.jpg", // Add your image path here
  },
];

const WhyTrovaCarousel = () => {
  return (
    <div className="bg-pink-100 py-12">
      <h2 className="text-4xl font-bold text-center mb-8">Why Trova?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative h-64">
              <Image
                src={feature.imgSrc}
                alt={feature.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyTrovaCarousel;
