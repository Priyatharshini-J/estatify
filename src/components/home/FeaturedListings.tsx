import { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "@/components/properties/PropertyCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import LoadingSpinner from "../ui/loading-spinner";

const FeaturedListings = () => {
  const [properties, setProperties] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          `https://slate-template-apps-773793963.development.catalystserverless.com/server/estatify_routes_handler/properties`
        );

        setProperties(res.data);
      } catch (err) {
        console.error("Failed to fetch order", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchProperties();
  }, []);

  const featuredProperties = properties.filter(
    (property) => property.isFeatured
  );
  return (
    <>
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Featured Listings
                </h2>
                <p className="text-muted-foreground mt-2">
                  Explore our handpicked selection of exceptional properties
                </p>
              </div>
              <Link to="/properties" className="mt-4 md:mt-0">
                <Button variant="outline">View All Properties</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <Suspense key={property.id} fallback={<PropertyCardSkeleton />}>
                  <PropertyCard property={property} />
                </Suspense>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const PropertyCardSkeleton = () => {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="h-64 skeleton" />
      <div className="p-5 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-5 w-1/3" />
        <div className="flex items-center justify-between gap-2 pt-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedListings;
