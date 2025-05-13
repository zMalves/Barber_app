import { 
  Barber, InsertBarber, 
  Service, InsertService, 
  TimeSlot, InsertTimeSlot, 
  Appointment, InsertAppointment 
} from "@shared/schema";

export interface IStorage {
  // Barber operations
  getBarbers(): Promise<Barber[]>;
  getBarber(id: number): Promise<Barber | undefined>;
  createBarber(barber: InsertBarber): Promise<Barber>;
  
  // Service operations
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // TimeSlot operations
  getTimeSlots(barberId: number, date: string): Promise<TimeSlot[]>;
  getTimeSlot(id: number): Promise<TimeSlot | undefined>;
  createTimeSlot(timeSlot: InsertTimeSlot): Promise<TimeSlot>;
  updateTimeSlotAvailability(id: number, available: boolean): Promise<TimeSlot | undefined>;
  
  // Appointment operations
  getAppointments(): Promise<Appointment[]>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
}

export class MemStorage implements IStorage {
  private barbers: Map<number, Barber>;
  private services: Map<number, Service>;
  private timeSlots: Map<number, TimeSlot>;
  private appointments: Map<number, Appointment>;
  
  private barberCurrentId: number;
  private serviceCurrentId: number;
  private timeSlotCurrentId: number;
  private appointmentCurrentId: number;
  
  constructor() {
    this.barbers = new Map();
    this.services = new Map();
    this.timeSlots = new Map();
    this.appointments = new Map();
    
    this.barberCurrentId = 1;
    this.serviceCurrentId = 1;
    this.timeSlotCurrentId = 1;
    this.appointmentCurrentId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }
  
  private initializeData() {
    // Add sample barbers
    const barbers = [
      {
        name: "Miguel Silva",
        title: "Master Barber",
        experience: "8 anos de experiência",
        rating: "4.8",
        reviewCount: 124,
        imageUrl: "https://images.unsplash.com/photo-1581481615985-ba4775734a9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300&q=80",
        available: true
      },
      {
        name: "André Oliveira",
        title: "Style Specialist",
        experience: "5 anos de experiência",
        rating: "4.2",
        reviewCount: 98,
        imageUrl: "https://pixabay.com/get/g3b9b13414780061f51af95a80629e0a86820b4d6b56d29eb6be7d134e1e8e145dea662ea122c2adee7be0f44853c74035e85f9e054a8c9ebf00d09391ead557e_1280.jpg",
        available: true
      },
      {
        name: "Lucas Mendes",
        title: "Beard Specialist",
        experience: "3 anos de experiência",
        rating: "5.0",
        reviewCount: 57,
        imageUrl: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300&q=80",
        available: false
      }
    ];
    
    barbers.forEach(barber => this.createBarber(barber));
    
    // Add sample services
    const services = [
      {
        name: "Corte Clássico",
        description: "Inclui lavagem e finalização",
        price: 4500, // stored in cents
        duration: 30,
        icon: "ri-scissors-line"
      },
      {
        name: "Barba Completa",
        description: "Com toalha quente e produtos premium",
        price: 3500,
        duration: 20,
        icon: "ri-scissors-2-line"
      },
      {
        name: "Combo Corte e Barba",
        description: "Nosso serviço mais popular",
        price: 7000,
        duration: 50,
        icon: "ri-brush-line"
      },
      {
        name: "Degradê e Design",
        description: "Fade com detalhes personalizados",
        price: 6000,
        duration: 40,
        icon: "ri-magic-line"
      }
    ];
    
    services.forEach(service => this.createService(service));
    
    // Add sample time slots
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    const formatDate = (date: Date) => {
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };
    
    const todayFormatted = formatDate(today);
    const tomorrowFormatted = formatDate(tomorrow);
    
    // Time slots for today
    const times = [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
      "16:00", "16:30", "17:00", "17:30"
    ];
    
    times.forEach(time => {
      // For barber 1
      this.createTimeSlot({
        barberId: 1,
        time: time,
        date: todayFormatted,
        available: true
      });
      
      // For barber 2
      this.createTimeSlot({
        barberId: 2,
        time: time,
        date: todayFormatted,
        available: true
      });
      
      // For barber 3
      this.createTimeSlot({
        barberId: 3,
        time: time,
        date: todayFormatted,
        available: true // make all slots available
      });
      
      // For tomorrow (all barbers)
      [1, 2, 3].forEach(barberId => {
        this.createTimeSlot({
          barberId,
          time,
          date: tomorrowFormatted,
          available: true
        });
      });
    });
  }
  
  // Barber methods
  async getBarbers(): Promise<Barber[]> {
    return Array.from(this.barbers.values());
  }
  
  async getBarber(id: number): Promise<Barber | undefined> {
    return this.barbers.get(id);
  }
  
  async createBarber(barber: InsertBarber): Promise<Barber> {
    const id = this.barberCurrentId++;
    const newBarber: Barber = { ...barber, id };
    this.barbers.set(id, newBarber);
    return newBarber;
  }
  
  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  async createService(service: InsertService): Promise<Service> {
    const id = this.serviceCurrentId++;
    const newService: Service = { ...service, id };
    this.services.set(id, newService);
    return newService;
  }
  
  // TimeSlot methods
  async getTimeSlots(barberId: number, date: string): Promise<TimeSlot[]> {
    return Array.from(this.timeSlots.values()).filter(
      slot => slot.barberId === barberId && slot.date === date
    );
  }
  
  async getTimeSlot(id: number): Promise<TimeSlot | undefined> {
    return this.timeSlots.get(id);
  }
  
  async createTimeSlot(timeSlot: InsertTimeSlot): Promise<TimeSlot> {
    const id = this.timeSlotCurrentId++;
    const newTimeSlot: TimeSlot = { ...timeSlot, id };
    this.timeSlots.set(id, newTimeSlot);
    return newTimeSlot;
  }
  
  async updateTimeSlotAvailability(id: number, available: boolean): Promise<TimeSlot | undefined> {
    const timeSlot = this.timeSlots.get(id);
    if (!timeSlot) return undefined;
    
    const updatedTimeSlot = { ...timeSlot, available };
    this.timeSlots.set(id, updatedTimeSlot);
    return updatedTimeSlot;
  }
  
  // Appointment methods
  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }
  
  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }
  
  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentCurrentId++;
    const now = new Date();
    const newAppointment: Appointment = { 
      ...appointment, 
      id,
      createdAt: now
    };
    this.appointments.set(id, newAppointment);
    
    // Update time slot availability
    const timeSlots = await this.getTimeSlots(appointment.barberId, appointment.date);
    const matchingSlot = timeSlots.find(slot => slot.time === appointment.time);
    
    if (matchingSlot) {
      await this.updateTimeSlotAvailability(matchingSlot.id, false);
    }
    
    return newAppointment;
  }
}

import { dbStorage } from "./database-storage";

// Use DatabaseStorage instead of MemStorage
export const storage = dbStorage;
