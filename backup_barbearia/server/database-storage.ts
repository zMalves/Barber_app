import { 
  Barber, InsertBarber, 
  Service, InsertService, 
  TimeSlot, InsertTimeSlot, 
  Appointment, InsertAppointment,
  barbers,
  services,
  timeSlots,
  appointments
} from "@shared/schema";
import { IStorage } from "./storage";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  // Barber methods
  async getBarbers(): Promise<Barber[]> {
    return db.select().from(barbers);
  }
  
  async getBarber(id: number): Promise<Barber | undefined> {
    const [barber] = await db.select().from(barbers).where(eq(barbers.id, id));
    return barber || undefined;
  }
  
  async createBarber(barber: InsertBarber): Promise<Barber> {
    const [newBarber] = await db.insert(barbers).values(barber).returning();
    return newBarber;
  }
  
  // Service methods
  async getServices(): Promise<Service[]> {
    return db.select().from(services);
  }
  
  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }
  
  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }
  
  // TimeSlot methods
  async getTimeSlots(barberId: number, date: string): Promise<TimeSlot[]> {
    return db.select()
      .from(timeSlots)
      .where(
        and(
          eq(timeSlots.barberId, barberId),
          eq(timeSlots.date, date)
        )
      );
  }
  
  async getTimeSlot(id: number): Promise<TimeSlot | undefined> {
    const [timeSlot] = await db.select().from(timeSlots).where(eq(timeSlots.id, id));
    return timeSlot || undefined;
  }
  
  async createTimeSlot(timeSlot: InsertTimeSlot): Promise<TimeSlot> {
    const [newTimeSlot] = await db.insert(timeSlots).values(timeSlot).returning();
    return newTimeSlot;
  }
  
  async updateTimeSlotAvailability(id: number, available: boolean): Promise<TimeSlot | undefined> {
    const [updatedTimeSlot] = await db
      .update(timeSlots)
      .set({ available })
      .where(eq(timeSlots.id, id))
      .returning();
    
    return updatedTimeSlot || undefined;
  }
  
  // Appointment methods
  async getAppointments(): Promise<Appointment[]> {
    return db.select().from(appointments);
  }
  
  async getAppointment(id: number): Promise<Appointment | undefined> {
    const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id));
    return appointment || undefined;
  }
  
  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    // Create the appointment
    const [newAppointment] = await db
      .insert(appointments)
      .values({
        ...appointment,
        createdAt: new Date()
      })
      .returning();
    
    // Find the matching time slot to update availability
    const matchingTimeSlots = await this.getTimeSlots(appointment.barberId, appointment.date);
    const matchingSlot = matchingTimeSlots.find(slot => slot.time === appointment.time);
    
    if (matchingSlot) {
      await this.updateTimeSlotAvailability(matchingSlot.id, false);
    }
    
    return newAppointment;
  }

  // Initialize sample data
  async initializeSampleData() {
    // Check if data already exists
    const existingBarbers = await this.getBarbers();
    if (existingBarbers.length > 0) {
      console.log("Sample data already exists, skipping initialization");
      return;
    }

    console.log("Initializing sample data...");

    // Sample barbers
    const barberData = [
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
        available: true
      }
    ];
    
    for (const barber of barberData) {
      await this.createBarber(barber);
    }
    
    // Sample services
    const serviceData = [
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
    
    for (const service of serviceData) {
      await this.createService(service);
    }
    
    // Add sample time slots
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    const formatDate = (date: Date) => {
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };
    
    const todayFormatted = formatDate(today);
    const tomorrowFormatted = formatDate(tomorrow);
    
    // Time slots for today and tomorrow
    const times = [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
      "16:00", "16:30", "17:00", "17:30"
    ];
    
    for (const time of times) {
      // For all barbers
      for (let barberId = 1; barberId <= 3; barberId++) {
        // Today's slots
        await this.createTimeSlot({
          barberId,
          time,
          date: todayFormatted,
          available: true
        });
        
        // Tomorrow's slots
        await this.createTimeSlot({
          barberId,
          time,
          date: tomorrowFormatted,
          available: true
        });
      }
    }
    
    console.log("Sample data initialized successfully");
  }
}

export const dbStorage = new DatabaseStorage();