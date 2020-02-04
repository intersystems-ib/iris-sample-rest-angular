import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { Show, Cast, QueryResult } from '../shows.model';
import { AlertService } from 'src/app/shared/services/alert.service';

/**
 * Shows service. Handles backend (IRIS) operations for Show, Cast using REST API
 */
@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  
  /** Base URL */
  private urlBase = 'http://localhost:52773/myapp/api';
  
  /** Options used in request */
  private options = { withCredentials: true };

  /**
   * Constructor
   * @param http 
   * @param alertService 
   */
  constructor(private http:HttpClient, private alertService: AlertService) { }

  /**
   * Calls RESTForms2 query based on `App.Data.Show:queryFIND` method.
   * @param pageIndex number of page
   * @param pageSize page size
   * @param query search filters to use
   */
  findShows(pageIndex: number, pageSize: number, query: any): Observable<QueryResult<Show>> {
    let filter = '';
    if (query.title) { filter += `+title+contains+${query.title}`; }
    
    let escapedFilter = filter.replace(new RegExp(' ', 'g'), '%09');
    escapedFilter = escapedFilter.replace(new RegExp('\\+'), '');
    
    return this.http.get<QueryResult<Show>>(
      this.urlBase + `/rf2/form/objects/App.Data.Show/find?size=${pageSize}&page=${pageIndex}&collation=UPPER&filter=${escapedFilter}`,
      this.options
    ).pipe(
      //tap(data => console.log(data))
      catchError(err => {
        this.alertService.error('[findShows] ' + err.message)
        return throwError(err);
      })
    );
  }

  /**
   * Same as find() method but filtering with some specific show ids
   */
  findLatestShows(): Observable<QueryResult<Show>> {
    return this.http.get<QueryResult<Show>>(
      this.urlBase + 
        '/rf2/form/objects/App.Data.Show/find?size=10&page=1&collation=UPPER&'+
        'filter=showid%20in%2070136135~80057281~80114855~80025678~80211627~80175798',
      this.options
    ).pipe(
      //tap(data => console.log(data))
      catchError(err => {
        this.alertService.error('[findLatestShows] ' + err.message)
        return throwError(err);
      })
  );
  }

  /**
   * Get Show data using a given id
   * @param id 
   */
  findShowById(id: number): Observable<Show> {
    return this.http.get<Show>(
      this.urlBase + `/rf2/form/object/App.Data.Show/${id}`,
      this.options
    ).pipe(
      //tap(data => console.log(data)),
      catchError(err => {
        this.alertService.error('[findShowById] ' + err.message)
        return throwError(err);
      })
    );
  }

  /**
   * Returns the cast of a show 
   * @param id 
   */
  findCastByShow(id: number): Observable<QueryResult<Cast>> {
    return this.http.get<QueryResult<Cast>>(
      this.urlBase + `/rf2/form/objects/App.Data.Cast/find?filter=show+eq+${id}`,
      this.options
    ).pipe(
      //tap(data => console.log(data)),
      catchError(err => {
        this.alertService.error('[findCastByShow] ' + err.message)
        return throwError(err);
      })
    );
  }

  /**
   * Save Show data
   * @param id 
   * @param show 
   */
  saveShow(id: number, show: Show) {
    return this.http.put(
      this.urlBase + `/rf2/form/object/App.Data.Show/${id}`,
      show,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[saveShow] ' + err.message)
        return throwError(err);
      })
    );
  }

  /**
   * Save Cast data
   * @param id 
   * @param cast 
   */
  saveCast(id: number, cast: Cast) {
    return this.http.put(
      this.urlBase + `/rf2/form/object/App.Data.Cast/${id}`,
      cast,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[saveCast] ' + err.message)
        return throwError(err);
      })
    );
  }

}
