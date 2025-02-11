"use client";

import { useState } from "react";
import { Star, Truck, ShoppingCart, Heart, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Header from "./Header";
import { ProductPageProps } from "../app/types";

export default function ProductPage({ product }: ProductPageProps) {
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [pincode, setPincode] = useState("");

  const handlePreviousMedia = () => {
    setSelectedMedia((prev) => (prev === 0 ? product.media.length - 1 : prev - 1));
  };

  const handleNextMedia = () => {
    setSelectedMedia((prev) => (prev === product.media.length - 1 ? 0 : prev + 1));
  };

  const getMediaUrl = (path?: string) => {
    // Add https://d1o2glsg6m692z.cloudfront.net/ base URL to the path using new URL() to handle slash etc properly
    if (path) return new URL(path, "https://d1o2glsg6m692z.cloudfront.net/").toString();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Media Gallery */}
          <div className="space-y-6">
            {/* Main Media Display */}
            <div className="aspect-square relative rounded-xl overflow-hidden border bg-gray-50">
              {/* Navigation Arrows */}
              <button
                onClick={handlePreviousMedia}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextMedia}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Media Content */}
              <div className="w-full h-full transition-opacity duration-300">
                {product.media[selectedMedia].type === "image" ? (
                  <img
                    src={getMediaUrl(product.media[selectedMedia].url)}
                    alt={`${product.name} ${selectedMedia + 1}`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      src={getMediaUrl(product.media[selectedMedia].url)}
                      poster={getMediaUrl(product.media[selectedMedia].poster)}
                      controls
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="relative w-full overflow-x-auto">
              <div className="flex gap-4 min-w-0">
                {product.media.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedMedia(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${selectedMedia === index
                        ? "ring-2 ring-black scale-95"
                        : "hover:scale-95 opacity-70 hover:opacity-100"
                      }`}
                  >
                    {media.type === "image" ? (
                      <img
                        src={getMediaUrl(media.url)}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <img
                          src={getMediaUrl(media.poster)}
                          alt={`${product.name} video thumbnail`}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.reviewCount} reviews
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">${product.price}</div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-3 text-green-600 bg-green-50 p-4 rounded-lg">
              <Truck className="w-5 h-5" />
              <span className="font-medium">{product.shippingInfo}</span>
            </div>

            <div className="space-y-6">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="max-w-[200px]"
                />
                <Button variant="outline" className="font-medium">Check Delivery</Button>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1 h-12 text-base font-medium bg-black hover:bg-gray-800 text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="h-12 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24">
          {!product.reviews && <p>Reviews is undefined</p>}
          {product.reviews && !Array.isArray(product.reviews) && <p>Reviews is not an array</p>}
          {product.reviews && Array.isArray(product.reviews) && product.reviews.length === 0 && <p>No reviews yet</p>}
          {product.reviews && Array.isArray(product.reviews) && product.reviews.length > 0 && (
            <div className="grid gap-8">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-8 last:border-0"
                >
                  <div className="flex items-start gap-6">
                    <img
                      src={getMediaUrl(review.profileImage)}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{review.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                        {review.reviewImage && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="flex-shrink-0">
                                <img
                                  src={getMediaUrl(review.reviewImage)}
                                  alt="Review image"
                                  className="w-24 h-24 rounded-lg object-cover hover:opacity-90 transition-opacity"
                                />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogTitle>Review Photo</DialogTitle>
                              <img
                                src={getMediaUrl(review.reviewImage)}
                                alt="Review"
                                className="w-full rounded-lg"
                              />
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed">{review.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 