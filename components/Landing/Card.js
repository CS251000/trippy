import Image from "next/image";

const Card = ({ title, description, imgSrc }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {imgSrc && (
        <div className="relative h-64">
          <Image src={imgSrc} alt={title} layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default Card;
