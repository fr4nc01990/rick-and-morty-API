import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { CardComponent } from '../../components/card/card.component';
import { CharactersService } from '../../services/characters.service';
import { Result } from '../../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export default class CharactersComponent implements OnInit {

  private characterService = inject(CharactersService);
  public characters = signal<Result[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap
      .pipe(
        map(params => params.get('page') ?? '1'),
        map(page => (isNaN(+page)) ? 1 : +page),
        map(page => Math.max(1, page))
      )
  );



  ngOnInit(): void {



    this.loadCharacters();


  }

  loadCharacters(page = 0) {

    const pageToLoad = this.currentPage()! + page;

    //console.log({ pageToLoad, currentPage: this.currentPage() });

    this.characterService.loadPage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(() => this.title.setTitle(`Rick and Morty - Page ${pageToLoad}`))
      )
      .subscribe((characters) => {

        this.characters.set(characters);

      })
  }

}
