// app/landing/page.js
import HeroCarousel from "../../components/Landing/HeroCarousel";
import WhyTrovaCarousel from "../../components/Landing/WhyTrovaCarousel";

const LandingPage = () => {
  return (
    <div>
      <HeroCarousel />
      <WhyTrovaCarousel />
    </div>
  );
};

export default LandingPage;
