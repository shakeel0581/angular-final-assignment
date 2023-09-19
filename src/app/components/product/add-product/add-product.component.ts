import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  Product: any = [];
  productForm: FormGroup;
  selectedProduct: string = '';
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    private spinner: NgxSpinnerService
  ) {
    this.productForm = this.formBuilder.group({
      title: [''],
      price: [''],
      description: [''],
      categoryId: [''],
    });

    this.spinner.show();
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
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.imageUrl = null; // Clear the previous image
  }

  ngOnInit() {}
  onSubmit(): any {
    this.spinner.show();
    this.crudService.AddFile(this.selectedFile)?.subscribe(
      (res: any) => {
        this.productForm.value.categoryId = this.selectedProduct;
        this.productForm.value.images = [res.location];
        this.crudService.AddProduct(this.productForm.value).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.ngZone.run(() =>
              this.router.navigateByUrl('/product-list/0/10')
            );
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
