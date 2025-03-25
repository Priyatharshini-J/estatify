
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyDetails from "@/components/property/PropertyDetails";
import PropertyMap from "@/components/map/PropertyMap";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Property } from "@/types/property";
import { properties } from "@/data/properties";
import { ArrowLeft, Share, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    // Find the property
    const foundProperty = properties.find((p) => p.id === id);
    
    setTimeout(() => {
      setProperty(foundProperty || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: `Check out this property: ${property?.title}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Property link copied to clipboard",
      });
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? "This property has been removed from your favorites"
        : "This property has been added to your favorites",
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-6 w-48 bg-muted rounded-md" />
            <div className="h-8 w-3/4 bg-muted rounded-md" />
            <div className="h-[400px] w-full bg-muted rounded-xl" />
            <div className="h-64 w-full bg-muted rounded-md" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="container mx-auto px-4 text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/properties")}>
            Back to Properties
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share size={16} className="mr-2" />
              Share
            </Button>
            <Button
              variant={isFavorite ? "default" : "outline"}
              size="sm"
              onClick={toggleFavorite}
            >
              <Heart size={16} className={isFavorite ? "mr-2 fill-current" : "mr-2"} />
              {isFavorite ? "Saved" : "Save"}
            </Button>
          </div>
        </div>

        <PropertyGallery property={property} />
        <PropertyDetails property={property} />
        
        <Separator className="my-10" />
        
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-6">Location</h2>
          <PropertyMap properties={[property]} selectedProperty={property} />
        </div>
        
        <div className="glass-effect p-8 rounded-xl mb-10">
          <h2 className="text-xl font-semibold mb-4">Interested in this property?</h2>
          <p className="text-muted-foreground mb-6">
            Contact our agents to schedule a viewing or get more information about this property.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button>Contact Agent</Button>
            <Button variant="outline">Schedule Viewing</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetail;
