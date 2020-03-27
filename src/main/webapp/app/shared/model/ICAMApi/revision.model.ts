import { IArticleType } from 'app/shared/model/ICAMApi/article-type.model';
import { ICategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';
import { IArticle } from 'app/shared/model/ICAMApi/article.model';
import { ReviewState } from 'app/shared/model/enumerations/review-state.model';

export interface IRevision {
  id?: number;
  title?: string;
  summary?: any;
  reviewer?: string;
  active?: boolean;
  keywords?: any;
  reviewState?: ReviewState;
  returnNotes?: any;
  reviewedByPeer?: boolean;
  communityVotes?: number;
  atype?: IArticleType;
  ctree?: ICategoryTree;
  article?: IArticle;
}

export class Revision implements IRevision {
  constructor(
    public id?: number,
    public title?: string,
    public summary?: any,
    public reviewer?: string,
    public active?: boolean,
    public keywords?: any,
    public reviewState?: ReviewState,
    public returnNotes?: any,
    public reviewedByPeer?: boolean,
    public communityVotes?: number,
    public atype?: IArticleType,
    public ctree?: ICategoryTree,
    public article?: IArticle
  ) {
    this.active = this.active || false;
    this.reviewedByPeer = this.reviewedByPeer || false;
  }
}
