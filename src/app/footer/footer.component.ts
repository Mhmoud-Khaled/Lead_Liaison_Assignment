import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  currentYear!: number

  ngOnInit(): void {
    this.currentYear = this.getCurrentYear()
  }

  //get current year
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
