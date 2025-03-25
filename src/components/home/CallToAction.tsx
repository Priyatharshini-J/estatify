
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <img
              src="https://images.unsplash.com/photo-1560185008-5c9f8cd45e51?q=80&w=2070&auto=format&fit=crop"
              alt="Beautiful home"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
          </div>
          
          <div className="relative p-10 md:p-16 text-white">
            <div className="max-w-md space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">
                Ready to Find Your Perfect Home?
              </h2>
              <p className="text-white/90">
                Start your property search today and discover the perfect place. Our platform offers the most comprehensive selection of properties.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="animate-scale-in">
                  <Link to="/properties">
                    Browse Properties
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10 animate-scale-in" style={{ animationDelay: "100ms" }}>
                  <Link to="/map">
                    Explore Map
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
