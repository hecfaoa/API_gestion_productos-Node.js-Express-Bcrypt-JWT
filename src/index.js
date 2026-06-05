import app from "./app.js";
import { AppDataSource } from "./database.js";

async function main() {
  try {
    await AppDataSource.initialize().then(() => {
      console.log("Data Source has been initialized!");
    });
    app.listen(3690, () => {
      console.log("Server is running on port 3690");
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during Data Source initialization:", error.message);
    } else {
      console.error("Error during Data Source initialization:", error);
    }
  }
}

main();
