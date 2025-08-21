"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface SellerProfile {
  farmName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  specialties: string[];
  certifications: string[];
}

export default function SellerPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<SellerProfile>({
    farmName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    specialties: [],
    certifications: []
  });

  const [newSpecialty, setNewSpecialty] = useState("");
  const [newCertification, setNewCertification] = useState("");

  const handleInputChange = (field: keyof SellerProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !profile.specialties.includes(newSpecialty.trim())) {
      setProfile(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setProfile(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const addCertification = () => {
    if (newCertification.trim() && !profile.certifications.includes(newCertification.trim())) {
      setProfile(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification("");
    }
  };

  const removeCertification = (certification: string) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== certification)
    }));
  };

  const validateForm = (): boolean => {
    if (!profile.farmName.trim()) {
      setError("Farm name is required");
      return false;
    }
    if (!profile.ownerName.trim()) {
      setError("Owner name is required");
      return false;
    }
    if (!profile.email.trim() || !profile.email.includes("@")) {
      setError("Valid email is required");
      return false;
    }
    if (!profile.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!profile.address.trim()) {
      setError("Address is required");
      return false;
    }
    if (!profile.description.trim()) {
      setError("Farm description is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call to register seller
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would make an API call to save the seller profile
      console.log("Seller profile submitted:", profile);
      
      setIsRegistered(true);
    } catch (error) {
      console.error("Registration error:", error);
      setError("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Farm Connect!</h1>
            <p className="text-gray-600 mb-6">
              Your seller profile has been submitted successfully. Our team will review your application and contact you within 2-3 business days.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => {
                  setIsRegistered(false);
                  setProfile({
                    farmName: "",
                    ownerName: "",
                    email: "",
                    phone: "",
                    address: "",
                    description: "",
                    specialties: [],
                    certifications: []
                  });
                }}
                className="w-full"
              >
                Register Another Farm
              </Button>
              <Button variant="outline" className="w-full">
                <a href="/">Back to Home</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Become a Seller</h1>
            <p className="mt-4 text-lg text-gray-600">
              Join our marketplace and connect with customers in your community
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Benefits Section */}
        <div className="bg-blue-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Why Sell With Farm Connect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">🌱 Direct Sales</h3>
              <p className="text-blue-700 text-sm">
                Sell directly to customers without middlemen and keep more profit.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">📱 Easy Management</h3>
              <p className="text-blue-700 text-sm">
                Simple tools to manage your products, orders, and customer communications.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">🤝 Community Support</h3>
              <p className="text-blue-700 text-sm">
                Connect with local customers who value fresh, sustainable produce.
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Seller Registration</CardTitle>
            <CardDescription>
              Fill out the form below to start selling your farm products on our platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmName">Farm Name *</Label>
                    <Input
                      id="farmName"
                      value={profile.farmName}
                      onChange={(e) => handleInputChange("farmName", e.target.value)}
                      placeholder="Enter your farm name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerName">Owner Name *</Label>
                    <Input
                      id="ownerName"
                      value={profile.ownerName}
                      onChange={(e) => handleInputChange("ownerName", e.target.value)}
                      placeholder="Enter owner's full name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Farm Address *</Label>
                  <Textarea
                    id="address"
                    value={profile.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter complete farm address"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Farm Description *</Label>
                  <Textarea
                    id="description"
                    value={profile.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your farm, farming practices, and what makes you unique"
                    rows={4}
                    required
                  />
                </div>
              </div>

              {/* Specialties */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Specialties</h3>
                <p className="text-sm text-gray-600">
                  Add the types of products you grow or produce
                </p>
                
                <div className="flex gap-2">
                  <Input
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    placeholder="e.g., Organic Vegetables, Fresh Fruits"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                  />
                  <Button type="button" onClick={addSpecialty} variant="outline">
                    Add
                  </Button>
                </div>

                {profile.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {profile.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer">
                        {specialty}
                        <button
                          type="button"
                          onClick={() => removeSpecialty(specialty)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Certifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Certifications (Optional)</h3>
                <p className="text-sm text-gray-600">
                  Add any certifications your farm has (e.g., Organic, Non-GMO)
                </p>
                
                <div className="flex gap-2">
                  <Input
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    placeholder="e.g., USDA Organic, Fair Trade"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                  />
                  <Button type="button" onClick={addCertification} variant="outline">
                    Add
                  </Button>
                </div>

                {profile.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {profile.certifications.map((certification, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer">
                        {certification}
                        <button
                          type="button"
                          onClick={() => removeCertification(certification)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? "Submitting Application..." : "Submit Seller Application"}
                </Button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  By submitting this form, you agree to our terms of service and seller policies.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What Happens Next?</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Application Review</h4>
                <p className="text-gray-600 text-sm">Our team will review your application within 2-3 business days.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Account Setup</h4>
                <p className="text-gray-600 text-sm">Once approved, we'll help you set up your seller account and product listings.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Start Selling</h4>
                <p className="text-gray-600 text-sm">Begin listing your products and connecting with local customers!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
