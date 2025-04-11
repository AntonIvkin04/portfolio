import { Component } from '@angular/core';

@Component({
  selector: 'app-section-project',
  imports: [],
  templateUrl: './section-project.component.html',
  styleUrl: './section-project.component.css'
})

export class SectionProjectComponent {

  project: { list: { 
    name: string,
    description : string,
    icon : string,
    date : string,
   }[] } = {
    list: [
      { 
        name: "Kochwelt",
        description : "Kochwelt ist ein Projekt welches eine Daily-Rezept Seite simuliert. Es ist möglich Portionen zu errechnen",
        icon : "/img/fav-icon-kochwelt.png",
        date : "2022"
       },
       { 
        name: "Yurei's Wish",
        description : "Yurei's Wish ist ein Canva-Browser Game, welches mich unterstützte OOP anzuwenden.",
        icon : "/img/yureis-wish-icon.png",
        date : "2022"
       },
       { 
        name: "PokeAPI",
        description : "PokeAPI ist ein Projekt, welches Daten mithilfe einer API Abfrage ladet.",
        icon : "/img/pokeapi-icon.png",
        date : "2022"
       },
       { 
        name: "Join",
        description : "Join war ein Gruppen Projekt. Ein Kanbanboard angebunden an einer Firebase Datenbank.",
        icon : "/img/favicon_logo_join.png",
        date : "2022"
       },
    ]
  };
}
