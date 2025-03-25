
import { useState } from "react";
import { Property } from "@/types/property";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  property: Property;
}

const PropertyGallery = ({ property }: PropertyGalleryProps) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({
      ...prev,
      [index]: true
    }));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div 
          className="relative rounded-xl overflow-hidden cursor-pointer h-[400px]"
          onClick={() => {
            setCurrentImageIndex(0);
            setFullScreen(true);
          }}
        >
          {!loadedImages[0] && <div className="absolute inset-0 skeleton" />}
          <img
            src={property.images[0]}
            alt={`${property.title} main image`}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              loadedImages[0] ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => handleImageLoad(0)}
          />
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-foreground/10 flex items-center justify-center">
            <Button variant="secondary" className="glass-effect">
              View Gallery
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {property.images.slice(1, 5).map((image, index) => (
            <div 
              key={index + 1}
              className="relative rounded-xl overflow-hidden cursor-pointer h-[190px]"
              onClick={() => {
                setCurrentImageIndex(index + 1);
                setFullScreen(true);
              }}
            >
              {!loadedImages[index + 1] && <div className="absolute inset-0 skeleton" />}
              <img
                src={image}
                alt={`${property.title} image ${index + 2}`}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-300",
                  loadedImages[index + 1] ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => handleImageLoad(index + 1)}
              />
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-foreground/10" />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={fullScreen} onOpenChange={setFullScreen}>
        <DialogContent className="max-w-6xl p-0 bg-transparent border-none">
          <div className="relative h-[80vh] w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 glass-effect"
              onClick={() => setFullScreen(false)}
            >
              <X size={20} />
            </Button>
            
            <div className="relative h-full w-full flex items-center justify-center">
              <img
                src={property.images[currentImageIndex]}
                alt={`${property.title} fullscreen gallery image ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 glass-effect"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft size={24} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 glass-effect"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight size={24} />
              </Button>
            </div>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 glass-effect px-3 py-2 rounded-full">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentImageIndex === index ? "bg-primary w-4" : "bg-muted-foreground"
                  )}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyGallery;
