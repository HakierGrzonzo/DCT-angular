import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebglDisplayComponent } from './webgl-display/webgl-display.component';
import { InputPanelComponent } from './input-panel/input-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    WebglDisplayComponent,
    InputPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
