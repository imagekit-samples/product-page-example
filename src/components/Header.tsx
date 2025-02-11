import { Search, User, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-12">
            <a href="/" className="flex items-center">
              <img 
                src="https://ik.imgkit.net/ikmedia/logo/light_T4buIzohVH.svg" 
                alt="Store Logo"
                className="h-8"
              />
            </a>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="/new" className="text-sm font-medium text-gray-700 hover:text-black">New Arrivals</a>
              <a href="/men" className="text-sm font-medium text-gray-700 hover:text-black">Men</a>
              <a href="/women" className="text-sm font-medium text-gray-700 hover:text-black">Women</a>
              <a href="/sale" className="text-sm font-medium text-gray-700 hover:text-black">Sale</a>
            </nav>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 