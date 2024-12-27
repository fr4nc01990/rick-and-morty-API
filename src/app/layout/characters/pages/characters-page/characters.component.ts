import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { Characters, Status } from '../../interfaces/character.interface';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './characters.component.html',
})
export default class CharactersComponent implements OnInit {
  public characters = signal<Characters | null>(null); // Aquí se cargan los resultados de la API
  public page: number = 1; // Página inicial
  public status?: string; // Parámetro opcional

  private activeRoute = inject(ActivatedRoute);
  private apiService = inject(CharactersService);
  private router = inject(Router);
  public statusItems: Status[] = [Status.Alive, Status.Dead, Status.Unknown];
  public pageNumber = signal<number>(1);

  ngOnInit(): void {
    // Escuchar cambios en los queryParams
    this.activeRoute.queryParams.subscribe((params) => {
      this.page = +params['page'] || 1; // Si no hay 'page', empieza en 1
      this.status = params['status']; // Si no hay 'status', será undefined

      // Llamar al servicio con los parámetros actualizados
      this.fetchCharacters(this.page, this.status);
    });
  }

  fetchCharacters(page: number, status?: string) {
    this.apiService.getCharacters(page, status).subscribe({
      next: (response) => {
        this.characters.set(response);
      },
      error: (error) => {
        console.error('Error fetching characters:', error);
      },
    });
  }

  navigateToPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: { page, status: this.status },
      queryParamsHandling: 'merge', // Mantiene los queryParams existentes
    });
  }

  eventCapturedAndSetStatusFilter(select: EventTarget | null) {
    const selectedStatus = (select as HTMLSelectElement).value;

    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: { page: 1, status: selectedStatus },
      queryParamsHandling: 'merge',
    });
  }
}
