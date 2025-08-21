import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider, CartErrorBoundary } from "@/lib/cartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Farm Connect - Your Agricultural Marketplace",
  description: "Connect with local farms, shop fresh produce, and manage your agricultural needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <CartErrorBoundary>
            <CartProvider>
              {children}
            </CartProvider>
          </CartErrorBoundary>
        </div>
      </body>
    </html>
  );
}
