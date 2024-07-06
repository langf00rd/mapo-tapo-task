export interface Product {
  id: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  title: string;
  price: number;
  weight: number;
  minimumOrderQuantity: number;
  brand: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  sku: string;
  description: string;
  image: string;
  category: string;
  thumbnail: string;
  returnPolicy: string;
  images: string[];
  reviews: {
    rating: number;
    date: string;
    comment: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
}
