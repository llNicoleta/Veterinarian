import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IAppointment, IHttpResponse} from '../appointment.model';
import {APPOINTMENT_SERVICE, AppointmentService} from '../appointment.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  appointments: Array<IAppointment>
  totalPages: number = 0;
  currentPage: number = 0;
  doctorName: string = "";
  doctorSet: Set<string> = new Set();
  isAppointments: boolean = false;
  selectForm = new FormControl();

  constructor(@Inject(APPOINTMENT_SERVICE) private appointmentService: AppointmentService) {
    this.doctorSet.add("None");
    this.getAllAppointments();
  }

  ngOnInit(): void {
    this.getPage(this.currentPage, this.doctorName);
  }

  getPage(pageNumber: number, doctorName: string) {
    this.appointmentService.getAppointments(pageNumber, doctorName)
      .subscribe((response: IHttpResponse) => {
        this.appointments = response.content;
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
      }),
      (error) => {
        console.log(error);
      }
  }

  getAllAppointments() {
    this.appointmentService.getAllAppointments()
      .subscribe((appointment: any) => {
        appointment.forEach((app) => this.doctorSet.add(app.doctorName));
      }),
      (error) => {
        console.log(error);
      }
  }

  goToPage(index: number) {
    this.currentPage = index;
    this.getPage(this.currentPage, this.doctorName);
  }

  onSubmit(selectForm: FormGroup) {
    if (selectForm.value.doctorName === "None")
      this.doctorName = "";
    else
      this.doctorName = selectForm.value.doctorName;
    this.getPage(0, this.doctorName);
  }
}
