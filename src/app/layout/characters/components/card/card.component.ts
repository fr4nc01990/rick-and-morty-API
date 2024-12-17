import { AfterViewInit, Component, ElementRef, input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateWordsPipe } from '../../pipes/truncateWords.pipe';

import { CharactersByID } from '../../interfaces/characterById.interface';
import { CharacterByIdComponent } from '../../pages/character-by-id/character-by-id.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TruncateWordsPipe, CharacterByIdComponent],
  templateUrl: './card.component.html',
  styles: ``,

})
export class CardComponent {

  public character = input.required<CharactersByID>();

  public showModal = false;



  toggleModal() {
    this.showModal = !this.showModal;
  }



}
