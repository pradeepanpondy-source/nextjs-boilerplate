"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Farm {
  id: string;
  name: string;
  location: string;
  distance: string;
  description: string;
  specialties: string[];
  rating: number;
  contact: string;
}

export default function FindFarmsPage() {
  const [searchLocation, setSearchLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock farm data for demonstration
  const mockFarms: Farm[] = [
    {
      id: "1",
      name: "Green Valley Farm",
      location: "Springfield Valley",
      distance: "2.3 miles",
      description: "Organic vegetables and fruits grown with sustainable farming practices. Family-owned for over 30 years.",
      specialties: ["Organic Vegetables", "Fresh Fruits", "Herbs"],
      rating: 4.8,
      contact: "(555) 123-4567"
    },
    {
      id: "2",
      name: "Sunrise Dairy Farm",
      location: "Meadowbrook",
      distance: "4.1 miles",
      description: "Fresh dairy products from grass-fed cows. We also offer farm tours and educational programs.",
      specialties: ["Dairy Products", "Cheese", "Farm Tours"],
      rating: 4.6,
      contact: "(555) 234-5678"
    },
    {
      id: "3",
      name: "Heritage Grain Farm",
      location: "Oakwood Plains",
      distance: "6.8 miles",
      description: "Specializing in heirloom grains and artisanal flour. Supporting traditional farming methods.",
      specialties: ["Heirloom Grains", "Artisanal Flour", "Wheat"],
      rating: 4.7,
      contact: "(555) 345-6789"
    },
    {
      id: "4",
      name: "Wildflower Honey Farm",
      location: "Blossom Hill",
      distance: "8.2 miles",
      description: "Pure wildflower honey and bee products. We practice sustainable beekeeping methods.",
      specialties: ["Wildflower Honey", "Bee Products", "Beeswax"],
      rating: 4.9,
      contact: "(555) 456-7890"
    }
  ];

  const handleSearch = async () => {
    if (!searchLocation.trim()) {
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filter farms based on search (simple mock implementation)
      const filteredFarms = mockFarms.filter(farm => 
        farm.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
        farm.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
        searchLocation.toLowerCase().includes("all") ||
        searchLocation.trim() === ""
      );

      setFarms(filteredFarms);
    } catch (error) {
      console.error("Error searching farms:", error);
      setFarms([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Find Farms Near You</h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover local farms in your area and connect with fresh, sustainable produce
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Search for Farms</h2>
            <p className="text-gray-600">Enter your location to find nearby farms</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter your city, zip code, or address..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full h-12 text-lg"
                disabled={isLoading}
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isLoading || !searchLocation.trim()}
              size="lg"
              className="h-12 px-8"
            >
              {isLoading ? "Searching..." : "Find Farms"}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Try searching for "Springfield", "Meadowbrook", or "all" to see sample results
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-4 text-gray-600">Searching for farms near you...</p>
            </div>
          ) : farms.length > 0 ? (
            <>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  Found {farms.length} farm{farms.length !== 1 ? 's' : ''} near "{searchLocation}"
                </h3>
                <p className="text-gray-600 mt-2">Results sorted by distance</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {farms.map((farm) => (
                  <Card key={farm.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{farm.name}</CardTitle>
                          <CardDescription className="text-sm text-gray-500 mt-1">
                            📍 {farm.location} • {farm.distance} away
                          </CardDescription>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-400">⭐</span>
                          <span className="ml-1 text-sm font-medium">{farm.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {farm.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties:</h4>
                        <div className="flex flex-wrap gap-2">
                          {farm.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm text-gray-600">
                          📞 {farm.contact}
                        </div>
                        <Button size="sm" variant="outline">
                          Contact Farm
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No farms found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any farms near "{searchLocation}". Try searching with a different location.
              </p>
              <Button 
                onClick={() => {
                  setSearchLocation("");
                  setHasSearched(false);
                  setFarms([]);
                }}
                variant="outline"
              >
                Try Another Search
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Tips Section */}
      {!hasSearched && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Tips for Finding Farms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">🎯 Be Specific</h4>
                <p className="text-blue-700 text-sm">
                  Use your exact city name or zip code for the most accurate results.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">📱 Contact Directly</h4>
                <p className="text-blue-700 text-sm">
                  Call farms directly to check availability and visiting hours.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">🚗 Plan Your Visit</h4>
                <p className="text-blue-700 text-sm">
                  Many farms offer tours and direct sales - plan ahead for the best experience.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">🌱 Support Local</h4>
                <p className="text-blue-700 text-sm">
                  Buying local supports your community and reduces environmental impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
