import axios, { AxiosRequestConfig } from "axios";
import { VacationModel } from "../Models/VacationModel";
import { appConfig } from "../Utils/AppConfig";

class VacationService {

    public async getAllVacations(filter: string): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl + `?filter=${filter}`);
        const vacations = response.data;
        return vacations;
    }
    public async getOneVacation(_id: string):Promise<VacationModel> { 
        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + _id);
        return response.data;
    }



    public async addVacation(vacation: VacationModel): Promise<void>{
        const options: AxiosRequestConfig = {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        };
        await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, options);
    }

    public async updateVacation(vacation: VacationModel): Promise<void>{
           const options: AxiosRequestConfig = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        await axios.put<VacationModel>(appConfig.vacationsUrl + vacation._id, vacation, options)
    }

    public async deleteVacation(_id: string):Promise<void>{
        await axios.delete(appConfig.vacationsUrl + _id);
    }

    public async getVacationCsv():Promise<void>{
         const response = await axios.get(appConfig.vacationsUrl + "export", {
      responseType: "blob", // 👈 important for files
    });

    // Create a blob URL for the CSV
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Create a hidden link element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "vacations.csv"); // 👈 default filename
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
  }
}

export const vacationService = new VacationService();

