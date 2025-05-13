import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SimpleHeader from "@/components/SimpleHeader";

const SimplifiedHome: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <SimpleHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-5">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-title font-bold mb-4">
              Agende seu corte na melhor barbearia da cidade
            </h1>
            <p className="text-lg mb-8 text-gray-100 opacity-90">
              Sistema de agendamento online para oferecer mais comodidade aos nossos clientes.
            </p>
            <Link href="/onepage-appointment">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Agendar Agora
                <i className="ri-arrow-right-line ml-2"></i>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-title font-bold text-center mb-12">Por que fazer seu agendamento online?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-primary mx-auto mb-4 text-2xl">
                <i className="ri-time-line"></i>
              </div>
              <h3 className="font-title font-bold text-lg mb-2">Economize Tempo</h3>
              <p className="text-gray-600">
                Faça seu agendamento em segundos e evite esperas desnecessárias.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-primary mx-auto mb-4 text-2xl">
                <i className="ri-calendar-check-line"></i>
              </div>
              <h3 className="font-title font-bold text-lg mb-2">Horários Flexíveis</h3>
              <p className="text-gray-600">
                Escolha o melhor horário que se encaixa na sua agenda.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-primary mx-auto mb-4 text-2xl">
                <i className="ri-user-star-line"></i>
              </div>
              <h3 className="font-title font-bold text-lg mb-2">Escolha seu Barbeiro</h3>
              <p className="text-gray-600">
                Selecione o profissional de sua preferência com quem você já tem afinidade.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/onepage-appointment">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Fazer Agendamento
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-5 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-title font-bold text-center mb-4">Nossos Serviços</h2>
          <p className="text-center text-gray-600 mb-12 max-w-lg mx-auto">
            Oferecemos diversos serviços para atender todas as suas necessidades
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary mx-auto mb-4 text-xl">
                <i className="ri-scissors-line"></i>
              </div>
              <h3 className="font-title font-bold text-lg mb-2">Corte Clássico</h3>
              <p className="text-gray-600 mb-4 text-sm">Inclui lavagem e finalização</p>
              <p className="font-bold text-primary">R$ 45,00</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary mx-auto mb-4 text-xl">
                <i className="ri-scissors-2-line"></i>
              </div>
              <h3 className="font-title font-bold text-lg mb-2">Barba</h3>
              <p className="text-gray-600 mb-4 text-sm">Tratamento completo para barba</p>
              <p className="font-bold text-primary">R$ 35,00</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary mx-auto mb-4 text-xl">
                <i className="ri-brush-line"></i>
              </div>
              <h3 className="font-title font-bold text-lg mb-2">Combo</h3>
              <p className="text-gray-600 mb-4 text-sm">Corte + barba com preço especial</p>
              <p className="font-bold text-primary">R$ 70,00</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary mx-auto mb-4 text-xl">
                <i className="ri-magic-line"></i>
              </div>
              <h3 className="font-title font-bold text-lg mb-2">Degradê</h3>
              <p className="text-gray-600 mb-4 text-sm">Cortes modernos com técnicas avançadas</p>
              <p className="font-bold text-primary">R$ 60,00</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/onepage-appointment">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Ver Todos os Serviços
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-2xl font-title font-bold mb-4">Pronto para agendar seu horário?</h2>
          <p className="text-gray-200 mb-8 max-w-lg mx-auto">
            Nossos profissionais estão prontos para atender você com excelência e cuidado
          </p>
          <Link href="/onepage-appointment">
            <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-6">
              Agendar Agora
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <i className="ri-scissors-line text-2xl"></i>
                <h2 className="font-title text-xl font-bold">BarberShop</h2>
              </div>
              <p className="text-gray-400 max-w-xs">
                Sistema de agendamento online para a melhor barbearia da cidade.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-title font-bold mb-4">Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Início</a></li>
                  <li><a href="#" className="hover:text-white">Serviços</a></li>
                  <li><a href="#" className="hover:text-white">Sobre</a></li>
                  <li><a href="#" className="hover:text-white">Contato</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-title font-bold mb-4">Contato</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center">
                    <i className="ri-map-pin-line mr-2"></i>
                    Rua Principal, 123
                  </li>
                  <li className="flex items-center">
                    <i className="ri-phone-line mr-2"></i>
                    (11) 9999-9999
                  </li>
                  <li className="flex items-center">
                    <i className="ri-mail-line mr-2"></i>
                    contato@barbershop.com
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-title font-bold mb-4">Horários</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Seg - Sex: 9h às 20h</li>
                  <li>Sábado: 9h às 18h</li>
                  <li>Domingo: Fechado</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© 2025 BarberShop. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimplifiedHome;