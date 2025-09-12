export class VacationModel {
  public _id?: string;
  public destination?: string;
  public description?: string;
  public startDate?: Date;
  public endDate?: Date;
  public price?: number;
  public imageUrl?: string;
  public image?: File;
  public likes?: number;
}
