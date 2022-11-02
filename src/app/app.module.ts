import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ColorChromeModule } from 'ngx-color/chrome';
import { FontPickerModule } from 'ngx-font-picker';
import { FONT_PICKER_CONFIG } from 'ngx-font-picker';
import { FontPickerConfigInterface } from 'ngx-font-picker';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import { AppComponent } from 'src/app/app.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { GeneratorComponent } from 'src/app/components/generator/generator.component';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  apiKey: 'AIzaSyAUA_BXYkGQTH08pxeK4fY8rjK6wkXnIDw'
};

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    GeneratorComponent,
    DialogComponent
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
    ShareButtonsModule,
    ShareIconsModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: FONT_PICKER_CONFIG,
      useValue: DEFAULT_FONT_PICKER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
