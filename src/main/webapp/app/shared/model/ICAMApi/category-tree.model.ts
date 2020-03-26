import { IRevision } from 'app/shared/model/ICAMApi/revision.model';
import { INewsletter } from 'app/shared/model/ICAMApi/newsletter.model';

export interface ICategoryTree {
  id?: number;
  name?: string;
  active?: boolean;
  names?: IRevision[];
  child?: ICategoryTree;
  newsletters?: INewsletter[];
}

export class CategoryTree implements ICategoryTree {
  constructor(
    public id?: number,
    public name?: string,
    public active?: boolean,
    public names?: IRevision[],
    public child?: ICategoryTree,
    public newsletters?: INewsletter[]
  ) {
    this.active = this.active || false;
  }
}
