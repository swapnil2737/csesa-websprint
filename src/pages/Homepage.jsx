import HeroSection from "../components/Hero";
import Cards from "../components/Card";
import Leaderboard from "../components/Leaderboard";
import RegisterPage from "./RegisterPage";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Cards />
      <Leaderboard />
      <RegisterPage />
    </main>
  );
}