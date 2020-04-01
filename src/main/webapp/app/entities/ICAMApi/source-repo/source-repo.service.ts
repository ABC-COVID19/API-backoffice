import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISourceRepo } from 'app/shared/model/ICAMApi/source-repo.model';

type EntityResponseType = HttpResponse<ISourceRepo>;
type EntityArrayResponseType = HttpResponse<ISourceRepo[]>;

@Injectable({ providedIn: 'root' })
export class SourceRepoService {
  public resourceUrl = SERVER_API_URL + 'services/icamapi/api/source-repos';

  constructor(protected http: HttpClient) {}

  create(sourceRepo: ISourceRepo): Observable<EntityResponseType> {
    return this.http.post<ISourceRepo>(this.resourceUrl, sourceRepo, { observe: 'response' });
  }

  update(sourceRepo: ISourceRepo): Observable<EntityResponseType> {
    return this.http.put<ISourceRepo>(this.resourceUrl, sourceRepo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISourceRepo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISourceRepo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
