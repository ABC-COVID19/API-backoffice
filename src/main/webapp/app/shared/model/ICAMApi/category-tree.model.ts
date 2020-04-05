import { INewsletter } from 'app/shared/model/ICAMApi/newsletter.model';
import { IRevision } from 'app/shared/model/ICAMApi/revision.model';

export interface ICategoryTree {
  id?: number;
  itemName?: string;
  active?: boolean;
  children?: ICategoryTree[];
  parent?: ICategoryTree;
  newsletters?: INewsletter[];
  revisions?: IRevision[];
}

export class CategoryTree implements ICategoryTree {
  constructor(
    public id?: number,
    public itemName?: string,
    public active?: boolean,
    public children?: ICategoryTree[],
    public parent?: ICategoryTree,
    public newsletters?: INewsletter[],
    public revisions?: IRevision[]
  ) {
    this.active = this.active || false;
  }
}
