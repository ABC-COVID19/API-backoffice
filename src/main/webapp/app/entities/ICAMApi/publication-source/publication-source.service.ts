import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPublicationSource } from 'app/shared/model/ICAMApi/publication-source.model';

type EntityResponseType = HttpResponse<IPublicationSource>;
type EntityArrayResponseType = HttpResponse<IPublicationSource[]>;

@Injectable({ providedIn: 'root' })
export class PublicationSourceService {
  public resourceUrl = SERVER_API_URL + 'services/icamapi/api/publication-sources';

  constructor(protected http: HttpClient) {}

  create(publicationSource: IPublicationSource): Observable<EntityResponseType> {
    return this.http.post<IPublicationSource>(this.resourceUrl, publicationSource, { observe: 'response' });
  }

  update(publicationSource: IPublicationSource): Observable<EntityResponseType> {
    return this.http.put<IPublicationSource>(this.resourceUrl, publicationSource, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPublicationSource>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPublicationSource[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
