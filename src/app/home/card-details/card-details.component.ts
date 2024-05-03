import { Component, OnInit } from '@angular/core';
import { iProduct } from '../../settings/dataModel';
import { ActivatedRoute } from '@angular/router';
import { HttpEndPoints } from '../../settings/HttpEndPoints';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent implements OnInit {

  rate: any[] = []
  product!: iProduct
  showSpinner: boolean = true


  constructor(
    private ActivatedRoute: ActivatedRoute,
    private HttpClient: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.GetIdOfProduct()
  }

  GetIdOfProduct() {
    this.ActivatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.GetProductdetails(id)
    });
  }

  GetProductdetails(id: number) {
    this.showSpinner = true
    this.rate = []
    let httpEndPoints = HttpEndPoints.store.GetProductDetails
    httpEndPoints = httpEndPoints.replace('{id}', String(id))
    this.HttpClient.get(httpEndPoints).subscribe(
      (response: any) => {
        this.product = response
        this.product.rating.rate = Math.round(this.product.rating.rate)
        let range = Array.from({ length: this.product.rating.rate }, (_, i) => i + 1);
        this.rate = range
        this.showSpinner = false
      },
      (error: any) => {
        this.toastr.error(error);
      }
    )
  }


}
