import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { PokemonAPIResponse } from '../interfaces/pokemon-api-response.interface';
import { Pokemon } from '../interfaces/pokemon-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private hhtp = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);
    return this.hhtp
      .get<PokemonAPIResponse>(`${this.apiUrl}?offset=${page * 20}&limit=20`)
      .pipe(
        map((res) => {
          const simplePokemons: SimplePokemon[] = res.results.map(
            (pokemon) => ({
              name: pokemon.name,
              id: pokemon.url.split('/').at(-2) ?? '',
            })
          );
          return simplePokemons;
        })
      );
  }

  public getPokemonById(id: string): Observable<Pokemon> {
    return this.hhtp.get<Pokemon>(`${this.apiUrl}/${id}`);
  }
}
