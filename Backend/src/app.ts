import cors from "cors";
import express, { Request } from "express";
import fileUpload from "express-fileupload";
import expressRateLimit from "express-rate-limit";
import mongoose from "mongoose";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "./2-utils/app-config";
import { errorMiddleware } from "./6-middleware/error-middleware";
import { vacationController } from "./5-controllers/vacation-controller";
import { securityMiddleware } from "./6-middleware/security-middleware";
import { userController } from "./5-controllers/user-controller";

class App {
  public async start(): Promise<void> { // Connecting to MongoDB with explicit options:
    try {
      await mongoose.connect(appConfig.mongodbConnectionString, {
        tls: true,
        tlsAllowInvalidCertificates: false,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 75000,
      });
      console.log('✅ MongoDB connected successfully!');
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error);
      throw error;
    }

    // Create the server object:
    const server = express();

    // Behind reverse proxies (Railway/NGINX), trust the first proxy hop:
    server.set("trust proxy", 1);

    // Prevent DoS attack:
    server.use(
      expressRateLimit({
        windowMs: 1000,
        limit: 10,
        skip: (request: Request) =>
          request.originalUrl.startsWith("/api/vacations/images/"), // Don't block images.
      })
    );

// Allow requests from Vercel frontend
server.use(cors({
  origin: [
    'http://localhost:5173',  // Local frontend dev
    'https://final-project-vacations.vercel.app',  // Your Vercel frontend
    'https://*.vercel.app'  // All Vercel preview deployments
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

    // Tell express to create request.body from the HTTP Request body json:
    server.use(express.json());

    // Tell express to create request.files object containing upload files:
    server.use(fileUpload());

    // Configure fileSaver regarding where to save the files:
    const location = path.join(__dirname, "1-assets", "images");
    fileSaver.config(location);

    // Register middleware:
    server.use(securityMiddleware.preventXssAttack);

    // Listen to controller routes:
    server.use(userController.router);
    server.use(vacationController.router);

    // Route not found middleware:
    server.use(errorMiddleware.routeNotFound);

    // Catch-all middleware:
    server.use(errorMiddleware.catchAll);

    // Run server:
    const PORT = process.env.PORT || appConfig.port;
    server.listen(appConfig.port, '0.0.0.0', () => {
      console.log(`✅ Server listening on port ${PORT}`);
    });
  }
}

const app = new App();
app.start();