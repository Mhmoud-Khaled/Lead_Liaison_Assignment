import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpEndPoints } from '../../settings/HttpEndPoints';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  navTitle: string = 'category'

  navButtons: string[] = []
  showAllCategory: boolean = true
  URLSubscription!: Subscription;

  constructor(
    private HttpClient: HttpClient,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.GetAllCategories()
    this.getCurrentUrl()
    this.URLSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/category') {
          this.showAllCategory = true
          this.navTitle = 'category'
        } else {
          this.showAllCategory = false
        }
      }
    });
  }

  GetAllCategories() {
    let httpEndPoints = HttpEndPoints.store.GetAllCattegories
    this.HttpClient.get(httpEndPoints).subscribe(
      (response: any) => {
        this.navButtons = response
      },
      (error: any) => {
        this.showAllCategory = false
      }
    )
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/category', category])
    this.navTitle = category
  }

  getCurrentUrl() {
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);
    if (this.router.url === '/category') {
      this.showAllCategory = true
      this.navTitle = 'category'
    } else {
      this.showAllCategory = false
    }
  }

}
