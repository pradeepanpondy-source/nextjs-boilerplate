"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cartContext";

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = async () => {
    if (state.items.length === 0) return;

    setIsCheckingOut(true);
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCheckoutSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (checkoutSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Successful!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase! You'll receive a confirmation email shortly with pickup details.
            </p>
            <div className="space-y-3">
              <Link href="/shop">
                <Button className="w-full">Continue Shopping</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">Back to Home</Button>
              </Link>
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="mt-2 text-lg text-gray-600">
                Review your items and proceed to checkout
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Items</div>
              <div className="text-2xl font-bold text-gray-900">{state.itemCount}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {state.items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Cart Items ({state.itemCount})
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>

                <div className="divide-y">
                  {state.items.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.name}
                          </h3>
                          {item.farmName && (
                            <p className="text-sm text-gray-500 mt-1">
                              from {item.farmName}
                            </p>
                          )}
                          <p className="text-lg font-semibold text-gray-900 mt-2">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>

                        <div className="flex items-center space-x-4 ml-6">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                              className="w-16 text-center"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>

                          {/* Item Total */}
                          <div className="text-right min-w-[80px]">
                            <div className="text-lg font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.quantity} × ${item.price.toFixed(2)}
                            </div>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({state.itemCount} items)</span>
                      <span>${state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${(state.total * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${(state.total * 1.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut || state.items.length === 0}
                    className="w-full"
                    size="lg"
                  >
                    {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                  </Button>

                  <div className="text-center">
                    <Link href="/shop">
                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>

                  {/* Pickup Information */}
                  <div className="bg-blue-50 rounded-lg p-4 mt-6">
                    <h4 className="font-medium text-blue-900 mb-2">📦 Pickup Information</h4>
                    <p className="text-blue-700 text-sm">
                      Items will be available for pickup at the respective farms. 
                      You'll receive pickup instructions after checkout.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. 
              Start shopping to fill it up with fresh farm products!
            </p>
            <div className="space-x-4">
              <Link href="/shop">
                <Button size="lg">Start Shopping</Button>
              </Link>
              <Link href="/find-farms">
                <Button variant="outline" size="lg">Find Farms</Button>
              </Link>
            </div>
          </div>
        )}

        {/* Shopping Benefits */}
        {state.items.length > 0 && (
          <div className="mt-12 bg-green-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-green-900 mb-4">Why Shop With Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-green-800 mb-2">🌱 Farm Fresh</h4>
                <p className="text-green-700 text-sm">
                  Products are harvested fresh and delivered directly from local farms.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-green-800 mb-2">🚚 Free Delivery</h4>
                <p className="text-green-700 text-sm">
                  Enjoy free pickup at farm locations or arrange convenient delivery.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-green-800 mb-2">💚 Support Local</h4>
                <p className="text-green-700 text-sm">
                  Every purchase supports local farmers and sustainable agriculture.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
