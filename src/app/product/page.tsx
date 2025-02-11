import React from 'react';
import ProductPage from '@/components/ProductPage';
import { product } from "@/app/api/products/data";

export default async function Page() {
  return <ProductPage product={product} />;
} 