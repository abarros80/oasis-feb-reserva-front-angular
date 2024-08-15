import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { IReserva } from '../interfaces/i-reserva';
import { ApiCrudService } from '../../../my-core/services/api-crud.service';
import { IReqReserva } from '../interfaces/i-req-reserva';
import { IResponsePageableReserva } from '../interfaces/i-response-pageable-reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaCrudService extends  ApiCrudService<IReserva> {

  constructor(protected override  http: HttpClient) {
    super(http, "reservas");
  }



  // Update
  updateItemFromIReqReserva(record: IReqReserva) {

    let url = `${super.getAPIURL}/${record.id}`;
    return this.http.put<IReserva>(url, record, { 'headers': this.headers }).pipe(

        take(1), //depois da resposta ele faz unsubscribe automaticamente
        catchError(this.errorMgmt)
      );
  }

  // Create
  createReservaFromIReqReserva(record: IReqReserva) {
    let url = `${super.getAPIURL}`;
    return this.http.post(url, record,  {'headers': this.headers})
      .pipe(
        take(1), //depois da resposta ele faz unsubscribe automaticamente
        catchError(this.errorMgmt)
      );
  }

  // Get all Data by URL
  findDataByURL(url: string): Observable<IReserva> {
    return this.http.get<IReserva>(url, {'headers': this.headers}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }



  findById(id: number): Observable<IReserva> {
    let url = `${super.getAPIURL}/${id}`;
    return this.http.get<IReserva>(url, {'headers': this.headers}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableReserva> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    console.log("RESERVA url ", url);
    return this.http.get<IResponsePageableReserva>(url, {'headers': this.headers}).pipe(
     // delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }


}
