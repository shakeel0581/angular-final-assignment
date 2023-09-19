import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../../service/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  Product: any = [];
  PaginationCount: Number[] = [];
  offset: number = 0;
  next: number = 0;
  pre: number = 0;
  limit: string | null = '';

  constructor(
    private crudService: CrudService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.crudService.GetProducts().subscribe(
      (data: any) => {
        const dummyCount = data.length / 10;
        for (let index = 1; index < dummyCount; index++) {
          this.PaginationCount.push(index);
        }
        const offset = this.activatedRoute.snapshot.paramMap.get('offset');
        this.offset = offset ? +offset : 0;
        this.limit = this.activatedRoute.snapshot.paramMap.get('limit');
        const dummyNext = this.offset ? this.offset + 10 : 0;
        const dummyPre = this.offset ? this.offset - 10 : 0;

        if (dummyPre >= 0) {
          this.pre = dummyPre;
        } else {
          this.pre = 0;
        }

        if (dummyNext <= data.length) {
          this.next = dummyNext;
        } else {
          this.next = this.offset ? this.offset : 0;
        }

        this.crudService.GetProductsByPage(this.offset, this.limit)?.subscribe(
          (data1: any) => {
            this.spinner.hide();
            this.Product = data1;
          },
          (err) => {
            this.spinner.hide();
            console.log(err);
          }
        );
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
