
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PropertyMap from "@/components/map/PropertyMap";
import { Property } from "@/types/property";
import { properties as allProperties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ChevronLeft, ChevronRight, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const MapView = () => {
  const [properties, setProperties] = useState<Property[]>(allProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isMobile) {
      setShowSidebar(false);
    }
  }, [isMobile]);

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    if (isMobile) {
      setShowSidebar(true);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-10rem)]">
        <div className="relative flex flex-col h-[calc(100vh-10rem)]">
          <div className="flex-1 relative flex">
            {/* Properties Sidebar */}
            <div
              className={cn(
                "w-full md:w-96 h-full absolute md:relative z-20 border-r border-border transition-transform duration-300 bg-background",
                showSidebar ? "translate-x-0" : "-translate-x-full md:w-0"
              )}
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold">Properties</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setShowSidebar(false)}
                  >
                    <X size={16} />
                  </Button>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  {properties.map((property) => (
                    <div
                      key={property.id}
                      className={cn(
                        "border-b border-border p-4 cursor-pointer transition-colors hover:bg-muted/50",
                        selectedProperty?.id === property.id && "bg-muted"
                      )}
                      onClick={() => setSelectedProperty(property)}
                    >
                      <div className="flex gap-3">
                        <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <h3 className="font-medium truncate">{property.title}</h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {property.address}
                          </p>
                          <p className="text-sm font-medium mt-auto">
                            {formatPrice(property.price)}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span>{property.bedrooms} bd</span>
                            <span>{property.bathrooms} ba</span>
                            <span>{property.squareFeet.toLocaleString()} sq ft</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-border">
                  <Button variant="default" asChild className="w-full">
                    <Link to="/properties">
                      <List size={16} className="mr-2" />
                      List View
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="flex-1 relative">
              <PropertyMap
                properties={properties}
                selectedProperty={selectedProperty}
                onSelectProperty={handleSelectProperty}
                fullWidth
              />
              
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "absolute top-4 z-10 glass-effect",
                  showSidebar ? "right-4" : "left-4"
                )}
                onClick={() => setShowSidebar(!showSidebar)}
              >
                {showSidebar ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </Button>
              
              {selectedProperty && isMobile && showSidebar && (
                <Card className="absolute bottom-4 left-0 right-0 mx-4 glass-effect animate-slide-in">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={selectedProperty.images[0]}
                          alt={selectedProperty.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <h3 className="font-medium truncate">{selectedProperty.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {selectedProperty.city}, {selectedProperty.state}
                        </p>
                        <p className="text-sm font-medium mt-auto">
                          {formatPrice(selectedProperty.price)}
                        </p>
                        <Link 
                          to={`/property/${selectedProperty.id}`}
                          className="text-xs text-primary hover:underline mt-1"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MapView;
