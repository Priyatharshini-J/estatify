
import { Link } from "react-router-dom";
import { Home, Search, Map, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 blur-backdrop py-4 px-6 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 animate-fade-in">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
            <Home size={16} />
          </div>
          {!isMobile && (
            <span className="font-semibold text-xl tracking-tight">Estatify</span>
          )}
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/properties" className="transition-colors hover:text-primary animate-fade-in">
            <span className={isMobile ? "sr-only" : "flex items-center gap-2"}>
              {!isMobile && "Listings"}
              {isMobile && <Search size={20} />}
            </span>
          </Link>
          
          <Link to="/map" className="transition-colors hover:text-primary animate-fade-in">
            <span className={isMobile ? "sr-only" : "flex items-center gap-2"}>
              {!isMobile && "Map View"}
              {isMobile && <Map size={20} />}
            </span>
          </Link>

          <Button className="animate-fade-in" variant="secondary" size={isMobile ? "icon" : "default"}>
            {isMobile ? <User size={18} /> : "Sign In"}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
