
export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  propertyType: string;
  yearBuilt: number;
  images: string[];
  features: string[];
  lat: number;
  lng: number;
  isFeatured?: boolean;
}
