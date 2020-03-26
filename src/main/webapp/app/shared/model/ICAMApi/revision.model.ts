import { IArticle } from 'app/shared/model/ICAMApi/article.model';
import { IArticleType } from 'app/shared/model/ICAMApi/article-type.model';
import { ICategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';
import { ReviewState } from 'app/shared/model/enumerations/review-state.model';

export interface IRevision {
  id?: number;
  title?: string;
  summary?: string;
  reviewer?: string;
  active?: boolean;
  keywords?: any;
  absRevision?: any;
  reviewState?: ReviewState;
  returnNotes?: string;
  reviewedByPeer?: boolean;
  communityVotes?: number;
  article?: IArticle;
  type?: IArticleType;
  area?: ICategoryTree;
}

export class Revision implements IRevision {
  constructor(
    public id?: number,
    public title?: string,
    public summary?: string,
    public reviewer?: string,
    public active?: boolean,
    public keywords?: any,
    public absRevision?: any,
    public reviewState?: ReviewState,
    public returnNotes?: string,
    public reviewedByPeer?: boolean,
    public communityVotes?: number,
    public article?: IArticle,
    public type?: IArticleType,
    public area?: ICategoryTree
  ) {
    this.active = this.active || false;
    this.reviewedByPeer = this.reviewedByPeer || false;
  }
}
