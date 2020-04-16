import { Moment } from 'moment';
import { IRevision } from 'app/shared/model/ICAMApi/revision.model';
import { ISourceRepo } from 'app/shared/model/ICAMApi/source-repo.model';

export interface IArticle {
  id?: number;
  repoArticleId?: number;
  repoDate?: Moment;
  repoKeywords?: any;
  articleDate?: string;
  articleTitle?: string;
  articleAbstract?: any;
  articleLink?: string;
  articleJournal?: string;
  articleCitation?: string;
  fetchDate?: Moment;
  revision?: IRevision;
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
    public articleLink?: string,
    public articleJournal?: string,
    public articleCitation?: string,
    public fetchDate?: Moment,
    public revision?: IRevision,
    public srepo?: ISourceRepo
  ) {}
}
