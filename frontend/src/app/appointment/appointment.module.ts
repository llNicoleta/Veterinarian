import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {EditComponent} from './view/edit/edit.component';
import {ViewComponent} from './view/view.component';
import {CreateComponent} from './create/create.component';
import {ViewDetailsComponent} from './view/view-details/view-details.component';
import {NavigationComponent} from './navigation/navigation.component';

import {AppointmentServiceProvider} from './appointment.service';

import {
  TuiDataListWrapperModule,
  TuiInputDateTimeModule,
  TuiInputModule,
  TuiMultiSelectModule,
  TuiPaginationModule,
  TuiSelectModule,
  TuiTagModule,
  TuiTextAreaModule
} from '@taiga-ui/kit';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TuiButtonModule, TuiDataListModule, TuiNotificationsModule} from '@taiga-ui/core';

@NgModule({
  declarations: [
    ViewComponent,
    CreateComponent,
    ViewDetailsComponent,
    NavigationComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    TuiButtonModule,
    TuiPaginationModule,
    TuiTagModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiInputModule,
    TuiInputDateTimeModule,
    TuiMultiSelectModule,
    TuiTextAreaModule,
    TuiNotificationsModule
  ],
  providers: [AppointmentServiceProvider]
})
export class AppointmentModule {
}
