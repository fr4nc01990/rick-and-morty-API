import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Characters, Result } from '../interfaces/character.interface';
import { CharactersByID } from '../interfaces/characterById';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private http = inject(HttpClient);

  public loadPage(page: number): Observable<Result[]> {
    page = Math.max(1, page);

    const url: string = `https://rickandmortyapi.com/api/character/?page=${page}`;

    return this.http.get<Characters>(url)
      .pipe(
        map((resp) => resp.results)
      );

  }


  public loadCharacterById(id: string): Observable<CharactersByID> {

    const url: string = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return this.http.get<CharactersByID>(url);
  }


}


