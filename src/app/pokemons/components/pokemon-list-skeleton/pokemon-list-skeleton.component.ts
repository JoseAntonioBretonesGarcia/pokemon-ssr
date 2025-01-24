import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'pokemon-list-skeleton',
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListSkeletonComponent {}
