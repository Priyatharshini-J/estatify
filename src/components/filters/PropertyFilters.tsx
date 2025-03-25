
import { useState } from "react";
import { Filter, X, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFiltersState) => void;
}

export interface PropertyFiltersState {
  minPrice: number;
  maxPrice: number;
  bedrooms: number[];
  bathrooms: number[];
  propertyTypes: string[];
  features: string[];
}

const initialFilters: PropertyFiltersState = {
  minPrice: 0,
  maxPrice: 5000000,
  bedrooms: [],
  bathrooms: [],
  propertyTypes: [],
  features: [],
};

const propertyTypeOptions = [
  "Single Family",
  "Condo",
  "Townhouse",
  "Villa",
  "Penthouse",
  "Estate",
  "Cabin",
];

const featureOptions = [
  "Pool",
  "Waterfront",
  "Mountain View",
  "Ocean View",
  "City View",
  "Garden",
  "Garage",
  "Renovated",
  "Fireplace",
  "Smart Home",
];

const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState<PropertyFiltersState>(initialFilters);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const isMobile = useIsMobile();

  const handleFilterChange = (newFilters: Partial<PropertyFiltersState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
    
    // Count active filters
    let count = 0;
    if (updatedFilters.minPrice > initialFilters.minPrice) count++;
    if (updatedFilters.maxPrice < initialFilters.maxPrice) count++;
    if (updatedFilters.bedrooms.length > 0) count++;
    if (updatedFilters.bathrooms.length > 0) count++;
    if (updatedFilters.propertyTypes.length > 0) count++;
    if (updatedFilters.features.length > 0) count++;
    setActiveFiltersCount(count);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
    setActiveFiltersCount(0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="font-medium">Price Range</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[filters.minPrice, filters.maxPrice]}
            min={0}
            max={5000000}
            step={50000}
            onValueChange={(value) => {
              handleFilterChange({
                minPrice: value[0],
                maxPrice: value[1],
              });
            }}
          />
          <div className="flex items-center justify-between text-sm">
            <span>{formatPrice(filters.minPrice)}</span>
            <span>{formatPrice(filters.maxPrice)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <h3 className="font-medium">Bedrooms</h3>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Button
                key={`bed-${num}`}
                variant={filters.bedrooms.includes(num) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const newBedrooms = filters.bedrooms.includes(num)
                    ? filters.bedrooms.filter((bed) => bed !== num)
                    : [...filters.bedrooms, num];
                  handleFilterChange({ bedrooms: newBedrooms });
                }}
              >
                {num}+
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium">Bathrooms</h3>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Button
                key={`bath-${num}`}
                variant={filters.bathrooms.includes(num) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const newBathrooms = filters.bathrooms.includes(num)
                    ? filters.bathrooms.filter((bath) => bath !== num)
                    : [...filters.bathrooms, num];
                  handleFilterChange({ bathrooms: newBathrooms });
                }}
              >
                {num}+
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Property Type</h3>
        <div className="flex flex-wrap gap-2">
          {propertyTypeOptions.map((type) => (
            <Button
              key={type}
              variant={filters.propertyTypes.includes(type) ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const newTypes = filters.propertyTypes.includes(type)
                  ? filters.propertyTypes.filter((t) => t !== type)
                  : [...filters.propertyTypes, type];
                handleFilterChange({ propertyTypes: newTypes });
              }}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Features</h3>
        <div className="flex flex-wrap gap-2">
          {featureOptions.map((feature) => (
            <Button
              key={feature}
              variant={filters.features.includes(feature) ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const newFeatures = filters.features.includes(feature)
                  ? filters.features.filter((f) => f !== feature)
                  : [...filters.features, feature];
                handleFilterChange({ features: newFeatures });
              }}
            >
              {feature}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Properties</h2>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Filter size={18} className="mr-2" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh] rounded-t-xl">
              <SheetHeader className="mb-5">
                <SheetTitle>Filter Properties</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto h-[calc(100%-10rem)] pr-1">
                <FiltersContent />
              </div>
              <SheetFooter className="flex flex-row justify-between mt-6 gap-2">
                <Button variant="outline" onClick={resetFilters} className="flex-1">
                  Reset
                </Button>
                <Button className="flex-1">Apply Filters</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center gap-3">
            {/* Price Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  Price
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <div className="space-y-4">
                  <h3 className="font-medium">Price Range</h3>
                  <Slider
                    defaultValue={[filters.minPrice, filters.maxPrice]}
                    min={0}
                    max={5000000}
                    step={50000}
                    onValueChange={(value) => {
                      handleFilterChange({
                        minPrice: value[0],
                        maxPrice: value[1],
                      });
                    }}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>{formatPrice(filters.minPrice)}</span>
                    <span>{formatPrice(filters.maxPrice)}</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Beds & Baths Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  Beds & Baths
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="font-medium">Bedrooms</h3>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <Button
                          key={`bed-${num}`}
                          variant={filters.bedrooms.includes(num) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const newBedrooms = filters.bedrooms.includes(num)
                              ? filters.bedrooms.filter((bed) => bed !== num)
                              : [...filters.bedrooms, num];
                            handleFilterChange({ bedrooms: newBedrooms });
                          }}
                        >
                          {num}+
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium">Bathrooms</h3>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <Button
                          key={`bath-${num}`}
                          variant={filters.bathrooms.includes(num) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const newBathrooms = filters.bathrooms.includes(num)
                              ? filters.bathrooms.filter((bath) => bath !== num)
                              : [...filters.bathrooms, num];
                            handleFilterChange({ bathrooms: newBathrooms });
                          }}
                        >
                          {num}+
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Property Type Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Property Type
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Property Types</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {propertyTypeOptions.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={filters.propertyTypes.includes(type)}
                    onCheckedChange={(checked) => {
                      const newTypes = checked
                        ? [...filters.propertyTypes, type]
                        : filters.propertyTypes.filter((t) => t !== type);
                      handleFilterChange({ propertyTypes: newTypes });
                    }}
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Features Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Features
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Features</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {featureOptions.map((feature) => (
                  <DropdownMenuCheckboxItem
                    key={feature}
                    checked={filters.features.includes(feature)}
                    onCheckedChange={(checked) => {
                      const newFeatures = checked
                        ? [...filters.features, feature]
                        : filters.features.filter((f) => f !== feature);
                      handleFilterChange({ features: newFeatures });
                    }}
                  >
                    {feature}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                <X size={16} className="mr-2" />
                Reset
              </Button>
            )}
          </div>
        )}
      </div>

      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 mb-2">
          {filters.minPrice > initialFilters.minPrice && (
            <Badge variant="secondary" className="px-3 py-1">
              Min: {formatPrice(filters.minPrice)}
              <X
                size={14}
                className="ml-2 cursor-pointer"
                onClick={() => handleFilterChange({ minPrice: initialFilters.minPrice })}
              />
            </Badge>
          )}
          
          {filters.maxPrice < initialFilters.maxPrice && (
            <Badge variant="secondary" className="px-3 py-1">
              Max: {formatPrice(filters.maxPrice)}
              <X
                size={14}
                className="ml-2 cursor-pointer"
                onClick={() => handleFilterChange({ maxPrice: initialFilters.maxPrice })}
              />
            </Badge>
          )}
          
          {filters.bedrooms.map((bed) => (
            <Badge key={`bed-badge-${bed}`} variant="secondary" className="px-3 py-1">
              {bed}+ Beds
              <X
                size={14}
                className="ml-2 cursor-pointer"
                onClick={() => {
                  const newBedrooms = filters.bedrooms.filter((b) => b !== bed);
                  handleFilterChange({ bedrooms: newBedrooms });
                }}
              />
            </Badge>
          ))}
          
          {filters.bathrooms.map((bath) => (
            <Badge key={`bath-badge-${bath}`} variant="secondary" className="px-3 py-1">
              {bath}+ Baths
              <X
                size={14}
                className="ml-2 cursor-pointer"
                onClick={() => {
                  const newBathrooms = filters.bathrooms.filter((b) => b !== bath);
                  handleFilterChange({ bathrooms: newBathrooms });
                }}
              />
            </Badge>
          ))}
          
          {filters.propertyTypes.map((type) => (
            <Badge key={`type-badge-${type}`} variant="secondary" className="px-3 py-1">
              {type}
              <X
                size={14}
                className="ml-2 cursor-pointer"
                onClick={() => {
                  const newTypes = filters.propertyTypes.filter((t) => t !== type);
                  handleFilterChange({ propertyTypes: newTypes });
                }}
              />
            </Badge>
          ))}
          
          {filters.features.map((feature) => (
            <Badge key={`feature-badge-${feature}`} variant="secondary" className="px-3 py-1">
              {feature}
              <X
                size={14}
                className="ml-2 cursor-pointer"
                onClick={() => {
                  const newFeatures = filters.features.filter((f) => f !== feature);
                  handleFilterChange({ features: newFeatures });
                }}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
