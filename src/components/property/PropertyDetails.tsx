import { Property } from "@/types/property";
import { Bed, Bath, Square, Clock, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  const formattedFeatures: string[] = property.features
    .split('", "')
    .map((url) => url.replace(/^"|"$/g, ""));

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{property.propertyType}</Badge>
          {property.isFeatured && (
            <Badge className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
        <p className="text-muted-foreground">
          {property.address}, {property.city}, {property.state}{" "}
          {property.zipCode}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-3xl font-bold">{formattedPrice}</p>
        </div>

        <div className="flex items-center flex-wrap gap-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Bed size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bedrooms</p>
              <p className="font-medium">{property.bedrooms}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Bath size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bathrooms</p>
              <p className="font-medium">{property.bathrooms}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Square size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Square Feet</p>
              <p className="font-medium">
                {property.squareFeet.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">About This Property</h2>
          <p className="text-muted-foreground whitespace-pre-wrap">
            {property.description}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <div className="flex flex-wrap gap-2">
              {formattedFeatures.map((feature) => (
                <Badge key={feature} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <p className="text-sm text-muted-foreground">Property Type</p>
              <div className="flex items-center gap-2">
                <Home size={16} />
                <p>{property.propertyType}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-sm text-muted-foreground">Year Built</p>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <p>{property.yearBuilt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
