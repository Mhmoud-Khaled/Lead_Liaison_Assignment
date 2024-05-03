import { Component } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {

  currentYear!: number

  ngOnInit(): void {
    this.currentYear = this.getCurrentYear()
  }

  //get current year
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
