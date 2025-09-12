import dotenv from "dotenv";

// Load ".env" file into process.env object:
dotenv.config();

class AppConfig {

    public readonly isDevelopment = process.env.ENVIRONMENT === "development";
    public readonly isProduction = process.env.ENVIRONMENT === "production";
    public readonly port = +process.env.PORT;
    public readonly host = process.env.MYSQL_HOST;
    public readonly user = process.env.MYSQL_USER;
    public readonly password = process.env.MYSQL_PASSWORD;
    public readonly database = process.env.MYSQL_DATABASE;
}

export const appConfig = new AppConfig();
