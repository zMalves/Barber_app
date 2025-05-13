import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ChatSupport from "./ChatSupport";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Header */}
      <header className="lg:hidden bg-primary text-white py-4 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <i className="ri-scissors-2-line text-2xl text-secondary"></i>
          <h1 className="font-serif text-xl font-bold">Barber Shop</h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="text-white p-1">
              <i className="ri-menu-line text-2xl"></i>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-primary text-white pt-10 border-none">
            <nav className="flex flex-col space-y-6 text-lg mt-4">
              <Link href="/">
                <a className="flex items-center space-x-2 py-2 px-3 rounded hover:bg-primary-light transition">
                  <i className="ri-home-line"></i>
                  <span>Início</span>
                </a>
              </Link>
              <Link href="/appointment">
                <a className={`flex items-center space-x-2 py-2 px-3 rounded transition ${location === "/appointment" ? "bg-primary-light" : "hover:bg-primary-light"}`}>
                  <i className="ri-calendar-line"></i>
                  <span>Agendamentos</span>
                </a>
              </Link>
              <Link href="/services">
                <a className="flex items-center space-x-2 py-2 px-3 rounded hover:bg-primary-light transition">
                  <i className="ri-scissors-line"></i>
                  <span>Serviços</span>
                </a>
              </Link>
              <Link href="/profile">
                <a className="flex items-center space-x-2 py-2 px-3 rounded hover:bg-primary-light transition">
                  <i className="ri-user-line"></i>
                  <span>Meu Perfil</span>
                </a>
              </Link>
              <Link href="/about">
                <a className="flex items-center space-x-2 py-2 px-3 rounded hover:bg-primary-light transition">
                  <i className="ri-information-line"></i>
                  <span>Sobre</span>
                </a>
              </Link>
            </nav>
            <div className="mt-auto mb-8">
              <Button className="flex w-full items-center justify-center space-x-2 py-2 px-3 rounded bg-secondary text-white">
                <i className="ri-phone-line"></i>
                <span>Contato</span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Layout */}
      <div className="flex flex-1">
        {/* Sidebar (desktop only) */}
        <aside className="hidden lg:flex lg:w-64 bg-primary text-white flex-col fixed h-full">
          <div className="p-6 border-b border-primary-light">
            <div className="flex items-center space-x-2">
              <i className="ri-scissors-2-line text-2xl text-secondary"></i>
              <h1 className="font-serif text-xl font-bold">Barber Shop</h1>
            </div>
          </div>
          <nav className="flex-1 pt-6 px-4 space-y-1">
            <Link href="/">
              <a className={`flex items-center space-x-2 py-2 px-3 rounded transition ${location === "/" ? "bg-primary-light" : "hover:bg-primary-light"}`}>
                <i className="ri-home-line"></i>
                <span>Início</span>
              </a>
            </Link>
            <Link href="/appointment">
              <a className={`flex items-center space-x-2 py-2 px-3 rounded transition ${location === "/appointment" ? "bg-primary-light" : "hover:bg-primary-light"}`}>
                <i className="ri-calendar-line"></i>
                <span>Agendamentos</span>
              </a>
            </Link>
            <Link href="/services">
              <a className="flex items-center space-x-2 py-2 px-3 rounded hover:bg-primary-light transition">
                <i className="ri-scissors-line"></i>
                <span>Serviços</span>
              </a>
            </Link>
            <Link href="/profile">
              <a className="flex items-center space-x-2 py-2 px-3 rounded hover:bg-primary-light transition">
                <i className="ri-user-line"></i>
                <span>Meu Perfil</span>
              </a>
            </Link>
            <Link href="/about">
              <a className="flex items-center space-x-2 py-2 px-3 rounded hover:bg-primary-light transition">
                <i className="ri-information-line"></i>
                <span>Sobre</span>
              </a>
            </Link>
          </nav>
          <div className="p-4 mt-auto">
            <Button className="flex w-full items-center justify-center space-x-2 py-2 px-3 rounded bg-secondary text-white">
              <i className="ri-phone-line"></i>
              <span>Contato</span>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 pb-20">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-around items-center">
        <Link href="/">
          <a className={`flex flex-col items-center ${location === "/" ? "text-secondary" : "text-primary"}`}>
            <i className="ri-home-line text-xl"></i>
            <span className="text-xs mt-1">Início</span>
          </a>
        </Link>
        <Link href="/appointment">
          <a className={`flex flex-col items-center ${location === "/appointment" ? "text-secondary" : "text-primary"}`}>
            <i className="ri-calendar-line text-xl"></i>
            <span className="text-xs mt-1">Agendar</span>
          </a>
        </Link>
        <Link href="/profile">
          <a className="flex flex-col items-center text-primary">
            <i className="ri-user-line text-xl"></i>
            <span className="text-xs mt-1">Perfil</span>
          </a>
        </Link>
        <button 
          onClick={() => setIsChatOpen(true)} 
          className="flex flex-col items-center text-primary"
        >
          <i className="ri-customer-service-line text-xl"></i>
          <span className="text-xs mt-1">Suporte</span>
        </button>
      </nav>

      {/* Chat Support Widget */}
      {isChatOpen && <ChatSupport onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default AppLayout;
