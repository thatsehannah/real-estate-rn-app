import { Models } from "react-native-appwrite";

export interface Property extends Models.Row {
  name: string;
  address: string;
  description: string;
  type:
    | "House"
    | "Townhouse"
    | "Condo"
    | "Duplex"
    | "Studio"
    | "Villa"
    | "Apartment"
    | "Other";
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  geolocation: number;
  facilities: string[];
  image: URL;
}
