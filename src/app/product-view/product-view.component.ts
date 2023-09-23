import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from './../service/crud.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit {
  getId: any;
  Product: any = {};
  selectedImage: string = '';

  constructor(
    private ngZone: NgZone,
    private crudService: CrudService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {
    this.spinner.show();
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.GetProduct(this.getId).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.Product = data;
        this.selectedImage = data.images[0];
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  onSlectImage(img: string) {
    this.selectedImage = img;
  }

  ngOnInit() {}
}
