import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebglDisplayComponent } from './webgl-display/webgl-display.component';
import { InputPanelComponent } from './input-panel/input-panel.component';
import { OutputPanelComponent } from './output-panel/output-panel.component';
import { FormsModule } from '@angular/forms';
import { KatexModule } from 'ng-katex';
import { DctIIComponent } from './dct-ii/dct-ii.component';
import { BracketsComponent } from './brackets/brackets.component';
import { ArrToTableComponent } from './arr-to-table/arr-to-table.component';
import { JpegComponent } from './jpeg/jpeg.component'; 

@NgModule({
  declarations: [
    AppComponent,
    WebglDisplayComponent,
    InputPanelComponent,
    OutputPanelComponent,
    DctIIComponent,
    BracketsComponent,
    ArrToTableComponent,
    JpegComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    KatexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
