
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedListings from "@/components/home/FeaturedListings";
import FeatureSection from "@/components/home/FeatureSection";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedListings />
      <FeatureSection />
      <CallToAction />
    </Layout>
  );
};

export default Index;
