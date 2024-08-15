import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { appsettings } from '../../settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class ApiCrudService<T> {

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  private  API_URL: String;


  get getheaders(): any {
    return this.headers;
  }

  get getAPIURL(): any {
    return this.API_URL;
  }


  constructor(protected  http: HttpClient, private URI: String) {
    this.API_URL = appsettings.API+URI;
    console.log(URI+"Service - API_URL: "+this.API_URL);
    }



  // Create
  createData(record: T) {
    let url = `${this.API_URL}`;
    return this.http.post(url, record,  { 'headers': this.headers })
      .pipe(
        take(1), //depois da resposta ele faz unsubscribe automaticamente
        catchError(this.errorMgmt)
      );
  }

  // Get all Data
  getAllData(): Observable<T[]> {
    console.log('URL: ', this.API_URL);
    return this.http.get<T[]>( `${this.API_URL}`).pipe(
      //delay(2000), //para remover em produção
      take(1), // com isso já não é preciso fazer unsubscribe
      catchError(this.errorMgmt)
    );
  }

  // Get all Data by URL
  getDataByURL(url: string): Observable<T> {
    return this.http.get<T>(url, {'headers': this.headers}).pipe(
      take(1),
      catchError(this.errorMgmt)
    );
  }

  // Get Data by Id
  getData(id: number): Observable<T> {
    let url = `${this.API_URL}/${id}`;
    return this.http.get<T>(url, {'headers': this.headers}).pipe(
      take(1),
      catchError(this.errorMgmt)
    );
  }


  // Update Data
  updateData(id: number, record: T): Observable<T> {
    let url = `${this.API_URL}/${id}`;
    return this.http.put<T>(url, record, { 'headers': this.headers }).pipe(
      take(1),
      catchError(this.errorMgmt)
    );
  }

  // Delete Data
  deleteData(id: number): Observable<void> {
/*
    const headers = new HttpHeaders()//.set('Content-Type', 'text/plain; charset=utf-8')
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');;
*/

    //this.headers.set('Access-Control-Allow-Origin', '*');

    const requestOptions: Object = {
      'headers': this.headers,
      //'responseType': 'text'
    }

    let url = `${this.API_URL}/${id}`;
    return this.http.delete<void>(url, requestOptions).pipe(
      take(1),
      catchError(this.errorMgmt)
    );
  }


  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    //return throwError(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
