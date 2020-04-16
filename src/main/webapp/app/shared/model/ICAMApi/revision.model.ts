import { Moment } from 'moment';
import { IArticle } from 'app/shared/model/ICAMApi/article.model';
import { ICategoryTree } from 'app/shared/model/ICAMApi/category-tree.model';
import { IArticleType } from 'app/shared/model/ICAMApi/article-type.model';
import { ReviewState } from 'app/shared/model/enumerations/review-state.model';

export interface IRevision {
  id?: number;
  title?: string;
  summary?: any;
  isPeerReviewed?: boolean;
  country?: string;
  keywords?: any;
  reviewDate?: Moment;
  reviewNotes?: any;
  author?: string;
  reviewer?: string;
  reviewState?: ReviewState;
  article?: IArticle;
  ctrees?: ICategoryTree[];
  atype?: IArticleType;
}

export class Revision implements IRevision {
  constructor(
    public id?: number,
    public title?: string,
    public summary?: any,
    public isPeerReviewed?: boolean,
    public country?: string,
    public keywords?: any,
    public reviewDate?: Moment,
    public reviewNotes?: any,
    public author?: string,
    public reviewer?: string,
    public reviewState?: ReviewState,
    public article?: IArticle,
    public ctrees?: ICategoryTree[],
    public atype?: IArticleType
  ) {
    this.isPeerReviewed = this.isPeerReviewed || false;
  }
}
