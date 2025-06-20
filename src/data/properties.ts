
import { Property } from "@/types/property";

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Luxury Villa",
    price: 2500000,
    address: "123 Sunset Boulevard",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90210",
    description: "A stunning modern villa with panoramic ocean views, featuring an open floor plan, floor-to-ceiling windows, and premium finishes throughout. The property includes a private infinity pool, outdoor kitchen, and smart home technology.",
    bedrooms: 5,
    bathrooms: 6,
    squareFeet: 4200,
    propertyType: "Villa",
    yearBuilt: 2019,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
    ],
    features: ["Pool", "Smart Home", "Ocean View", "Garden", "Garage"],
    lat: 34.0901,
    lng: -118.4065,
    isFeatured: true
  },
  {
    id: "2",
    title: "Downtown Penthouse",
    price: 1800000,
    address: "456 Financial Avenue",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    description: "Stunning penthouse in the heart of downtown with 360-degree city views. Features include high ceilings, hardwood floors, and a gourmet kitchen with top-of-the-line appliances. Building amenities include a fitness center, rooftop terrace, and 24-hour concierge.",
    bedrooms: 3,
    bathrooms: 3.5,
    squareFeet: 2800,
    propertyType: "Penthouse",
    yearBuilt: 2016,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?q=80&w=2076&auto=format&fit=crop"
    ],
    features: ["City View", "Concierge", "Fitness Center", "Rooftop", "Hardwood Floors"],
    lat: 40.7128,
    lng: -74.0060,
    isFeatured: true
  },
  {
    id: "3",
    title: "Waterfront Estate",
    price: 3800000,
    address: "789 Lakeside Drive",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    description: "Spectacular waterfront estate offering privacy and luxury. This property features a chef's kitchen, home theater, wine cellar, and a private dock. Surrounded by lush landscaping with breathtaking views of the lake and mountains.",
    bedrooms: 6,
    bathrooms: 7,
    squareFeet: 6500,
    propertyType: "Estate",
    yearBuilt: 2010,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074&auto=format&fit=crop", "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop", "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=2025&auto=format&fit=crop"
    ],
    features: ["Waterfront", "Home Theater", "Wine Cellar", "Dock", "Mountain View"],
    lat: 47.6062,
    lng: -122.3321,
    isFeatured: false
  },
  {
    id: "4",
    title: "Historic Brownstone",
    price: 1600000,
    address: "321 Heritage Lane",
    city: "Boston",
    state: "MA",
    zipCode: "02108",
    description: "Charming historic brownstone with original architectural details and modern upgrades. Features include high ceilings, crown moldings, and a renovated kitchen and bathrooms. Conveniently located near parks, restaurants, and public transportation.",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3200,
    propertyType: "Townhouse",
    yearBuilt: 1890,
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop", "https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=2080&auto=format&fit=crop", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
    ],
    features: ["Historic", "Renovated", "Crown Molding", "Park Nearby", "Public Transit"],
    lat: 42.3601,
    lng: -71.0589,
    isFeatured: false
  },
  {
    id: "5",
    title: "Modern Eco-Friendly Home",
    price: 1200000,
    address: "555 Green Street",
    city: "Portland",
    state: "OR",
    zipCode: "97201",
    description: "Sustainable modern home with LEED certification. Features include solar panels, rainwater harvesting system, energy-efficient appliances, and reclaimed materials throughout. Enjoy the large outdoor living space with native landscaping.",
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2400,
    propertyType: "Single Family",
    yearBuilt: 2020,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop", "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=2065&auto=format&fit=crop", "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?q=80&w=2070&auto=format&fit=crop"
    ],
    features: ["Eco-Friendly", "Solar Panels", "Energy Efficient", "Sustainable", "LEED Certified"],
    lat: 45.5051,
    lng: -122.6750,
    isFeatured: false
  },
  {
    id: "6",
    title: "Beachfront Condo",
    price: 950000,
    address: "888 Shoreline Way",
    city: "Miami",
    state: "FL",
    zipCode: "33139",
    description: "Stunning beachfront condo with direct ocean access. Recently renovated with high-end finishes and an open concept layout. Building amenities include multiple pools, fitness center, spa, and 24-hour security.",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1800,
    propertyType: "Condo",
    yearBuilt: 2008,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop", "https://images.unsplash.com/photo-1600607687644-c7f34b5063c7?q=80&w=2070&auto=format&fit=crop"
    ],
    features: ["Beachfront", "Pool", "Fitness Center", "Spa", "Security"],
    lat: 25.7617,
    lng: -80.1918,
    isFeatured: true
  },
  {
    id: "7",
    title: "Mountain Retreat",
    price: 1350000,
    address: "777 Alpine Road",
    city: "Aspen",
    state: "CO",
    zipCode: "81611",
    description: "Cozy mountain retreat with breathtaking views. Features include stone fireplace, exposed wood beams, gourmet kitchen, and large windows showcasing the natural surroundings. Perfect for year-round outdoor activities.",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2900,
    propertyType: "Cabin",
    yearBuilt: 2015,
    images: [
      "https://images.unsplash.com/photo-1575517111839-3a3843ee7cd5?q=80&w=2070&auto=format&fit=crop", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    ],
    features: ["Mountain View", "Fireplace", "Exposed Beams", "Hiking Nearby", "Skiing Nearby"],
    lat: 39.1911,
    lng: -106.8175,
    isFeatured: false
  },
  {
    id: "8",
    title: "Midcentury Modern Gem",
    price: 875000,
    address: "432 Retro Avenue",
    city: "Palm Springs",
    state: "CA",
    zipCode: "92262",
    description: "Iconic midcentury modern home with preserved architectural details and tasteful updates. Features include terrazzo floors, clerestory windows, and an indoor-outdoor living space. Enjoy the private pool and desert landscaping.",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1950,
    propertyType: "Single Family",
    yearBuilt: 1962,
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2065&auto=format&fit=crop", "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop", "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop"
    ],
    features: ["Midcentury", "Pool", "Terrazzo", "Desert View", "Architectural"],
    lat: 33.8303,
    lng: -116.5453,
    isFeatured: false
  }
];
