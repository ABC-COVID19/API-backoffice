import { Moment } from 'moment';
import { ICategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';

export interface INewsletter {
  id?: number;
  name?: string;
  email?: string;
  registrationDate?: Moment;
  rgpdAuth?: boolean;
  categoryTrees?: ICategoryTree[];
}

export class Newsletter implements INewsletter {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public registrationDate?: Moment,
    public rgpdAuth?: boolean,
    public categoryTrees?: ICategoryTree[]
  ) {
    this.rgpdAuth = this.rgpdAuth || false;
  }
}
