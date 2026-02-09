import dotenv from "dotenv"; // npm i dotenv

// Load .env file into process.env object.
// dotenv.config({ quiet: true });
dotenv.config({override: false});

class AppConfig {
  private readonly environment =
    process.env.ENVIRONMENT || process.env.NODE_ENV || "development";
  public readonly isDevelopment = this.environment === "development";
  public readonly isProduction = this.environment === "production";
  public readonly port = Number(process.env.PORT) || 4000;
  public readonly mongodbConnectionString = process.env.MONGODB_URI ||
    process.env.MONGODB_CONNECTION_STRING!;
  public readonly baseImageUrl = process.env.BASE_IMAGE_URL!;
  public readonly jwtSecretKey = process.env.JWT_SECRET_KEY!;
  public readonly hashSaltKey = process.env.HASH_SALT_KEY!;
}

export const appConfig = new AppConfig();
