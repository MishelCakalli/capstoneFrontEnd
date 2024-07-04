// src/app/services/appuntamento.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appuntamento } from '../interfaces/appuntamento';

@Injectable({
  providedIn: 'root'
})
export class AppuntamentoService {
  private apiUrl = 'http://localhost:8080/api/lezioni';

  constructor(private http: HttpClient) {}

  getAppuntamenti(): Observable<Appuntamento[]> {
    return this.http.get<Appuntamento[]>(this.apiUrl);
  }

  getAppuntamento(id: number): Observable<Appuntamento> {
    return this.http.get<Appuntamento>(`${this.apiUrl}/${id}`);
  }

  createAppuntamento(appuntamento: Appuntamento): Observable<Appuntamento> {
    return this.http.post<Appuntamento>(this.apiUrl, appuntamento);
  }

  updateAppuntamento(appuntamento: Appuntamento): Observable<Appuntamento> {
    return this.http.put<Appuntamento>(`${this.apiUrl}/${appuntamento.id}`, appuntamento);
  }

  deleteAppuntamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
