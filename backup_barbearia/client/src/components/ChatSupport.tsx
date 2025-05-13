import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatSupportProps {
  onClose: () => void;
}

interface Message {
  sender: "user" | "support";
  text: string;
}

const ChatSupport: React.FC<ChatSupportProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "support", text: "Olá! Como posso ajudar você hoje?" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    setMessages(prev => [...prev, { sender: "user", text: newMessage }]);
    setNewMessage("");
    
    // Simulate automated response
    setTimeout(() => {
      let response = "Claro, posso ajudar com isso. Por favor, forneça mais detalhes.";
      
      if (newMessage.toLowerCase().includes("reagendar")) {
        response = "Claro, posso ajudar com isso. Você já tem um agendamento conosco?";
      } else if (newMessage.toLowerCase().includes("cancelar")) {
        response = "Para cancelamentos, precisamos do seu nome e data do agendamento. Pode nos informar?";
      } else if (newMessage.toLowerCase().includes("preço") || newMessage.toLowerCase().includes("valor")) {
        response = "Temos cortes a partir de R$ 35,00. O preço varia de acordo com o serviço e o barbeiro escolhido.";
      }
      
      setMessages(prev => [...prev, { sender: "support", text: response }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-4 lg:right-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col z-50" style={{ height: "400px" }}>
      <div className="bg-primary text-white p-4 flex justify-between items-center">
        <h3 className="font-bold">Atendimento</h3>
        <Button variant="ghost" className="h-auto p-1 text-white hover:text-secondary" onClick={onClose}>
          <i className="ri-close-line text-xl"></i>
        </Button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-3">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex items-start ${message.sender === "user" ? "flex-row-reverse" : ""} mb-3`}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                message.sender === "user" ? "bg-secondary ml-2" : "bg-primary mr-2"
              } flex-shrink-0`}
            >
              <i className={message.sender === "user" ? "ri-user-line" : "ri-customer-service-line"}></i>
            </div>
            <div 
              className={`${
                message.sender === "user" 
                  ? "bg-secondary text-white" 
                  : "bg-gray-100"
              } rounded-lg p-3 max-w-[80%]`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t">
        <div className="flex">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="Digite sua mensagem..."
          />
          <Button 
            className="bg-secondary hover:bg-secondary/90 text-white px-4 rounded-r-md"
            onClick={handleSendMessage}
          >
            <i className="ri-send-plane-line"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;
