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
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from './components/button/btn-cell-renderer.component';

@NgModule({
  declarations: [AppComponent, DialogComponent, ButtonRendererComponent],
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
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
