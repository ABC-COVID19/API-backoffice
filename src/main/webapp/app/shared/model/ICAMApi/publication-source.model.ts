import { IArticle } from 'app/shared/model/ICAMApi/article.model';

export interface IPublicationSource {
  id?: number;
  sourceName?: string;
  active?: boolean;
  names?: IArticle[];
}

export class PublicationSource implements IPublicationSource {
  constructor(public id?: number, public sourceName?: string, public active?: boolean, public names?: IArticle[]) {
    this.active = this.active || false;
  }
}
