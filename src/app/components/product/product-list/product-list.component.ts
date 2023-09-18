import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../../service/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  Product: any = [];
  constructor(
    private crudService: CrudService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.crudService.GetProducts().subscribe(
      (data: any) => {
        this.spinner.hide();
        this.Product = data;
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
  ngOnInit() {}
  // delete(id: any, i: any) {
  //   if (window.confirm('Do you want to go ahead?')) {
  //     this.crudService.deleteBook(id).subscribe((data: any) => {
  //       this.Category.splice(i, 1);
  //     });
  //   }
  // }
}
