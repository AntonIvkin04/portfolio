import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageDecService } from '../../language-dec.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-section-project',
  imports: [RouterModule],
  templateUrl: './section-project.component.html',
  styleUrl: './section-project.component.css'
})

export class SectionProjectComponent {
  private langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined

  currentLang:string = '';

  project: {
    list: {
      name: string,
      description_de: string,
      description_en: string,
      icon: string,
      date: string,
      path: string,
    }[]
  } = {
      list: [
        {
          name: "Kochwelt",
          description_de: "Kochwelt ist ein Projekt welches eine Daily-Rezept Seite simuliert.",
          description_en: "Kochwelt is a project that simulates a daily recipe website.",
          icon: "/img/fav-icon-kochwelt.png",
          date: "2022",
          path: ""
        },
        {
          name: "Yurei's Wish",
          description_de: "Yurei's Wish ist ein Canva-Browser Game mit einem Level.",
          description_en: "Yurei's Wish is a Canva browser game with one level",
          icon: "/img/yureis-wish-icon.png",
          date: "2022",
          path: ""
        },
        {
          name: "PokeAPI",
          description_de: "Bei PokeAPI werden Pokemons mithilfer einer API angezeigt.",
          description_en: "With PokeAPI, Pokémon are displayed using an API.",
          icon: "/img/pokeapi-icon.png",
          date: "2022",
          path: ""
        },
        {
          name: "Join",
          description_de: "Ein Kanbanboard angebunden an einer Firebase Datenbank.",
          description_en: "A Kanban board connected to a Firebase database.",
          icon: "/img/favicon_logo_join.png",
          date: "2022",
          path: ""
        },
        {
          name: "Bestellapp",
          description_de: "Eine simulierte Lieferbestellseite.",
          description_en: "A simulated delivery order page.",
          icon: "/img/favicon-bestellapp.png",
          date: "2022",
          path: ""
        },
        {
          name: "Bookstore",
          description_de: "Eine einfache Webseite die Bücher anzeigt.",
          description_en: "A simple website that displays books.",
          icon: "/img/favicon-bookstore.png",
          date: "2022",
          path: ""
        },
      ]
    };

    ngOnInit(){
      this.langSubscription = this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
      })
    }

    ngOnDestroy(){
      this.langSubscription?.unsubscribe()
    }
}
