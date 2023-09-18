import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css'],
})
export class AddCategorieComponent implements OnInit {
  catForm: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    private spinner: NgxSpinnerService
  ) {
    this.catForm = this.formBuilder.group({
      name: [''],
      image: ['https://api.lorem.space/image/book?w=150&h=220'],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.imageUrl = null; // Clear the previous image
  }

  ngOnInit() {}
  onSubmit(): any {
    this.spinner.show();
    this.spinner.show();
    this.crudService.AddFile(this.selectedFile)?.subscribe(
      (res: any) => {
        this.catForm.value.image = res.location;
        this.crudService.AddCategory(this.catForm.value).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.ngZone.run(() => this.router.navigateByUrl('/category-list'));
          },
          (err: any) => {
            this.spinner.hide();
            console.log(err);
          }
        );
      },
      (err: any) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
}
