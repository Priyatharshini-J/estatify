import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilters, {
  PropertyFiltersState,
} from "@/components/filters/PropertyFilters";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Bath, Bed, Grid2X2, List, MapPin, Square } from "lucide-react";
import { Property } from "@/types/property";
import axios from "axios";

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/loading-spinner";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [isFetching, setIsFetching] = useState(true);
  const [allProperties, setAllProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          `https://slate-template-apps-773793963.development.catalystserverless.com/server/estatify_routes_handler/properties`
        );
        setProperties(res.data);
        setAllProperties(res.data);
      } catch (err) {
        console.error("Failed to fetch order", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchProperties();
  }, []);

  const [filters, setFilters] = useState<PropertyFiltersState>({
    minPrice: 0,
    maxPrice: 5000000,
    bedrooms: [],
    bathrooms: [],
    propertyTypes: [],
    features: [],
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    // Filter properties based on filters
    if (!allProperties || allProperties.length === 0) return;
    let filteredProperties = [...allProperties];

    // Filter by price
    filteredProperties = filteredProperties.filter(
      (property) =>
        property.price >= filters.minPrice && property.price <= filters.maxPrice
    );

    // Filter by bedrooms
    if (filters.bedrooms.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        filters.bedrooms.some((bed) => property.bedrooms >= bed)
      );
    }

    // Filter by bathrooms
    if (filters.bathrooms.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        filters.bathrooms.some((bath) => property.bathrooms >= bath)
      );
    }

    // Filter by property type
    if (filters.propertyTypes.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        filters.propertyTypes.includes(property.propertyType)
      );
    }

    // Filter by features
    if (filters.features.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        filters.features.every((feature) => property.features.includes(feature))
      );
    }

    // Apply search term
    const searchTerm = searchParams.get("search");

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredProperties = allProperties.filter(
        (property) =>
          property.title.toLowerCase().includes(term) ||
          property.description.toLowerCase().includes(term) ||
          property.address.toLowerCase().includes(term) ||
          property.city.toLowerCase().includes(term) ||
          property.state.toLowerCase().includes(term)
      );
    }

    setProperties(filteredProperties);
  }, [filters, searchParams, allProperties]);

  const handleFilterChange = (newFilters: PropertyFiltersState) => {
    setFilters(newFilters);
  };

  return (
    <>
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <Layout>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <PropertyFilters onFilterChange={handleFilterChange} />

              <div className="flex items-center gap-3">
                <div className="border rounded-md p-1 flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      viewMode === "grid" && "bg-secondary"
                    )}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid2X2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      viewMode === "list" && "bg-secondary"
                    )}
                    onClick={() => setViewMode("list")}
                  >
                    <List size={16} />
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="mb-6" />

            {properties.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">
                  No properties found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find more properties
                </p>
                <Button
                  onClick={() => {
                    setFilters({
                      minPrice: 0,
                      maxPrice: 5000000,
                      bedrooms: [],
                      bathrooms: [],
                      propertyTypes: [],
                      features: [],
                    });
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {properties.map((property) => {
                  const imageUrls: string[] = property.images
                    .split('", "')
                    .map((url) => url.replace(/^"|"$/g, ""));
                  return (
                    <div
                      key={property.id}
                      className="flex flex-col md:flex-row gap-6 border border-border rounded-xl overflow-hidden p-0 md:p-0 animate-fade-in"
                    >
                      <Link
                        to={`/property/${property.id}`}
                        className="md:w-1/3 h-64 md:h-auto relative overflow-hidden"
                      >
                        <img
                          src={imageUrls[0]}
                          alt={property.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {property.isFeatured && (
                          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                            Featured
                          </div>
                        )}
                      </Link>
                      <div className="flex-1 p-6">
                        <Link to={`/property/${property.id}`}>
                          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                            {property.title}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground text-sm mb-3">
                          {property.address}, {property.city}, {property.state}
                        </p>
                        <p className="font-semibold text-lg mb-4">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                          }).format(property.price)}
                        </p>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {property.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Bed size={16} />
                            {property.bedrooms} bd
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath size={16} />
                            {property.bathrooms} ba
                          </span>
                          <span className="flex items-center gap-1">
                            <Square size={16} />
                            {property.squareFeet.toLocaleString()} sq ft
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Layout>
      )}
    </>
  );
};

export default Properties;
