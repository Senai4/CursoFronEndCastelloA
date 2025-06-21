import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Curriculo {
  id?: number;
  userId: number;
  formacao: string;
  experiencia: string;
  habilidades: string;
  linkedin: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurriculoService {
  private apiUrl = 'http://localhost:3006/curriculos';

  constructor(private http: HttpClient) {}

  getCurriculos(): Observable<Curriculo[]> {
    return this.http.get<Curriculo[]>(this.apiUrl);
  }

  getCurriculoByUserId(userId: number): Observable<Curriculo[]> {
    return this.http.get<Curriculo[]>(`${this.apiUrl}?userId=${userId}`);
  }

  getCurriculo(id: number): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.apiUrl}/${id}`);
  }

  createCurriculo(curriculo: Curriculo): Observable<Curriculo> {
    return this.http.post<Curriculo>(this.apiUrl, curriculo);
  }

  updateCurriculo(id: number, curriculo: Curriculo): Observable<Curriculo> {
    return this.http.put<Curriculo>(`${this.apiUrl}/${id}`, curriculo);
  }

  deleteCurriculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
