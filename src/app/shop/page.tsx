"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  farmName: string;
  inStock: boolean;
  unit: string;
}

export default function ShopPage() {
  const { addItem, state } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Mock product data
  const products: Product[] = [
    {
      id: "1",
      name: "Organic Tomatoes",
      price: 4.99,
      description: "Fresh, vine-ripened organic tomatoes. Perfect for salads and cooking.",
      category: "vegetables",
      farmName: "Green Valley Farm",
      inStock: true,
      unit: "per lb"
    },
    {
      id: "2",
      name: "Farm Fresh Eggs",
      price: 6.50,
      description: "Free-range eggs from happy hens. Rich in nutrients and flavor.",
      category: "dairy",
      farmName: "Sunrise Dairy Farm",
      inStock: true,
      unit: "per dozen"
    },
    {
      id: "3",
      name: "Artisanal Bread",
      price: 8.00,
      description: "Handcrafted sourdough bread made with heritage wheat flour.",
      category: "grains",
      farmName: "Heritage Grain Farm",
      inStock: true,
      unit: "per loaf"
    },
    {
      id: "4",
      name: "Wildflower Honey",
      price: 12.99,
      description: "Pure, raw wildflower honey harvested from local apiaries.",
      category: "pantry",
      farmName: "Wildflower Honey Farm",
      inStock: true,
      unit: "16 oz jar"
    },
    {
      id: "5",
      name: "Organic Spinach",
      price: 3.99,
      description: "Fresh baby spinach leaves, perfect for salads and smoothies.",
      category: "vegetables",
      farmName: "Green Valley Farm",
      inStock: true,
      unit: "per bunch"
    },
    {
      id: "6",
      name: "Fresh Milk",
      price: 5.25,
      description: "Whole milk from grass-fed cows, non-homogenized.",
      category: "dairy",
      farmName: "Sunrise Dairy Farm",
      inStock: false,
      unit: "per gallon"
    },
    {
      id: "7",
      name: "Heirloom Carrots",
      price: 2.99,
      description: "Colorful heirloom carrots in purple, orange, and yellow varieties.",
      category: "vegetables",
      farmName: "Green Valley Farm",
      inStock: true,
      unit: "per lb"
    },
    {
      id: "8",
      name: "Beeswax Candles",
      price: 15.99,
      description: "Hand-dipped beeswax candles with natural honey scent.",
      category: "pantry",
      farmName: "Wildflower Honey Farm",
      inStock: true,
      unit: "set of 2"
    }
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "vegetables", name: "Vegetables" },
    { id: "dairy", name: "Dairy" },
    { id: "grains", name: "Grains & Bread" },
    { id: "pantry", name: "Pantry Items" }
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = async (product: Product) => {
    if (!product.inStock) return;

    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        farmName: product.farmName
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isInCart = (productId: string) => {
    return state.items.some(item => item.id === productId);
  };

  const getCartQuantity = (productId: string) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Farm Shop</h1>
              <p className="mt-2 text-lg text-gray-600">
                Fresh products directly from local farms
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Cart Items</div>
              <div className="text-2xl font-bold text-gray-900">{state.itemCount}</div>
              <div className="text-sm text-gray-500">${state.total.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search products, farms, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''} Available
              </h2>
              {searchTerm && (
                <p className="text-gray-600 mt-1">
                  Showing results for "{searchTerm}"
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription className="text-sm text-gray-500 mt-1">
                          from {product.farmName}
                        </CardDescription>
                      </div>
                      {!product.inStock && (
                        <Badge variant="destructive" className="text-xs">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.unit}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.id === product.category)?.name}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {isInCart(product.id) && (
                        <div className="text-sm text-green-600 font-medium">
                          ✓ In cart ({getCartQuantity(product.id)})
                        </div>
                      )}
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock || isLoading}
                        className="w-full"
                        variant={isInCart(product.id) ? "outline" : "default"}
                      >
                        {!product.inStock 
                          ? "Out of Stock" 
                          : isLoading 
                            ? "Adding..." 
                            : isInCart(product.id)
                              ? "Add More"
                              : "Add to Cart"
                        }
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No products match "${searchTerm}" in the ${selectedCategory === "all" ? "selected" : categories.find(c => c.id === selectedCategory)?.name} category.`
                : `No products available in the ${categories.find(c => c.id === selectedCategory)?.name} category.`
              }
            </p>
            <div className="space-x-4">
              {searchTerm && (
                <Button 
                  onClick={() => setSearchTerm("")}
                  variant="outline"
                >
                  Clear Search
                </Button>
              )}
              {selectedCategory !== "all" && (
                <Button 
                  onClick={() => setSelectedCategory("all")}
                  variant="outline"
                >
                  View All Products
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Shopping Tips */}
        <div className="mt-12 bg-green-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-green-900 mb-4">Shopping Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-green-800 mb-2">🌱 Fresh & Local</h4>
              <p className="text-green-700 text-sm">
                All products are sourced directly from local farms for maximum freshness.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-green-800 mb-2">📦 Easy Pickup</h4>
              <p className="text-green-700 text-sm">
                Schedule convenient pickup times or arrange delivery from participating farms.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-green-800 mb-2">💚 Support Farmers</h4>
              <p className="text-green-700 text-sm">
                Your purchases directly support local farmers and sustainable agriculture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
