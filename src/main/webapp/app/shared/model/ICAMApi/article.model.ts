import { Moment } from 'moment';
import { IRevision } from 'app/shared/model/ICAMApi/revision.model';
import { IContentSource } from 'app/shared/model/ICAMApi/content-source.model';
import { ReviewState } from 'app/shared/model/enumerations/review-state.model';

export interface IArticle {
  id?: number;
  sourceID?: number;
  sourceDate?: Moment;
  sourceTitle?: string;
  sourceAbstract?: string;
  pubmedDate?: Moment;
  officialPubDate?: Moment;
  doi?: string;
  journal?: string;
  citation?: string;
  keywords?: any;
  reviewState?: ReviewState;
  revisions?: IRevision[];
  cntsource?: IContentSource;
}

export class Article implements IArticle {
  constructor(
    public id?: number,
    public sourceID?: number,
    public sourceDate?: Moment,
    public sourceTitle?: string,
    public sourceAbstract?: string,
    public pubmedDate?: Moment,
    public officialPubDate?: Moment,
    public doi?: string,
    public journal?: string,
    public citation?: string,
    public keywords?: any,
    public reviewState?: ReviewState,
    public revisions?: IRevision[],
    public cntsource?: IContentSource
  ) {}
}
