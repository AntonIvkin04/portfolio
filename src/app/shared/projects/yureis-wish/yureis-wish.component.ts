import { Component } from '@angular/core';


@Component({
  selector: 'app-yureis-wish',
  imports: [],
  templateUrl: './yureis-wish.component.html',
  styleUrl: './yureis-wish.component.css'
})

export class YureisWishComponent {
  myScriptElement: HTMLScriptElement;

  scriptPath:string[] = [
    "projects/yureis-wish/models/darwable-object.class.js",
    "projects/yureis-wish/path/img-path.class.js",
    "projects/yureis-wish/models/movable-object.class.js",
    "projects/yureis-wish/models/shooting-object.class.js",
    "projects/yureis-wish/models/pickable-object.class.js",
    "projects/yureis-wish/models/colision.class.js",
    "projects/yureis-wish/models/dialog-world.class.js",
    "projects/yureis-wish/models/restart-game.class.js",
    "projects/yureis-wish/models/world.class.js",
    "projects/yureis-wish/models/selecte-object.class.js",
    "projects/yureis-wish/models/menu-screen.class.js",
    "projects/yureis-wish/models/game-over-object.class.js",
    "projects/yureis-wish/models/ability-object.class.js",
    "projects/yureis-wish/models/status-bar.class.js",
    "projects/yureis-wish/models/character.class.js",
    "projects/yureis-wish/models/soul.class.js",
    "projects/yureis-wish/models/clouds.class.js",
    "projects/yureis-wish/models/background.class.js",
    "projects/yureis-wish/models/moon.class.js",
    "projects/yureis-wish/models/leaf.class.js",
    "projects/yureis-wish/models/keyboard.class.js",
    "projects/yureis-wish/models/endboss.class.js",
    "projects/yureis-wish/models/encounter.class.js",
    "projects/yureis-wish/models/dialog.class.js",
    "projects/yureis-wish/models/level.class.js",
    "projects/yureis-wish/levels/level1.js",
    "projects/yureis-wish/levels/world-config.js",
    "projects/yureis-wish/js/game.js",
  ]

   constructor(){
    this.myScriptElement = document.createElement("script");
    this.scriptPath.forEach(e => {
      this.myScriptElement = document.createElement("script");
      this.myScriptElement.src = e;
      document.body.appendChild(this.myScriptElement);
    });
   }
}
