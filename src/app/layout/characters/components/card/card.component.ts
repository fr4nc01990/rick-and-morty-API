import { Component, input } from '@angular/core';
import { Result } from '../../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { TruncateWordsPipe } from '../../pipes/truncateWords.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TruncateWordsPipe, RouterLink],
  templateUrl: './card.component.html',
  styles: ``,

})
export class CardComponent {

  public character = input.required<Result>();


}
