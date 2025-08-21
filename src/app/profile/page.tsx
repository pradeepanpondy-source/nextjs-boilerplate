"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  preferences: string[];
  memberSince: string;
  totalOrders: number;
  favoriteProducts: string[];
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Mock user profile data (in real app, this would come from API/database)
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    address: "123 Farm Road",
    city: "Springfield",
    state: "CA",
    zipCode: "90210",
    preferences: ["Organic Products", "Local Farms", "Seasonal Produce"],
    memberSince: "January 2023",
    totalOrders: 24,
    favoriteProducts: ["Organic Tomatoes", "Farm Fresh Eggs", "Wildflower Honey"]
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [newPreference, setNewPreference] = useState("");

  const handleInputChange = (field: keyof UserProfile, value: string | number) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  };

  const addPreference = () => {
    if (newPreference.trim() && !editedProfile.preferences.includes(newPreference.trim())) {
      setEditedProfile(prev => ({
        ...prev,
        preferences: [...prev.preferences, newPreference.trim()]
      }));
      setNewPreference("");
    }
  };

  const removePreference = (preference: string) => {
    setEditedProfile(prev => ({
      ...prev,
      preferences: prev.preferences.filter(p => p !== preference)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      // Simulate API call to save profile
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would make an API call to save the profile
      setProfile(editedProfile);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Save error:", error);
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    setError(null);
  };

  const handleExportToExcel = async () => {
    setIsExporting(true);
    setError(null);

    try {
      const response = await fetch('/api/exportProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `profile_${profile.firstName}_${profile.lastName}_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setSuccessMessage("Profile exported successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Export error:", error);
      setError("Failed to export profile. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
              <p className="mt-2 text-lg text-gray-600">
                Manage your account information and preferences
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={handleExportToExcel}
                disabled={isExporting}
                variant="outline"
              >
                {isExporting ? "Exporting..." : "📊 Export to Excel"}
              </Button>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              ) : (
                <div className="space-x-2">
                  <Button onClick={handleCancel} variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-green-800 text-sm">✅ {successMessage}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800 text-sm">❌ {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  {isEditing ? "Update your personal details" : "Your current profile information"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={isEditing ? editedProfile.firstName : profile.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={isEditing ? editedProfile.lastName : profile.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editedProfile.email : profile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={isEditing ? editedProfile.phone : profile.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={isEditing ? editedProfile.address : profile.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={isEditing ? editedProfile.city : profile.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={isEditing ? editedProfile.state : profile.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      value={isEditing ? editedProfile.zipCode : profile.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Shopping Preferences</h3>
                  
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        value={newPreference}
                        onChange={(e) => setNewPreference(e.target.value)}
                        placeholder="Add a preference (e.g., Organic Products)"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPreference())}
                      />
                      <Button type="button" onClick={addPreference} variant="outline">
                        Add
                      </Button>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {(isEditing ? editedProfile.preferences : profile.preferences).map((preference, index) => (
                      <Badge key={index} variant="secondary" className={isEditing ? "cursor-pointer" : ""}>
                        {preference}
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => removePreference(preference)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Member Since</div>
                  <div className="text-lg font-semibold">{profile.memberSince}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Total Orders</div>
                  <div className="text-lg font-semibold">{profile.totalOrders}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-2">Favorite Products</div>
                  <div className="space-y-1">
                    {profile.favoriteProducts.map((product, index) => (
                      <div key={index} className="text-sm bg-gray-100 rounded px-2 py-1">
                        {product}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Data Export</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Export your profile data to an Excel file for your records or to share with other services.
                </p>
                <Button
                  onClick={handleExportToExcel}
                  disabled={isExporting}
                  className="w-full"
                  variant="outline"
                >
                  {isExporting ? "Exporting..." : "📊 Export Profile Data"}
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  The exported file will include all your profile information, preferences, and account summary.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Privacy & Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">🔒 Data Security</h4>
              <p className="text-blue-700 text-sm">
                Your personal information is encrypted and securely stored. We never share your data with third parties without your consent.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">📊 Data Export</h4>
              <p className="text-blue-700 text-sm">
                You can export your data at any time. The Excel file contains all your profile information in a readable format.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
