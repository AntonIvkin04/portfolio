import { Component, inject, Inject } from '@angular/core';
import { DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { FormComponent } from '../../form/form.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { ScreenResService } from '../../../service/screen-res/screen-res.service';
import { ScrollYServiceService } from '../../../service/scroll-y/scroll-y-service.service';
import { Language } from '../../types';


@Component({
  selector: 'app-dialog-sidebar-info',
  imports: [FormComponent],
  templateUrl: './dialog-sidebar-info.component.html',
  styleUrl: './dialog-sidebar-info.component.css'
})

export class DialogSidebarInfoComponent {
  private dialog = inject(Dialog)
  private clipboard = inject(Clipboard)
  private scrollY = inject(ScrollYServiceService)
  private screenRes = inject(ScreenResService)

  public type: string = ''
  public currentLang: Language = 'de';
  public copied: boolean | any = false;

  screenResSubscription: any;

  constructor(
    @Inject(DIALOG_DATA) public data: {
      type: string,
      currentLang: Language
    },
  ) {
    this.type = this.data.type
    this.currentLang = this.data.currentLang
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.screenResSubscription = this.screenRes.screenW$.subscribe((x) => {
      if (x < 700) {
        this.close()
      }
    })
  }

  ngOnDestroy() {
    this.screenResSubscription?.unsubscribe()
  }

  close() {
    document.getElementsByClassName("animateDialog")[0].classList.remove("slideInDialog-md");
    document.getElementsByClassName("animateDialog")[0].classList.add("slideOutDialog-md");
    this.scrollY.modalOpen = false;
    setTimeout(() => { this.dialog.closeAll(); }, 400)
  }

  copyDiscord() {
    this.copied = this.clipboard.copy('antoschka4188')
  }
}
