import { Moment } from 'moment';
import { IRevision } from 'app/shared/model/ICAMApi/revision.model';
import { IPublicationSource } from 'app/shared/model/ICAMApi/publication-source.model';
import { ContentSource } from 'app/shared/model/enumerations/content-source.model';
import { ReviewState } from 'app/shared/model/enumerations/review-state.model';

export interface IArticle {
  id?: number;
  fetchedFrom?: ContentSource;
  sourceID?: number;
  sourceDate?: Moment;
  sourceTitle?: string;
  sourceAbstract?: string;
  importDate?: Moment;
  outboundLink?: string;
  keywords?: any;
  reviewState?: ReviewState;
  revisions?: IRevision[];
  pubName?: IPublicationSource;
}

export class Article implements IArticle {
  constructor(
    public id?: number,
    public fetchedFrom?: ContentSource,
    public sourceID?: number,
    public sourceDate?: Moment,
    public sourceTitle?: string,
    public sourceAbstract?: string,
    public importDate?: Moment,
    public outboundLink?: string,
    public keywords?: any,
    public reviewState?: ReviewState,
    public revisions?: IRevision[],
    public pubName?: IPublicationSource
  ) {}
}
