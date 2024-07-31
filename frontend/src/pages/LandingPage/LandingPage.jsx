import styles from "./LandingPage.module.css";
import Header from "../../components/LandingComponents/Header/Header";
import HeroSection from "../../components/LandingComponents/HeroSection/HeroSection";
import OldvsNew from "../../components/LandingComponents/OldvsNew/OldvsNew";
import DemoModels from "../../components/LandingComponents/DemoModels/DemoModels";
import PlatformSection from "../../components/LandingComponents/PlatformSection/PlatformSection";
import ResultsSection from "../../components/LandingComponents/ResultsSection/ResultsSection";
import FeaturesSection from "../../components/LandingComponents/FeaturesSection/FeaturesSection";
import CreatorsSection from "../../components/LandingComponents/CreatorsSection/CreatorsSection";
import TrialFreeSection from "../../components/LandingComponents/TrialFreeSection/TrialFreeSection";
import Footer from "../../components/LandingComponents/Footer/Footer";

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <Header />
      <HeroSection />
      <OldvsNew />
      <DemoModels />
      <PlatformSection />
      <ResultsSection />
      <FeaturesSection />
      <CreatorsSection />
      <TrialFreeSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
