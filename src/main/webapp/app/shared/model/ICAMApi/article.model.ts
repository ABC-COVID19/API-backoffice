import { Moment } from 'moment';
import { IRevision } from 'app/shared/model/ICAMApi/revision.model';
import { ISourceRepo } from 'app/shared/model/ICAMApi/source-repo.model';
import { ReviewState } from 'app/shared/model/enumerations/review-state.model';

export interface IArticle {
  id?: number;
  repoArticleId?: number;
  repoDate?: Moment;
  repoKeywords?: any;
  articleDate?: string;
  articleTitle?: string;
  articleAbstract?: any;
  articleDoi?: string;
  articleJournal?: string;
  fetchDate?: Moment;
  citation?: string;
  reviewState?: ReviewState;
  revisions?: IRevision[];
  srepo?: ISourceRepo;
}

export class Article implements IArticle {
  constructor(
    public id?: number,
    public repoArticleId?: number,
    public repoDate?: Moment,
    public repoKeywords?: any,
    public articleDate?: string,
    public articleTitle?: string,
    public articleAbstract?: any,
    public articleDoi?: string,
    public articleJournal?: string,
    public fetchDate?: Moment,
    public citation?: string,
    public reviewState?: ReviewState,
    public revisions?: IRevision[],
    public srepo?: ISourceRepo
  ) {}
}
