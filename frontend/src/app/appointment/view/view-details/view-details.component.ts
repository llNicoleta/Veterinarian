import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IAppointment} from '../../appointment.model';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  @Input()
  appointment: IAppointment;

  totalPrice: number;
  servicesSet = new Set<string>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.formatData();
  }

  formatData() {
    let dateTime = this.appointment.dateTimeAppointment.split("T");
    this.appointment.dateTimeAppointment = dateTime.join(' ').substr(0, this.appointment.dateTimeAppointment.length - 3);
    this.appointment.services.forEach(service => this.servicesSet.add(service.serviceName));
    this.totalPrice = this.servicesSet.size * 25;
  }

  editAppointment() {
    this.router.navigate(['view/edit', this.appointment.id.toString()]);
  }
}
