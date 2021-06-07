import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToView(): Promise<boolean> {
    return this.router.navigate(['view']);
  }

  goToCreate(): Promise<boolean> {
    return this.router.navigate(['create']);
  }

  goToMain(): Promise<boolean> {
    return this.router.navigate(['main']);
  }

}
