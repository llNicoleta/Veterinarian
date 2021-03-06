import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiNotificationsService} from '@taiga-ui/core';
import {TuiTime} from '@taiga-ui/cdk';
import {Appointment, DefaultServices, IAppointment, Services} from '../appointment.model';
import {APPOINTMENT_SERVICE, AppointmentService} from '../appointment.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  appointment: IAppointment;

  addForm = new FormGroup({
    animalName: new FormControl(),
    doctorName: new FormControl(),
    dateTime: new FormControl(),
  });
  servicesControl: FormControl = new FormControl();

  defaultServices = DefaultServices.services;
  servicesToAdd: Set<Services> = new Set<Services>();

  signatureVisible = false;
  dateTimeValid = false;

  message: string;

  constructor(@Inject(APPOINTMENT_SERVICE) private appointmentService: AppointmentService,
              @Inject(TuiNotificationsService) private tuiNotificationService: TuiNotificationsService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeAddForm();
  }

  initializeAddForm() {
    this.addForm = this.formBuilder.group({
      animalName: new FormControl('', [Validators.required]),
      doctorName: new FormControl('', [Validators.required]),
      dateTime: new FormControl([null, null], [Validators.required]),
      newService: ''
    });
  }


  onSubmit() {
    this.servicesControl.value.forEach(value => this.servicesToAdd.add(new Services(value)));

    let doctorNameFormat = this.formatName(this.addForm.value.doctorName);
    this.appointment = new Appointment(this.addForm.value.animalName, this.dateTimeFormat(), doctorNameFormat, Array.from(this.servicesToAdd));
    this.appointmentService.addAppointment(this.appointment).subscribe(() => this.message = "Appointment Added Successfully!");
    this.tuiNotificationService.show("Appointment has been added").subscribe();
  }

  // Utilities

  toggle() {
    this.signatureVisible = !this.signatureVisible;
  }

  addService(servicesControl: FormControl) {
    if(this.addForm.get('newService').value && this.addForm.get('newService').value.length > 0){
      this.servicesToAdd.add(this.addForm.get('newService').value);
      this.tuiNotificationService.show(`Service ${this.addForm.get('newService').value} has been added.`).subscribe();
    } else {
      this.tuiNotificationService.show(`Service name must not be null or empty`).subscribe();
    }
  }

  dateTimeChanged(event: any) {
    this.dateTimeValid = event.target.value && event.target.value.length === 17;
  }

  dateTimeFormat(): string {
    let monthTemp = +this.addForm.get('dateTime').value[0].month + 1;
    let month = `${monthTemp}`.length === 1 ? `0${monthTemp}` : `${monthTemp}`;
    let day = `${this.addForm.get('dateTime').value[0].day}`.length === 1 ? `0${this.addForm.get('dateTime').value[0].day}` : `${this.addForm.get('dateTime').value[0].day}`;
    let date = `${this.addForm.get('dateTime').value[0].year}-${month}-${day}T`;
    let hours = `${this.addForm.get('dateTime').value[1].hours}`.length === 1 ? `0${this.addForm.get('dateTime').value[1].hours}` : `${this.addForm.get('dateTime').value[1].hours}`;
    let minutes = `${this.addForm.get('dateTime').value[1].minutes}`.length === 1 ? `0${this.addForm.get('dateTime').value[1].minutes}` : `${this.addForm.get('dateTime').value[1].minutes}`;
    let time = `${hours}:${minutes}:00`;
    return `${date}${time}`;
  }

  deformatName(name: string): string {
    return name.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  }

  formatName(name: string): string {
    return name.trim().replace(" ", "-").toLowerCase();
  }
}
