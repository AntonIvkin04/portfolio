import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';
import { ScrollYServiceService } from '../../../service/scroll-y/scroll-y-service.service';
import { Language } from '../../types';
import { ScreenResService } from '../../../service/screen-res/screen-res.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-download-info',
  imports: [],
  templateUrl: './dialog-download-info.component.html',
  styleUrl: './dialog-download-info.component.css'
})
export class DialogDownloadInfoComponent {
  private dialog = inject(Dialog)
  private scrollY = inject(ScrollYServiceService)

  private screenRes = inject(ScreenResService)
  screenResSubscription: Subscription | undefined

  public type: string = ''
  public currentLang:Language = 'de';
  public copied: boolean | any = false;

  constructor(
    @Inject(DIALOG_DATA) public data: {
      type: string,
      currentLang:Language
    },
  ) {
    this.type = this.data.type
    this.currentLang = this.data.currentLang
  }

  ngOnInit(){
    this.screenResSubscription = this.screenRes.screenW$.subscribe((x) => {
      if(x < 700){
        this.close()
      }
    })
  }

  text = {
    info: {
      de: 'Aus eigener Erfahrung empfehle ich, das Spiel herunterzuladen und lokal zu starten. Eine relativ gute CPU wäre von Vorteil.',
      en: 'From my own experience, I recommend downloading the game and running it locally. A relatively good CPU would be beneficial.'
    },
    steps:{
      de:['Zip herunterladen','Zip entpacken','"index.html" starten'],
      en:['download zip','extract zip','start "index.html"']
    },
    download:{
      de:'Herunterladen',
      en:'Download'
    }
  }

  ngOnDestroy(){
    this.screenResSubscription?.unsubscribe()
  }

  close() {
    document.getElementsByClassName("animateDialog")[0].classList.remove("slideInDialog-md");
    document.getElementsByClassName("animateDialog")[0].classList.add("slideOutDialog-md");
    this.scrollY.modalOpen = false;
    setTimeout(() => { this.dialog.closeAll(); }, 400)
  }
}
