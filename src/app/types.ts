export type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  shippingInfo: string;
  media: Array<{
    type: string;
    url: string;
    poster?: string;
  }>;
  reviews: Array<{
    name: string;
    rating: number;
    date: string;
    profileImage: string;
    reviewImage: string;
    content: string;
  }>;
};

export type ProductPageProps = {
  product: Product;
}; 