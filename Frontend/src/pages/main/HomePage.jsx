import ActionButton from "../../components/ActionButton";
import HeroSection from "../features/home/HeroSection";
import InfoSection from "../features/home/InfoSection";
import StudentReviews from "../features/home/StudentReviews";

const Home = () => {
  return (
    <main className="min-h-[100vh] mt-[2rem] text-center">
      <HeroSection />
      <InfoSection />
      {/* <CardsSection /> */}
      <StudentReviews />
    </main>
  );
};

export default Home;
