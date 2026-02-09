class LocalDevelopmentConfig {
	public readonly vacationsUrl = "http://localhost:4000/api/vacations/"; 
	public readonly registerUrl = "http://localhost:4000/api/register/"; 
	public readonly loginUrl = "http://localhost:4000/api/login/"; 
	public readonly userUrl = "http://localhost:4000/api/user/"; 
}
// class DockerDevelopmentConfig {
// 	public readonly vacationsUrl = "http://localhost:40001/api/vacations/"; 
// 	public readonly registerUrl = "http://localhost:4001/api/register/"; 
// 	public readonly loginUrl = "http://localhost:40001/api/login/"; 
// 	public readonly userUrl = "http://localhost:40001/api/user/"; 
// }
// class ProductionConfig {
// 	public readonly vacationsUrl = "http://44.244.140.96:4001/api/vacations/"; 
// 	public readonly registerUrl = "http://44.244.140.96:4001/api/register/"; 
// 	public readonly loginUrl = "http://44.244.140.96:4001/api/login/"; 
// 	public readonly userUrl = "http://44.244.140.96:4001/api/user/"; 
// }

// export const appConfig = new DockerDevelopmentConfig();
export const appConfig = new LocalDevelopmentConfig();
// export const appConfig = new ProductionConfig();
