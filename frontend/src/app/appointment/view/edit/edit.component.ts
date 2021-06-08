import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {TuiNotificationsService} from '@taiga-ui/core';
import {TuiDay, TuiTime} from '@taiga-ui/cdk';
import {DefaultServices, DefaultStatuses, IAppointment, Services} from '../../appointment.model';
import {APPOINTMENT_SERVICE, AppointmentService} from '../../appointment.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  appointmentToUpdate: IAppointment;

  date: any;
  time: any;

  editForm = new FormGroup({
    animalName: new FormControl(),
    doctorName: new FormControl(),
    dateTime: new FormControl(),
    diagnosis: new FormControl(),
  });
  servicesControl: FormControl;
  status: FormControl = new FormControl();

  doctorName: string;
  serviceNames: Array<string> = new Array<string>();
  allServices: Set<string>;
  servicesToUpdate: Set<Services> = new Set<Services>();
  defaultServices = DefaultServices.services;

  signatureVisible = false;
  statuses = DefaultStatuses.statuses;
  statusesCount: number = this.statuses.length
  dateTimeValid = true;

  message: string

  constructor(@Inject(APPOINTMENT_SERVICE) private appointmentService: AppointmentService,
              @Inject(TuiNotificationsService) private tuiNotificationService: TuiNotificationsService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getData();
    this.servicesControl = new FormControl(this.serviceNames);

  }

  getData() {
    this.appointmentService.getAppointmentById(this.activatedRoute.snapshot.params['id']).subscribe((appointment: IAppointment) => {
      this.appointmentToUpdate = appointment;

      this.doctorName = this.deformatName(appointment.doctorName);

      this.date = appointment.dateTimeAppointment.split("T")[0].split("-");
      this.time = appointment.dateTimeAppointment.split("T")[1].split(":");

      appointment.services.forEach(service => this.serviceNames.push(service.serviceName));
      this.allServices = new Set(this.defaultServices.concat(this.serviceNames));

      this.status = new FormControl(appointment.status);
      this.initializeEditForm(appointment)
    }),
      (error) => {
        console.log(error);
      };
  }

  initializeEditForm(appointment: IAppointment) {
    this.editForm = this.formBuilder.group({
      animalName: new FormControl(appointment.animalName, [Validators.required]),
      doctorName: new FormControl(this.doctorName, [Validators.required]),
      dateTime: new FormControl([new TuiDay(+this.date[0], +this.date[1], +this.date[2]), new TuiTime(+this.time[0], +this.time[1], 0, 0)]),
      newService: '',
      diagnosis: appointment.diagnosis,
    });
    this.statusesCount = appointment.diagnosis && appointment.diagnosis.length > 0 ? 3 : 2;
  }

  onSubmit() {
    if (this.appointmentToUpdate !== undefined) {
      this.appointmentToUpdate.animalName = this.editForm.value.animalName;

      this.appointmentToUpdate.doctorName = this.formatName(this.editForm.value.doctorName);
      this.appointmentToUpdate.diagnosis = this.editForm.value.diagnosis;

      this.appointmentToUpdate.dateTimeAppointment = this.dateTimeFormat();
      this.servicesControl.value.forEach(value => this.servicesToUpdate.add(new Services(value)));

      this.appointmentToUpdate.services = Array.from(this.servicesToUpdate);

      this.appointmentToUpdate.status = this.status.value;
      this.appointmentService.updateAppointment(this.appointmentToUpdate).subscribe(() => this.message = "Appointment Updated Successfully!");
      this.tuiNotificationService.show("Appointment has been updated").subscribe();
    }
  }

  toggle() {
    this.signatureVisible = !this.signatureVisible;
  }

  addService(servicesControl: FormControl) {
    if(this.editForm.get('newService').value && this.editForm.get('newService').value.length > 0){
      this.servicesToUpdate.add(this.editForm.get('newService').value);
      this.tuiNotificationService.show(`Service ${this.editForm.get('newService').value} has been added.`).subscribe();
    } else {
      this.tuiNotificationService.show(`Service name must not be null or empty`).subscribe();
    }
  }

  diagnosisChange(event: any) {
    this.statusesCount = event.target.value && event.target.value.length > 0 ? 3 : 2;
  }

  dateTimeChanged(event: any) {
    this.dateTimeValid = event.target.value && event.target.value.length == 17;
  }

  dateTimeFormat(): string {
    let monthTemp = +this.editForm.get('dateTime').value[0].month + 1;
    let month = `${monthTemp}`.length === 1 ? `0${monthTemp}` : `${monthTemp}`;
    let day = `${this.editForm.get('dateTime').value[0].day}`.length === 1 ? `0${this.editForm.get('dateTime').value[0].day}` : `${this.editForm.get('dateTime').value[0].day}`;
    let date = `${this.editForm.get('dateTime').value[0].year}-${month}-${day}T`;
    let hours = `${this.editForm.get('dateTime').value[1].hours}`.length === 1 ? `0${this.editForm.get('dateTime').value[1].hours}` : `${this.editForm.get('dateTime').value[1].hours}`;
    let minutes = `${this.editForm.get('dateTime').value[1].minutes}`.length === 1 ? `0${this.editForm.get('dateTime').value[1].minutes}` : `${this.editForm.get('dateTime').value[1].minutes}`;
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
