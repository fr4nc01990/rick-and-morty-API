import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, input, Input, OnInit, Output, signal } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CharactersByID } from '../../interfaces/characterById.interface';



@Component({
  selector: 'app-character-by-id',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-by-id.component.html',
  styleUrl: './character-by-id.component.css'
})
export class CharacterByIdComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  @Input() isVisible = false; // Recibe el estado del modal
  @Input() public character!: CharactersByID;

  public characterDetails = signal<CharactersByID | null>(null);

  private characterService = inject(CharactersService)


  ngOnInit(): void {


    if (this.character && this.character.id) {
      this.loadCharacterDetails(this.character.id);
    }


  }


  loadCharacterDetails(id: number) {
    this.characterService.loadCharacterById(id).subscribe((details) => {
      this.characterDetails.set(details);
    });
  }


  onBackdropClick() {
    this.close.emit(); // Emite el evento para cerrar el modal
  }

  onClose() {
    this.close.emit(); // Maneja el cierre directo (botón "Close")
  }

}
