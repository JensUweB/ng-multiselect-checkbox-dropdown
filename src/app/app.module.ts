import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, MultiSelectDropdownComponent ],
  bootstrap:    [ AppComponent ],
  exports: [
    MultiSelectDropdownComponent
  ]
})
export class AppModule { }
