import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert, AlertType } from '../alert.model';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // see https://jasonwatmore.com/post/2019/07/05/angular-8-alert-toaster-notifications

  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

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

  // enable subscribing to alerts observable
  onAlert(alertId?: string): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.alertId === alertId));
  }

  // convenience methods
  success(message: string, alertId?: string) {
    this.alert(new Alert({ message, type: AlertType.Success, alertId }));
  }

  error(message: string, alertId?: string) {
    this.alert(new Alert({ message, type: AlertType.Error, alertId }));
  }

  info(message: string, alertId?: string) {
    this.alert(new Alert({ message, type: AlertType.Info, alertId }));
  }

  warn(message: string, alertId?: string) {
    this.alert(new Alert({ message, type: AlertType.Warning, alertId }));
  }

  // main alert method    
  alert(alert: Alert) {
    this.keepAfterRouteChange = alert.keepAfterRouteChange;
    this.subject.next(alert);
  }

  // clear alerts
  clear(alertId?: string) {
    this.subject.next(new Alert({ alertId }));
  }

}
