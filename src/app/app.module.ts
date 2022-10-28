import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ColorChromeModule } from 'ngx-color/chrome';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from './components/dialog/dialog.component';
import { FontPickerModule } from 'ngx-font-picker';
import { FONT_PICKER_CONFIG } from 'ngx-font-picker';
import { FontPickerConfigInterface } from 'ngx-font-picker';

const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  apiKey: 'AIzaSyDm6XEa0gVwGjkYYnrJi-Jk-AkkYyMFBoE',
};

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    GeneratorComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ColorChromeModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    FontPickerModule,
  ],
  providers: [
    {
      provide: FONT_PICKER_CONFIG,
      useValue: DEFAULT_FONT_PICKER_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
