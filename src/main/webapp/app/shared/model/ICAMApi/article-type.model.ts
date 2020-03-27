import { IRevision } from 'app/shared/model/ICAMApi/revision.model';

export interface IArticleType {
  id?: number;
  itemName?: string;
  active?: boolean;
  revisions?: IRevision[];
}

export class ArticleType implements IArticleType {
  constructor(public id?: number, public itemName?: string, public active?: boolean, public revisions?: IRevision[]) {
    this.active = this.active || false;
  }
}
