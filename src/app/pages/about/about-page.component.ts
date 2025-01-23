import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemon-about',
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent {}
