import { Component, ElementRef, inject, Inject, ViewChild } from '@angular/core';
import { DIALOG_DATA, Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog-sidebar-info',
  imports: [],
  templateUrl: './dialog-sidebar-info.component.html',
  styleUrl: './dialog-sidebar-info.component.css'
})



export class DialogSidebarInfoComponent {
  private dialog = inject(Dialog)
  public type: string = ''
  public currentLang: string = ''
  

  constructor(
    @Inject(DIALOG_DATA) public data: {
      type: string,
      currentLang: string
    },
  ) {
    this.type = this.data.type
    this.currentLang = this.data.currentLang
  }

  close(){
    document.getElementsByClassName("animateDialog")[0].classList.remove("slideInDialog-md");
    document.getElementsByClassName("animateDialog")[0].classList.add("slideOutDialog-md");
    setTimeout(() =>{this.dialog.closeAll();}, 400)
  }
}
