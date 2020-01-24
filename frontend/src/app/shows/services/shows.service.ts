import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Show, Cast, QueryResult } from '../shows.model';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  private urlBase = 'http://localhost:52773/myapp/api/form';
  private options = { withCredentials: true };

  constructor(private http:HttpClient) { }

  findShows(pageIndex: number, pageSize: number, query: any): Observable<QueryResult<Show>> {
    let filter = '';
    if (query.title) { filter += `+title+contains+${query.title}`; }
    
    let escapedFilter = filter.replace(new RegExp(' ', 'g'), '%09');
    escapedFilter = escapedFilter.replace(new RegExp('\\+'), '');
    
    return this.http.get<QueryResult<Show>>(
      this.urlBase + `/objects/App.Data.Show/find?size=${pageSize}&page=${pageIndex}&collation=UPPER&filter=${escapedFilter}`,
      this.options
    ).pipe(
      //tap(data => console.log(data))
    );
  }

  findLatestShows(): Observable<QueryResult<Show>> {
    return this.http.get<QueryResult<Show>>(
      this.urlBase + 
        '/objects/App.Data.Show/find?size=10&page=1&collation=UPPER&'+
        'filter=showid%20in%2070136135~80057281~80114855~80025678~80211627~80175798',
      this.options
    ).pipe(
      //tap(data => console.log(data))
    );
  }

  findShowById(id: number): Observable<Show> {
    return this.http.get<Show>(
      this.urlBase + `/object/App.Data.Show/${id}`,
      this.options
    ).pipe(
      //tap(data => console.log(data)),
    );
  }

  findCastByShow(id: number): Observable<Cast[]> {
    return this.http.get<Cast[]>(
      this.urlBase + `/objects/App.Data.Cast/find?filter=show+eq+${id}`,
      this.options
    ).pipe(
      //tap(data => console.log(data)),
      map(res => res['children'])
    );
  }

  saveShow(id: number, show: Show) {
    return this.http.put(
      this.urlBase + `/object/App.Data.Show/${id}`,
      show,
      this.options
    ).pipe(
    );
  }

  saveCast(id: number, cast: Cast) {
    return this.http.put(
      this.urlBase + `/object/App.Data.Cast/${id}`,
      cast,
      this.options
    ).pipe(
    );
  }

}
