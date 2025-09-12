import { ObjectId } from "mongoose";
import { ResourceNotFound } from "../3-models/client-errors";
import { VacationModel } from "../3-models/vacation-model";
import { IVacationModel } from "../3-models/vacation-model";


class VacationService {

    public async getAllVacations(): Promise<IVacationModel[]> {
        return VacationModel.find().exec();
    }

    public async getOneVacation(_id: string | ObjectId): Promise<IVacationModel>{
        const vacation = await VacationModel.findById(_id).exec();
        if(!vacation) throw new ResourceNotFound(_id);
        return vacation;
    }

}

export const vacationService = new VacationService();
