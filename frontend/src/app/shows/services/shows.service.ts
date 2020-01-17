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
      tap(data => console.log(data)),
      map(res => res['children'])
    );
  }

  findLatestShows(): Observable<Show[]> {
    return this.http.get(
      this.urlBase + '/objects/App.Data.Show/find',
      this.options
    ).pipe(
      tap(data => console.log(data)),
      map(res => res['children'])
    );
  }

}
