class AppConfig {
  // Check if we're in development mode
  private readonly isDevelopment = import.meta.env.DEV;
  
  // Use localhost in development, production URL when deployed
  private readonly baseUrl = this.isDevelopment
    ? "http://localhost:4000"
    : "https://vacation-backend-8yfa.onrender.com";
  
  public readonly vacationsUrl = `${this.baseUrl}/api/vacations/`;
  public readonly registerUrl = `${this.baseUrl}/api/register/`;
  public readonly loginUrl = `${this.baseUrl}/api/login/`;
  public readonly userUrl = `${this.baseUrl}/api/user/`;
}

export const appConfig = new AppConfig();