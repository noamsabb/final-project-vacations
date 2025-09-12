import { ObjectId } from "mongoose";
import { ResourceNotFound, ValidationError } from "../3-models/client-errors";
import { VacationModel } from "../3-models/vacation-model";
import { IVacationModel } from "../3-models/vacation-model";
import { UploadedFile } from "express-fileupload";
import { fileSaver } from "uploaded-file-saver";


class VacationService {

    public async getAllVacations(): Promise<IVacationModel[]> {
        return VacationModel.find().exec();
    }

    public async getOneVacation(_id: string | ObjectId): Promise<IVacationModel>{
        const vacation = await VacationModel.findById(_id).exec();
        if(!vacation) throw new ResourceNotFound(_id);
        return vacation;
    }

    public async addVacation(vacation: IVacationModel, image?: UploadedFile): Promise<IVacationModel>{
        ValidationError.validate(vacation);

        if(image) vacation.imageName = await fileSaver.add(image);
        return vacation.save();

    }

    public async updateVacation(vacation:IVacationModel, image?: UploadedFile): Promise<IVacationModel>{
        ValidationError.validate(vacation);

        if(image){
            const oldImageName = await this.getImageName(vacation._id);
            vacation.imageName = await fileSaver.update(oldImageName!, image);
        }

        const dbVacation = await VacationModel.findByIdAndUpdate(vacation._id, vacation, {returnOriginal: false}).exec();
        if(!dbVacation) throw new ResourceNotFound(vacation._id);

        return dbVacation;
    }

     private async getImageName(_id: string | ObjectId): Promise<string | null> {
        const dbVacation = await this.getOneVacation(_id);
        return dbVacation?.imageName;
    }
}

export const vacationService = new VacationService();
