import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {
  DxDataGridModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxTabPanelModule,
  DxButtonModule,
  DxPopupModule,
  DxTextAreaModule,
  DxTooltipModule,
  DxContextMenuModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [AppComponent, DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTabPanelModule,
    DxButtonModule,
    DxPopupModule,
    DxTextAreaModule,
    DxTooltipModule,
    DxContextMenuModule,
    DxToolbarModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
