import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert, AlertType } from '../alert.model';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * Display alerts in the application when errors, warnings, etc. happens 
 * See: https://jasonwatmore.com/post/2019/07/05/angular-8-alert-toaster-notifications
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  /**
   * Constructor
   * @param router
   */
  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  /**
   * Enable subscribing to alerts observable
   */
  onAlert(alertId?: string): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.alertId === alertId));
  }

  /**
   * Register a SUCESS alert
   * @param message
   * @param alertId 
   */
  success(message: string, alertId?: string) {
    this.alert(new Alert({ message, type: AlertType.Success, alertId }));
  }

  /**
   * Register an ERROR alert
   * @param message
   * @param alertId 
   */
  error(message: string, alertId?: string) {
    this.alert(new Alert({ message, type: AlertType.Error, alertId }));
  }

  /**
   * Register a INFO alert
   * @param message
   * @param alertId 
   */ 
  info(message: string, alertId?: string) {
    this.alert(new Alert({ message, type: AlertType.Info, alertId }));
  }

  /**
   * Register a WARN alert
   * @param message
   * @param alertId 
   */
  warn(message: string, alertId?: string) {
    this.alert(new Alert({ message, type: AlertType.Warning, alertId }));
  }

  /**
   * Main alert method
   * @param alert
   */   
  alert(alert: Alert) {
    this.keepAfterRouteChange = alert.keepAfterRouteChange;
    this.subject.next(alert);
  }

  /**
   * Clear alerts
   * @param alertId 
   */
  clear(alertId?: string) {
    this.subject.next(new Alert({ alertId }));
  }

}
