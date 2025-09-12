import { IVacationModel } from "../3-models/vacation-model";


class VacationService {

    public async getAllVacation(): Promise<IVacationModel[]> {
        return null;
    }

}

export const vacationService = new VacationService();
