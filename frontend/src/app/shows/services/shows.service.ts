import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Show, Cast } from '../shows.model';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  private urlBase = 'http://localhost:52773/myapp/api/form';
  private options = { withCredentials: true };

  constructor(private http:HttpClient) { }

  findShows(): Observable<Show[]> {
    return this.http.get(
      this.urlBase + '/objects/App.Data.Show/find',
      this.options
    ).pipe(
      //tap(data => console.log(data)),
      map(res => res['children'])
    );
  }

  findLatestShows(): Observable<Show[]> {
    return this.http.get(
      this.urlBase + '/objects/App.Data.Show/find',
      this.options
    ).pipe(
      //tap(data => console.log(data)),
      map(res => res['children'])
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
