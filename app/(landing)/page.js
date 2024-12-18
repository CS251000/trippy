// app/landing/page.js
import HeroCarousel from "./components/HeroCarousel";
import WhyTrovaCarousel from "./components/WhyTrovaCarousel";

const LandingPage = () => {
  return (
    <div>
      <HeroCarousel />
      <WhyTrovaCarousel />
    </div>
  );
};

export default LandingPage;
