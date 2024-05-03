import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'LeadLiaison_Assignment';

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.checkTheInternet()
  }

  checkTheInternet() {
    window.addEventListener('offline', () => this.toastr.warning("You are offline, please check the internet"));
    window.addEventListener('online', () => this.toastr.success("the internet is restored"));
  }
}
