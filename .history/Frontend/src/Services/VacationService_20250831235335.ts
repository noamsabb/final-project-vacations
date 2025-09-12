import axios from "axios";
import { VacationModel } from "../Models/VacationModel";
import { appConfig } from "../Utils/AppConfig";

class VacationService {

    public async getAllVacations(filter: string): Promise<VacationModel[]> {
        console.log(filter);
        
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl + `?filter=${filter}`);
        const vacations = response.data;
        return vacations;
    }


}

export const vacationService = new VacationService();

