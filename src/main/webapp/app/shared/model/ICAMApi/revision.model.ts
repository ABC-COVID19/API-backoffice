import { ICategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';
import { IArticleType } from 'app/shared/model/ICAMApi/article-type.model';
import { IArticle } from 'app/shared/model/ICAMApi/article.model';
import { ReviewState } from 'app/shared/model/enumerations/review-state.model';

export interface IRevision {
  id?: number;
  title?: string;
  summary?: any;
  reviewedByPeer?: boolean;
  returnNotes?: any;
  keywords?: any;
  reviewer?: string;
  reviewState?: ReviewState;
  communityVotes?: number;
  active?: boolean;
  ctrees?: ICategoryTree[];
  atype?: IArticleType;
  article?: IArticle;
}

export class Revision implements IRevision {
  constructor(
    public id?: number,
    public title?: string,
    public summary?: any,
    public reviewedByPeer?: boolean,
    public returnNotes?: any,
    public keywords?: any,
    public reviewer?: string,
    public reviewState?: ReviewState,
    public communityVotes?: number,
    public active?: boolean,
    public ctrees?: ICategoryTree[],
    public atype?: IArticleType,
    public article?: IArticle
  ) {
    this.reviewedByPeer = this.reviewedByPeer || false;
    this.active = this.active || false;
  }
}
