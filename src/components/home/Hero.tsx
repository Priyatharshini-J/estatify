
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?search=${searchTerm}`);
  };

  return (
    <div className="relative h-[85vh] flex items-center">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury home"
          className="w-full h-full object-cover opacity-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />
      </div>

      <div className="container px-4 mx-auto max-w-5xl">
        <div className="space-y-6 text-center">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Find Your Perfect Place
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
              Discover exceptional properties in the most desirable locations
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center glass-effect p-1 px-2 rounded-full">
              <Input
                type="text"
                placeholder="Search by city, neighborhood, or address..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" className="rounded-full" size="icon">
                <Search size={18} />
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-3 pt-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <Button variant="outline" className="rounded-full bg-background/80 border-border/50 backdrop-blur-sm">
              For Sale
            </Button>
            <Button variant="outline" className="rounded-full bg-background/80 border-border/50 backdrop-blur-sm">
              For Rent
            </Button>
            <Button variant="outline" className="rounded-full bg-background/80 border-border/50 backdrop-blur-sm">
              New Construction
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
