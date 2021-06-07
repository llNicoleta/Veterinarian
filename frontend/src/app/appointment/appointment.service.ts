import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, InjectionToken, Provider} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {IAppointment, IHttpResponse} from './appointment.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8081/rest/appointments";
  }

  getAppointments(pageNumber: number, doctorName: string): Observable<IHttpResponse> {
    let params = new HttpParams();

    params = params.append('page', pageNumber.toString());
    params = params.append('doctor', doctorName);

    return this.http.get<any>(this.baseUrl, {params})
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getAppointmentById(id: number): Observable<IAppointment> {
    return this.http.get<IAppointment>(`${this.baseUrl}/${id}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getAllAppointments(): Observable<IAppointment> {
    return this.http.get<any>(this.baseUrl + "/all")
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  addAppointment(appointment: IAppointment): Observable<any> {
    console.log(JSON.stringify(appointment));
    return this.http.post(this.baseUrl, JSON.stringify(appointment), httpOptions);
  }

  updateAppointment(appointment: IAppointment): Observable<any> {
    return this.http.put(this.baseUrl, JSON.stringify(appointment), httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

export const APPOINTMENT_SERVICE = new InjectionToken<AppointmentService>('APPOINTMENT_SERVICE');

export const AppointmentServiceProvider: Provider = {
  provide: APPOINTMENT_SERVICE,
  useClass: AppointmentService
};
