// src/app/services/appuntamento.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Appuntamento } from '../interfaces/appuntamento';

@Injectable({
  providedIn: 'root'
})
export class AppuntamentoService { 
  
  private apiUrl = 'http://localhost:8080/api/lezioni';

  constructor(private http: HttpClient) {}

  // Ottiene tutti gli appuntamenti
  getAppuntamenti(): Observable<Appuntamento[]> {
    return this.http.get<Appuntamento[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Ottiene un singolo appuntamento per ID
  getAppuntamento(id: number): Observable<Appuntamento> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Appuntamento>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Crea un nuovo appuntamento
  createAppuntamento(appuntamento: Appuntamento): Observable<Appuntamento> {
    return this.http.post<Appuntamento>(this.apiUrl, appuntamento)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  // Aggiorna un appuntamento esistente
  updateAppuntamento(appuntamento: Appuntamento): Observable<Appuntamento> {
    const url = `${this.apiUrl}/${appuntamento.id}`;
    return this.http.put<Appuntamento>(url, appuntamento)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Cancella un appuntamento per ID
  deleteAppuntamento(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Gestisce gli errori HTTP
  private handleError(error: any): Observable<never> {
    console.error('Errore nel servizio AppuntamentoService:', error);
    throw error;
  }










  getAppuntamentiByUtenteId(utenteId: number): Observable<Appuntamento[]> {
    return this.http.get<Appuntamento[]>(`${this.apiUrl}/utente/${utenteId}`);
  }




  
}
