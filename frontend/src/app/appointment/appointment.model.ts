export interface IAppointment {
  id?: number,
  animalName: string,
  dateTimeAppointment: string,
  doctorName: string,
  services: Array<Services>,
  diagnosis: string,
  status: string
}

export class Appointment implements IAppointment {
  animalName: string;
  dateTimeAppointment: string;
  diagnosis: string;
  doctorName: string;
  services: Array<Services>;
  status: string = DefaultStatuses.statuses[0];

  constructor(animalName: string, dateTimeAppointment: string, doctorName: string, services: Array<Services>) {
    this.animalName = animalName;
    this.dateTimeAppointment = dateTimeAppointment;
    this.doctorName = doctorName;
    this.services = services;
  }
}

export class Services {
  serviceName: string;
  servicePrice: number = 25

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }
}
export interface IHttpResponse {
  content: Array<IAppointment>,
  totalPages: number,
  totalElements: number,
  number: number
}


export const DefaultServices = {
  services: ["Consultatie", "Prima consultatie", "Vaccinare", "Operatie"]
}

export const DefaultStatuses = {
  statuses: ["Creata", "Confirmata", "Incheiata"]
}
