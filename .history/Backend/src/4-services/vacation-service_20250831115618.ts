import { ObjectId } from "mongoose";
import { ResourceNotFound, ValidationError } from "../3-models/client-errors";
import { VacationModel } from "../3-models/vacation-model";
import { IVacationModel } from "../3-models/vacation-model";
import { UploadedFile } from "express-fileupload";
import { fileSaver } from "uploaded-file-saver";
import { createObjectCsvStringifier } from "csv-writer";

class VacationService {
  public async getAllVacations(filter: string): Promise<IVacationModel[]> {
    let vacations;
    const now = new Date();

    switch (filter) {
      case "ongoing":
        vacations = await VacationModel.find({startDate:{$lte: now}, endDate: {$gte: now}}).sort({ startDate: 1 }).exec();
        break;
      case "future":
        vacations = await VacationModel.find({startDate: {$gte: now}}).sort({ startDate: 1 }).exec();
        break;
      case "all":
      default:
        vacations = await VacationModel.find({}).sort({ startDate: 1 }).exec();
        break;
    }
    return vacations;
  }

  public async getOneVacation(_id: string | ObjectId): Promise<IVacationModel> {
    const vacation = await VacationModel.findById(_id).exec();
    if (!vacation) throw new ResourceNotFound(_id);
    return vacation;
  }

  public async addVacation(
    vacation: IVacationModel,
    image?: UploadedFile
  ): Promise<IVacationModel> {
    ValidationError.validate(vacation);

    if (image) vacation.imageName = await fileSaver.add(image);
    return vacation.save();
  }

  public async updateVacation(
    vacation: IVacationModel,
    image?: UploadedFile
  ): Promise<IVacationModel> {
    ValidationError.validate(vacation);

    if (image) {
      const oldImageName = await this.getImageName(vacation._id);
      vacation.imageName = await fileSaver.update(oldImageName!, image);
    }

    const dbVacation = await VacationModel.findByIdAndUpdate(
      vacation._id,
      vacation,
      { returnOriginal: false }
    ).exec();
    if (!dbVacation) throw new ResourceNotFound(vacation._id);

    return dbVacation;
  }

  public async deleteVacation(_id: string): Promise<void> {
    const oldImageName = await this.getImageName(_id);
    const dbVacation = await VacationModel.findByIdAndDelete(_id, {
      returnOriginal: false,
    }).exec();

    await fileSaver.delete(oldImageName);
  }

  private async getImageName(_id: string | ObjectId): Promise<string | null> {
    const dbVacation = await this.getOneVacation(_id);
    return dbVacation?.imageName;
  }

  private async generateVacationCsv(): Promise<string> {
  const vacations = await VacationModel.find().lean();

  const csv = createObjectCsvStringifier({
    header: [
      { id: "destination", title: "Destination" },
      { id: "likes", title: "Likes" }
    ],
  });

  const records = vacations.map((v) => ({
    destination: v.destination,
    likes: v.likes // handle both formats
  }));

  return csv.getHeaderString() + csv.stringifyRecords(records);
}
}

export const vacationService = new VacationService();
