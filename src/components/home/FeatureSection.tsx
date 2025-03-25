
import { Search, Map, Home, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Find Your Dream Home",
    description: "Browse thousands of properties with advanced search filters to find exactly what you're looking for.",
  },
  {
    icon: Map,
    title: "Interactive Map Search",
    description: "Explore neighborhoods and properties with our interactive map view to find the perfect location.",
  },
  {
    icon: Home,
    title: "Detailed Property Information",
    description: "Get comprehensive details, high-quality photos, and essential information about every listing.",
  },
  {
    icon: CheckCircle,
    title: "Verified Listings",
    description: "All our properties are verified by our team to ensure accuracy and reliability of information.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            A Better Way to Find Your Home
          </h2>
          <p className="text-muted-foreground">
            Our platform provides all the tools you need to make informed decisions about your next property.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl bg-background border border-border animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
