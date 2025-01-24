import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemon-data.interface';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  imports: [CommonModule],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  public pokemon = signal<Pokemon | null>(null);

  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    const pokemonId = this.route.snapshot.paramMap.get('id');
    if (!pokemonId) return;
    this.pokemonService
      .getPokemonById(pokemonId)
      .pipe(
        tap(({ name, id }) => {
          const pageTitle = `#${id} - ${name}`;
          const pageDescription = `Page of Pokemon ${name}`;

          this.title.setTitle(pageTitle);
          this.meta.updateTag({
            name: 'description',
            content: pageDescription,
          });
          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({
            name: 'og:description',
            content: pageDescription,
          });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
        })
      )
      .subscribe(this.pokemon.set);
  }
}
