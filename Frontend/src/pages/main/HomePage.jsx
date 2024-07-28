import ActionButton from "../../components/ActionButton";
import ContentPage from "../features/home/ContentPage";
import HeroSection from "../features/home/HeroSection";
import InfoSection from "../features/home/InfoSection";
import StudentReviews from "../features/home/StudentReviews";

const Home = () => {
  return (
    <main className="min-h-[100vh] w-full text-center">
      <HeroSection />
      <InfoSection />
      <ContentPage />
      <StudentReviews />
    </main>
  );
};

export default Home;
