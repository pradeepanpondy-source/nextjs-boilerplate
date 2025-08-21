"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Farm Connect</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link href="/find-farms" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Find Farms
                </Link>
                <Link href="/shop" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Shop
                </Link>
                <Link href="/cart" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Cart
                </Link>
                <Link href="/seller" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Seller
                </Link>
                <Link href="/profile" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Profile
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                  <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t">
              <Link href="/" className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
              <Link href="/find-farms" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                Find Farms
              </Link>
              <Link href="/shop" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                Shop
              </Link>
              <Link href="/cart" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                Cart
              </Link>
              <Link href="/seller" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                Seller
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                Profile
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Connect with Local Farms
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover fresh produce, connect with local farmers, and support sustainable agriculture in your community.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/find-farms">
                  <Button size="lg" className="w-full">
                    Find Farms Near You
                  </Button>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/shop">
                  <Button variant="outline" size="lg" className="w-full">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Farm Connect?</h2>
            <p className="mt-4 text-lg text-gray-600">Everything you need to connect with local agriculture</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-3">🌱</span>
                  Fresh Produce
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get the freshest fruits and vegetables directly from local farms in your area.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-3">🚚</span>
                  Direct from Farm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Skip the middleman and buy directly from farmers for better prices and quality.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-3">🌍</span>
                  Support Local
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Support your local community and sustainable farming practices.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Quick Actions</h2>
            <p className="mt-4 text-lg text-gray-600">Get started with these popular features</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/find-farms" className="group">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">🔍</div>
                  <CardTitle>Find Farms</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Locate farms near your location
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/shop" className="group">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">🛒</div>
                  <CardTitle>Shop Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Browse fresh produce and goods
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/seller" className="group">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">👨‍🌾</div>
                  <CardTitle>Become a Seller</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Start selling your farm products
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/profile" className="group">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">👤</div>
                  <CardTitle>My Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Manage your account settings
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Farm Connect</h3>
            <p className="text-gray-400 mb-8">Connecting communities with local agriculture</p>
            <div className="flex justify-center space-x-6">
              <Link href="/find-farms" className="text-gray-400 hover:text-white">Find Farms</Link>
              <Link href="/shop" className="text-gray-400 hover:text-white">Shop</Link>
              <Link href="/seller" className="text-gray-400 hover:text-white">Seller</Link>
              <Link href="/profile" className="text-gray-400 hover:text-white">Profile</Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400 text-sm">© 2024 Farm Connect. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
