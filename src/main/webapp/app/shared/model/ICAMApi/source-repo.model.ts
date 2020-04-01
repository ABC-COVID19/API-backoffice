import { IArticle } from 'app/shared/model/ICAMApi/article.model';

export interface ISourceRepo {
  id?: number;
  itemName?: string;
  active?: boolean;
  articles?: IArticle[];
}

export class SourceRepo implements ISourceRepo {
  constructor(public id?: number, public itemName?: string, public active?: boolean, public articles?: IArticle[]) {
    this.active = this.active || false;
  }
}
