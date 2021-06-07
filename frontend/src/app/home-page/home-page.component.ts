import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

@Injectable()
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToView(): Promise<boolean> {
    return this.router.navigate(['view']);
  }

  goToCreate(): Promise<boolean> {
    return this.router.navigate(['create']);
  }

}
