import Card from "./Card";

const features = [
  {
    title: "Planned for you",
    description:
      "The best of a destination including accommodations, a local guide, and select meals and activities.",
    // imgSrc: "/planned-for-you.jpg", // Add your image path here
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
          <Card
            key={index}
            title={feature.title}
            description={feature.description}
            imgSrc={feature.imgSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyTrovaCarousel;
