import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Input() popupVisible!: boolean;
  moreInfoButtonOptions: any;

  emailButtonOptions: any;

  ngOnInit(): void {
    console.log(this.popupVisible);
  }

  constructor() {
    this.moreInfoButtonOptions = {
      text: 'More info',
      onClick(e: any) {
        const message = `More info about`;
      },
    };
    this.emailButtonOptions = {
      icon: 'email',
      text: 'Send',
      onClick(e: any) {
        const message = `Email is sent to`;
      },
    };
  }
}
