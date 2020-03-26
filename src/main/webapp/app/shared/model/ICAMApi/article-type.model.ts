import { IRevision } from 'app/shared/model/ICAMApi/revision.model';

export interface IArticleType {
  id?: number;
  name?: string;
  active?: boolean;
  names?: IRevision[];
}

export class ArticleType implements IArticleType {
  constructor(public id?: number, public name?: string, public active?: boolean, public names?: IRevision[]) {
    this.active = this.active || false;
  }
}
