import { Component, OnInit } from '@angular/core';
import { CrudService } from './../service/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product-public',
  templateUrl: './product-public.component.html',
  styleUrls: ['./product-public.component.css'],
})
export class ProductPublicComponent {
  Category: any = [];
  Product: any = [];
  AllProduct: any = [];
  PaginationCount: Number[] = [];
  offset: number = 0;
  next: number = 0;
  pre: number = 0;
  offsetProducts: number = 21;
  limit: string | null = '';
  selectedCat: any | null = {};

  constructor(
    private crudService: CrudService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.spinner.show();
    this.crudService.GetProducts().subscribe(
      (data: any) => {
        this.AllProduct = data;
        const dummyCount = data.length / this.offsetProducts;
        for (let index = 1; index < dummyCount; index++) {
          this.PaginationCount.push(index);
        }
        const offset = this.activatedRoute.snapshot.paramMap.get('offset');
        this.offset = offset ? +offset : 0;
        this.limit = this.activatedRoute.snapshot.paramMap.get('limit');
        const dummyNext = this.offset ? this.offset + this.offsetProducts : 0;
        const dummyPre = this.offset ? this.offset - this.offsetProducts : 0;

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
        const limitExact = this.limit ? this.limit : this.offsetProducts;
        this.crudService
          .GetProductsByPage(this.offset, limitExact.toString())
          ?.subscribe(
            (data1: any) => {
              this.Product = data1;
              this.crudService.GetCategorys().subscribe(
                (data: any) => {
                  this.Category = data;
                  this.spinner.hide();
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
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  ngOnInit() {}

  onSelectCategory(cat: any) {
    this.selectedCat = cat;
    this.Product = this.AllProduct.filter(
      (item: any) => item.category.id === cat.id
    );
  }

  navigation(id: string) {
    this.router.navigateByUrl(`/product-view/${id}`);
  }
  // delete(id: any, i: any) {
  //   if (window.confirm('Do you want to go ahead?')) {
  //     this.crudService.deleteBook(id).subscribe((data: any) => {
  //       this.Category.splice(i, 1);
  //     });
  //   }
  // }
}
