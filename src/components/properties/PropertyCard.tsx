
import { useState } from "react";
import { Link } from "react-router-dom";
import { Property } from "@/types/property";
import { Bed, Bath, SquareFoot, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="group bg-background border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      <Link to={`/property/${property.id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 skeleton" />
          )}
          <img
            src={property.images[0]}
            alt={property.title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsLoading(false)}
          />
          {property.isFeatured && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
          <button 
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full glass-effect transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
          >
            <Heart size={16} className={cn(
              "transition-colors duration-300",
              isFavorite ? "fill-red-500 text-red-500" : "text-foreground"
            )} />
          </button>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="mb-2">
          <h3 className="font-semibold text-xl truncate group-hover:text-primary transition-colors duration-300">
            {property.title}
          </h3>
          <p className="text-muted-foreground text-sm truncate">{property.address}, {property.city}</p>
        </div>
        
        <div className="flex items-center justify-between mt-4 mb-3">
          <p className="font-semibold text-lg">{formattedPrice}</p>
        </div>
        
        <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed size={16} />
            <span>{property.bedrooms} bd</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} />
            <span>{property.bathrooms} ba</span>
          </div>
          <div className="flex items-center gap-1">
            <SquareFoot size={16} />
            <span>{property.squareFeet.toLocaleString()} sq ft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
