import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const SimpleHeader: React.FC = () => {
  return (
    <header className="bg-primary text-white py-4 px-5">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <i className="ri-scissors-line text-2xl"></i>
            <h1 className="font-title text-xl font-bold">BarberShop</h1>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <div className="hover:text-gray-200 cursor-pointer">Inicio</div>
          </Link>
          <Link href="/onepage-appointment">
            <div className="hover:text-gray-200 cursor-pointer">Agendar</div>
          </Link>
        </nav>
        <Button className="text-primary bg-white hover:bg-gray-100">
          <i className="ri-phone-line mr-2"></i>
          (11) 9999-9999
        </Button>
      </div>
    </header>
  );
};

export default SimpleHeader;