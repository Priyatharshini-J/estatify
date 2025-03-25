
import { useEffect, useRef, useState } from "react";
import { Property } from "@/types/property";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface PropertyMapProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onSelectProperty?: (property: Property) => void;
  fullWidth?: boolean;
}

const PropertyMap = ({
  properties,
  selectedProperty,
  onSelectProperty,
  fullWidth = false,
}: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  useEffect(() => {
    // Mock implementation using a div with a background image for demo purposes
    if (mapRef.current && !map) {
      setLoading(false);
      
      // We'll use position relative and absolute to display property markers
      if (mapRef.current) {
        mapRef.current.style.backgroundImage = "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')";
        mapRef.current.style.backgroundSize = "cover";
        mapRef.current.style.backgroundPosition = "center";
      }
    }
  }, [map]);

  // This would be the real implementation with Google Maps API
  // useEffect(() => {
  //   const initMap = async () => {
  //     if (!window.google || !mapRef.current) return;
  //     
  //     const newMap = new window.google.maps.Map(mapRef.current, {
  //       center: { lat: 39.8283, lng: -98.5795 },
  //       zoom: 5,
  //       mapTypeControl: false,
  //       streetViewControl: false,
  //       fullscreenControl: false,
  //       styles: [
  //         {
  //           featureType: "all",
  //           elementType: "labels.text.fill",
  //           stylers: [{ color: "#6c7b88" }],
  //         },
  //         {
  //           featureType: "administrative",
  //           elementType: "geometry.fill",
  //           stylers: [{ lightness: 20 }],
  //         },
  //         // Add more styles as needed
  //       ],
  //     });
  //     
  //     const newInfoWindow = new window.google.maps.InfoWindow();
  //     setMap(newMap);
  //     setInfoWindow(newInfoWindow);
  //     setLoading(false);
  //   };
  //   
  //   initMap();
  // }, []);
  
  // useEffect(() => {
  //   if (!map || !infoWindow) return;
  //   
  //   // Clear existing markers
  //   markers.forEach((marker) => marker.setMap(null));
  //   
  //   const bounds = new window.google.maps.LatLngBounds();
  //   const newMarkers = properties.map((property) => {
  //     const position = { lat: property.lat, lng: property.lng };
  //     bounds.extend(position);
  //     
  //     const marker = new window.google.maps.Marker({
  //       position,
  //       map,
  //       title: property.title,
  //       icon: {
  //         url: selectedProperty?.id === property.id
  //           ? '/marker-active.svg'
  //           : '/marker.svg',
  //         scaledSize: new window.google.maps.Size(32, 32),
  //       },
  //     });
  //     
  //     marker.addListener("click", () => {
  //       onSelectProperty?.(property);
  //     });
  //     
  //     return marker;
  //   });
  //   
  //   setMarkers(newMarkers);
  //   
  //   if (properties.length > 0) {
  //     if (selectedProperty) {
  //       map.setCenter({ lat: selectedProperty.lat, lng: selectedProperty.lng });
  //       map.setZoom(15);
  //     } else {
  //       map.fitBounds(bounds);
  //     }
  //   }
  // }, [map, infoWindow, properties, selectedProperty, onSelectProperty]);

  // For our mock implementation, we'll display the property markers manually
  return (
    <div 
      className={cn(
        "relative rounded-xl overflow-hidden animate-fade-in",
        fullWidth ? "h-[calc(100vh-6rem)]" : "h-[500px]"
      )}
    >
      {loading ? (
        <div className="w-full h-full skeleton" />
      ) : (
        <div ref={mapRef} className="w-full h-full relative">
          {/* Mock Property Markers */}
          {properties.map((property) => (
            <div
              key={property.id}
              className={cn(
                "absolute transition-all duration-300 cursor-pointer",
                selectedProperty?.id === property.id ? "z-50 scale-110" : "z-10"
              )}
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
              }}
              onClick={() => onSelectProperty?.(property)}
            >
              <div className={cn(
                "flex flex-col items-center scale-in animate-fade-in",
                selectedProperty?.id === property.id ? "mb-2" : ""
              )}>
                {selectedProperty?.id === property.id && !isMobile && (
                  <Card className="mb-2 w-48 glass-effect">
                    <CardContent className="p-2">
                      <div className="text-xs font-semibold truncate">{property.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{property.city}</div>
                      <div className="text-xs font-medium">{formatPrice(property.price)}</div>
                    </CardContent>
                  </Card>
                )}
                <div className={cn(
                  "bg-background text-foreground h-8 w-8 rounded-full shadow-lg flex items-center justify-center border-2 transition-colors duration-300",
                  selectedProperty?.id === property.id 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "border-muted hover:border-primary"
                )}>
                  <MapPin size={16} />
                </div>
              </div>
            </div>
          ))}
          
          {/* A hint that this is a mockup */}
          <Badge className="absolute top-4 left-4 glass-effect">
            Map Mockup - Will be replaced with Google Maps
          </Badge>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
