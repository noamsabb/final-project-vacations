import { VacationModel } from "../3-models/vacation-model";
import { IVacationModel } from "../3-models/vacation-model";


class VacationService {

    public async getAllVacations(): Promise<IVacationModel[]> {
        return VacationModel.find().exec();
    }

}

export const vacationService = new VacationService();
