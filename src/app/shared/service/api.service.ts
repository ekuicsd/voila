import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private formatErrors(error: any) {
    return (error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}${path}`, 
      {params}).pipe(
        catchError(this.formatErrors)
      );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}${path}`, 
      JSON.stringify(body)
    ).pipe(
      catchError(this.formatErrors)
    );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}${path}`, 
      body,
      {observe: 'response'}
    ).pipe(
      catchError(this.formatErrors)
    );  
  }

  delete(path: string, body: Object = {}): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}${path}`
    ).pipe(
      catchError(this.formatErrors)
    );
  }

}
