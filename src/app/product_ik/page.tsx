import React from 'react';
import ProductPage_imagekit from '@/components/ProductPage_imagekit';
import { product } from "@/app/api/products/data";

export default async function Page() {
  return <ProductPage_imagekit product={product} />;
} 