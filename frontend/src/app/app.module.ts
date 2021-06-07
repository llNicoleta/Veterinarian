import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {iconsPathFactory, TUI_ICONS_PATH, TuiButtonModule, TuiRootModule} from '@taiga-ui/core';
import {TuiTableModule} from '@taiga-ui/addon-table';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppointmentServiceProvider} from './appointment/appointment.service';
import {HomePageComponent} from './home-page/home-page.component';
import {
  TuiInputDateTimeModule,
  TuiInputModule,
  TuiIslandModule,
  TuiMultiSelectModule,
  TuiSelectModule
} from '@taiga-ui/kit';
import {AppointmentModule} from './appointment/appointment.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    TuiRootModule,
    TuiButtonModule,
    TuiTableModule,
    TuiIslandModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppointmentModule,
    TuiSelectModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputDateTimeModule,
    TuiMultiSelectModule
  ],
  providers: [AppointmentServiceProvider, {
    provide: TUI_ICONS_PATH,
    useValue: iconsPathFactory('assets/taiga-ui/icons')
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
