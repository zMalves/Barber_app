import { dbStorage } from "../server/database-storage";

async function main() {
  try {
    await dbStorage.initializeSampleData();
    console.log("Database initialized successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

main();