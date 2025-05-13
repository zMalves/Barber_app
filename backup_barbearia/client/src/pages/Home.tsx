import React from "react";
import { Link } from "wouter";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  return (
    <AppLayout>
      <div className="relative bg-primary text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Um corte perfeito para a sua melhor versão
            </h1>
            <p className="text-lg mb-8 text-gray-300">
              Agende seu horário conosco e experimente um atendimento de excelência com os melhores profissionais.
            </p>
            <Link href="/appointment">
              <Button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 text-lg">
                Agendar Agora
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center" style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80')"
        }}></div>
      </div>

      <div className="py-12 lg:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">Nossos Serviços</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-primary mx-auto mb-4 text-2xl">
                <i className="ri-scissors-line"></i>
              </div>
              <h3 className="font-bold text-lg mb-2">Corte Clássico</h3>
              <p className="text-gray-600 mb-4">Cortes tradicionais para homens de estilo.</p>
              <p className="font-bold text-secondary">A partir de R$ 45,00</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-primary mx-auto mb-4 text-2xl">
                <i className="ri-scissors-2-line"></i>
              </div>
              <h3 className="font-bold text-lg mb-2">Barba Completa</h3>
              <p className="text-gray-600 mb-4">Tratamento completo para sua barba.</p>
              <p className="font-bold text-secondary">A partir de R$ 35,00</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-primary mx-auto mb-4 text-2xl">
                <i className="ri-brush-line"></i>
              </div>
              <h3 className="font-bold text-lg mb-2">Combo</h3>
              <p className="text-gray-600 mb-4">Corte + barba com preço especial.</p>
              <p className="font-bold text-secondary">A partir de R$ 70,00</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-primary mx-auto mb-4 text-2xl">
                <i className="ri-magic-line"></i>
              </div>
              <h3 className="font-bold text-lg mb-2">Degradê</h3>
              <p className="text-gray-600 mb-4">Cortes modernos com técnicas avançadas.</p>
              <p className="font-bold text-secondary">A partir de R$ 60,00</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/appointment">
              <Button className="bg-secondary hover:bg-secondary/90 text-white">
                Ver Todos os Serviços
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-12 lg:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-4">Por que nos escolher?</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Na Barber Shop, combinamos tradição e modernidade para oferecer a melhor experiência.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mb-4">
                <i className="ri-trophy-line text-xl"></i>
              </div>
              <h3 className="font-bold text-lg mb-2">Profissionais Qualificados</h3>
              <p className="text-gray-600">
                Nossa equipe é formada por barbeiros com anos de experiência e constante atualização.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mb-4">
                <i className="ri-scissors-line text-xl"></i>
              </div>
              <h3 className="font-bold text-lg mb-2">Produtos Premium</h3>
              <p className="text-gray-600">
                Utilizamos apenas os melhores produtos para garantir um resultado impecável.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mb-4">
                <i className="ri-calendar-check-line text-xl"></i>
              </div>
              <h3 className="font-bold text-lg mb-2">Agendamento Fácil</h3>
              <p className="text-gray-600">
                Sistema prático e rápido para você agendar seu horário sem complicações.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Pronto para transformar seu visual?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Agende seu horário agora e experimente o melhor atendimento da cidade. Estamos ansiosos para recebê-lo.
          </p>
          <Link href="/appointment">
            <Button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 text-lg">
              Agendar Horário
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
