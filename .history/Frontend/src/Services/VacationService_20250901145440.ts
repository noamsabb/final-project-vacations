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

        console.log(vacation);
        

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
}

export const vacationService = new VacationService();

