import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  getId: any;
  productForm: FormGroup;
  selectedProduct: any = {};
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  Product: any = [];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.GetProduct(this.getId).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.productForm.setValue({
          title: data.title,
          price: data.price,
          description: data.description,
          categoryId: data.category.id,
        });
        this.selectedProduct = data.category.id;
        this.crudService.GetCategorys().subscribe(
          (data: any) => {
            this.spinner.hide();
            this.Product = data;
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
    this.productForm = this.formBuilder.group({
      title: [''],
      price: [''],
      description: [''],
      categoryId: [''],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.imageUrl = null; // Clear the previous image
  }

  ngOnInit() {}
  onUpdate(): any {
    this.spinner.show();
    this.crudService.AddFile(this.selectedFile)?.subscribe(
      (res: any) => {
        this.productForm.value.categoryId = this.selectedProduct;
        this.productForm.value.images = [res.location];
        this.crudService
          .UpdateProduct(this.getId, this.productForm.value)
          .subscribe(
            (res: any) => {
              this.spinner.hide();
              this.ngZone.run(() => this.router.navigateByUrl('/product-list'));
            },
            (err: any) => {
              this.spinner.hide();
              console.log('ERROR: ', err);
            }
          );
        this.spinner.hide();
      },
      (err: any) => {
        this.spinner.hide();
      }
    );
  }
}
