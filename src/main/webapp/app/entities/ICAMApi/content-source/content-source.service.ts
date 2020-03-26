import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IContentSource } from 'app/shared/model/ICAMApi/content-source.model';

type EntityResponseType = HttpResponse<IContentSource>;
type EntityArrayResponseType = HttpResponse<IContentSource[]>;

@Injectable({ providedIn: 'root' })
export class ContentSourceService {
  public resourceUrl = SERVER_API_URL + 'services/icamapi/api/content-sources';

  constructor(protected http: HttpClient) {}

  create(contentSource: IContentSource): Observable<EntityResponseType> {
    return this.http.post<IContentSource>(this.resourceUrl, contentSource, { observe: 'response' });
  }

  update(contentSource: IContentSource): Observable<EntityResponseType> {
    return this.http.put<IContentSource>(this.resourceUrl, contentSource, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContentSource>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContentSource[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
