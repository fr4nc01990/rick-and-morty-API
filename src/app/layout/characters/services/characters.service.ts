import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Characters } from '../interfaces/character.interface';
import { CharactersByID } from '../interfaces/characterById';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private baseUrl = 'https://rickandmortyapi.com/api/character'; // URL base de la API

  constructor(private http: HttpClient) { }

  /**
   * Realiza una solicitud GET para obtener personajes con paginación y filtro opcional.
   * @param page Número de página (requerido).
   * @param status Estado del personaje (opcional).
   * @returns Observable con los datos de los personajes.
   */

  getCharacters(page: number, status?: string): Observable<Characters> {
    let params = new HttpParams().set('page', page.toString()); // Agregar el parámetro de página.

    if (status) {
      params = params.set('status', status); // Agregar el parámetro de estado si existe.
    }

    return this.http.get<Characters>(this.baseUrl, { params });
  }



  public loadCharacterById(id: string): Observable<CharactersByID> {

    const url: string = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return this.http.get<CharactersByID>(url);
  }


}


