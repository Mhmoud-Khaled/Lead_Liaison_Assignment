import { Component, OnInit } from '@angular/core';
import { HttpEndPoints } from '../../settings/HttpEndPoints';
import { HttpClient } from '@angular/common/http';
import { iProduct } from '../../settings/dataModel'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {

  rate: any[] = []
  products!: iProduct[]
  showSpinner: boolean = true


  constructor(
    private HttpClient: HttpClient,
    private ActivatedRoute: ActivatedRoute,
    private Router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.GetSubCategoryPath()
  }

  GetSubCategoryPath() {
    this.ActivatedRoute.params.subscribe(params => {
      const subCategory = params['subCategory'];
      this.rate = []
      this.GetProductsByCategory(subCategory)
    });
  }

  GetProductsByCategory(categoryName: string) {
    this.showSpinner = true
    this.products = []
    let httpEndPoints = HttpEndPoints.store.GetInCategory
    httpEndPoints = httpEndPoints.replace('{sub-category}', categoryName)
    this.HttpClient.get(httpEndPoints).subscribe(
      (response: any) => {
        this.products = response
        this.products.forEach((product: iProduct) => {
          product.rating.rate = Math.round(product.rating.rate)
          let range = Array.from({ length: product.rating.rate }, (_, i) => i + 1);
          this.rate.push(range)
        })
        this.showSpinner = false
      },
      (error: any) => {
        this.toastr.error(error);
      }
    )
  }

  navigateToProductDetails(productId: number): void {
    // Get the current subCategory from the route parameters
    const subCategory = this.ActivatedRoute.snapshot.paramMap.get('subCategory');

    // Navigate to the product details page with the updated URL
    this.Router.navigate(['/category', subCategory, productId]);
  }


}
