import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all barbers
  app.get("/api/barbers", async (req: Request, res: Response) => {
    try {
      const barbers = await storage.getBarbers();
      res.json(barbers);
    } catch (error) {
      console.error("Error fetching barbers:", error);
      res.status(500).json({ message: "Failed to fetch barbers" });
    }
  });

  // Get a specific barber by ID
  app.get("/api/barbers/:id", async (req: Request, res: Response) => {
    try {
      const barberId = parseInt(req.params.id);
      const barber = await storage.getBarber(barberId);
      
      if (!barber) {
        return res.status(404).json({ message: "Barber not found" });
      }
      
      res.json(barber);
    } catch (error) {
      console.error("Error fetching barber:", error);
      res.status(500).json({ message: "Failed to fetch barber" });
    }
  });

  // Get all services
  app.get("/api/services", async (req: Request, res: Response) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get time slots for a specific barber and date
  app.get("/api/timeslots", async (req: Request, res: Response) => {
    try {
      const barberId = parseInt(req.query.barberId as string);
      const date = req.query.date as string;
      
      if (isNaN(barberId) || !date) {
        return res.status(400).json({ message: "barberId and date are required" });
      }
      
      const timeSlots = await storage.getTimeSlots(barberId, date);
      res.json(timeSlots);
    } catch (error) {
      console.error("Error fetching time slots:", error);
      res.status(500).json({ message: "Failed to fetch time slots" });
    }
  });

  // Create a new appointment
  app.post("/api/appointments", async (req: Request, res: Response) => {
    try {
      const result = insertAppointmentSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const appointment = await storage.createAppointment(result.data);
      res.status(201).json(appointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      res.status(500).json({ message: "Failed to create appointment" });
    }
  });

  // Get an appointment by ID
  app.get("/api/appointments/:id", async (req: Request, res: Response) => {
    try {
      const appointmentId = parseInt(req.params.id);
      const appointment = await storage.getAppointment(appointmentId);
      
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      
      res.json(appointment);
    } catch (error) {
      console.error("Error fetching appointment:", error);
      res.status(500).json({ message: "Failed to fetch appointment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
