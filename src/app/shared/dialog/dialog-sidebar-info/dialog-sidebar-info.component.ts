import { Component, inject, Inject } from '@angular/core';
import { DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { FormComponent } from '../../form/form.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { ScreenResService } from '../../../service/screen-res/screen-res.service';
import { ScrollYServiceService } from '../../../service/scroll-y/scroll-y-service.service';


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

  public type: string = ''
  public currentLang: string = ''
  public copied: boolean | any = false;

  constructor(
    @Inject(DIALOG_DATA) public data: {
      type: string,
      currentLang: string
    },
  ) {
    this.type = this.data.type
    this.currentLang = this.data.currentLang
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
