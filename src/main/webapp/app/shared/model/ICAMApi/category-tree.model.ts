import { IRevision } from 'app/shared/model/ICAMApi/revision.model';
import { INewsletter } from 'app/shared/model/ICAMApi/newsletter.model';

export interface ICategoryTree {
  id?: number;
  itemName?: string;
  active?: boolean;
  revisions?: IRevision[];
  child?: ICategoryTree;
  newsletters?: INewsletter[];
}

export class CategoryTree implements ICategoryTree {
  constructor(
    public id?: number,
    public itemName?: string,
    public active?: boolean,
    public revisions?: IRevision[],
    public child?: ICategoryTree,
    public newsletters?: INewsletter[]
  ) {
    this.active = this.active || false;
  }
}
